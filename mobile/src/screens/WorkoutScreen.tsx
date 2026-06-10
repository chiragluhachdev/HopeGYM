import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, RefreshControl, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, radius, spacing } from '../theme';
import { fetchWorkouts } from '../api';

const categories = ['All', 'Strength', 'Cardio', 'Weight-Loss', 'Muscle-Gain'];

export default function WorkoutScreen() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({});

  async function load(cat: string) {
    setLoading(true);
    try {
      const data = await fetchWorkouts(cat === 'All' ? undefined : cat.toLowerCase());
      setWorkouts(data);
    } catch {}
    setLoading(false);
  }

  async function loadProgress() {
    try {
      const saved = await AsyncStorage.getItem('completedExercises');
      if (saved) setCompletedExercises(JSON.parse(saved));
    } catch {}
  }

  useEffect(() => { 
    load(category); 
    loadProgress();
  }, [category]);

  const toggleComplete = async (planId: string, exerciseName: string) => {
    const key = `${planId}-${exerciseName}`;
    const updated = { ...completedExercises, [key]: !completedExercises[key] };
    setCompletedExercises(updated);
    try {
      await AsyncStorage.setItem('completedExercises', JSON.stringify(updated));
    } catch {}
  };

  const getCompletionPercentage = (plan: any) => {
    if (!plan.exercises || plan.exercises.length === 0) return 0;
    const completed = plan.exercises.filter((ex: any) => completedExercises[`${plan._id}-${ex.name}`]).length;
    return Math.round((completed / plan.exercises.length) * 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout Plans</Text>
        <Text style={styles.subtitle}>Your daily training schedules</Text>
      </View>

      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, category === cat && styles.chipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={workouts}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => load(category)} tintColor={colors.brand} />}
        contentContainerStyle={{ padding: spacing.lg, gap: 16, paddingBottom: 100 }}
        renderItem={({ item }) => {
          const isExpanded = expandedPlan === item._id;
          const progress = getCompletionPercentage(item);

          return (
            <View style={styles.planCard}>
              <TouchableOpacity 
                style={styles.planHeader} 
                activeOpacity={0.8}
                onPress={() => setExpandedPlan(isExpanded ? null : item._id)}
              >
                <View style={styles.cardIcon}>
                  <Ionicons name="barbell" size={24} color={colors.brand} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSub}>{item.category?.toUpperCase() || 'GENERAL'} • {item.exercises?.length || 0} Exercises</Text>
                  
                  {progress > 0 && (
                    <View style={styles.progressContainer}>
                      <View style={[styles.progressBar, { width: `${progress}%` }]} />
                    </View>
                  )}
                </View>
                <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color={colors.whiteA40} />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.exercisesList}>
                  {item.exercises?.map((ex: any, idx: number) => {
                    const isCompleted = completedExercises[`${item._id}-${ex.name}`];
                    return (
                      <TouchableOpacity 
                        key={idx} 
                        style={styles.exerciseItem} 
                        activeOpacity={0.7}
                        onPress={() => toggleComplete(item._id, ex.name)}
                      >
                        <View style={[styles.checkbox, isCompleted && styles.checkboxChecked]}>
                          {isCompleted && <Ionicons name="checkmark" size={14} color={colors.ink} />}
                        </View>
                        <View style={styles.exerciseDetails}>
                          <Text style={[styles.exName, isCompleted && styles.exNameCompleted]}>{ex.name}</Text>
                          <View style={styles.exMetaRow}>
                            {ex.sets ? <Text style={styles.exMeta}>{ex.sets} Sets</Text> : null}
                            {ex.reps ? <Text style={styles.exMeta}>{ex.reps} Reps</Text> : null}
                            {ex.rest ? <Text style={styles.exMeta}>Rest: {ex.rest}</Text> : null}
                          </View>
                          {ex.instructions ? <Text style={styles.exInst}>{ex.instructions}</Text> : null}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        }}
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>No workouts found in this category.</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  header: { paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md },
  title: { fontSize: 28, fontWeight: '800', color: colors.white },
  subtitle: { fontSize: 14, color: colors.whiteA60, marginTop: 4 },
  filtersWrapper: { borderBottomWidth: 1, borderBottomColor: colors.whiteA10, paddingBottom: spacing.md },
  filters: { paddingHorizontal: spacing.lg, gap: 8 },
  chip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: radius.full, backgroundColor: colors.ink700, borderWidth: 1, borderColor: colors.whiteA10 },
  chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.whiteA60 },
  chipTextActive: { color: colors.ink },
  planCard: { backgroundColor: colors.ink700, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.whiteA10, overflow: 'hidden' },
  planHeader: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: 14 },
  cardIcon: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: 'rgba(255,212,0,0.1)', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.white },
  cardSub: { fontSize: 11, color: colors.whiteA60, marginTop: 2, fontWeight: '600', letterSpacing: 0.5 },
  progressContainer: { height: 4, backgroundColor: colors.whiteA10, borderRadius: 2, marginTop: 8, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: colors.brand },
  exercisesList: { paddingHorizontal: spacing.md, paddingBottom: spacing.md, borderTopWidth: 1, borderTopColor: colors.whiteA10, paddingTop: spacing.md },
  exerciseItem: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12, gap: 12, borderBottomWidth: 1, borderBottomColor: colors.whiteA10 },
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: colors.whiteA40, alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  checkboxChecked: { backgroundColor: colors.brand, borderColor: colors.brand },
  exerciseDetails: { flex: 1 },
  exName: { fontSize: 15, fontWeight: '700', color: colors.white, marginBottom: 4 },
  exNameCompleted: { textDecorationLine: 'line-through', color: colors.whiteA40 },
  exMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 4 },
  exMeta: { fontSize: 12, color: colors.brand, fontWeight: '600' },
  exInst: { fontSize: 12, color: colors.whiteA60, fontStyle: 'italic', marginTop: 2 },
  empty: { textAlign: 'center', color: colors.whiteA40, marginTop: 40, fontSize: 14 },
});
