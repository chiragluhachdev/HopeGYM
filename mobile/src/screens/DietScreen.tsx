import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Image, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { fetchDiet } from '../api';

export default function DietScreen({ navigation }: any) {
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { 
      const data = await fetchDiet();
      setPlan(data);
    } catch {}
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const renderMealSection = (title: string, items: string[], icon: any) => {
    if (!items || items.length === 0) return null;
    return (
      <View style={styles.mealCard}>
        <View style={styles.mealHeader}>
          <View style={styles.mealIconCircle}>
            <MaterialCommunityIcons name={icon} size={22} color={colors.brand} />
          </View>
          <Text style={styles.mealTitle}>{title}</Text>
        </View>
        <View style={styles.mealItems}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.mealItemRow}>
              <View style={styles.bullet} />
              <Text style={styles.mealItemText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Cinematic Background Hero */}
      <View style={styles.heroBackgroundContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroYellowGlow} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.navIcon}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Diet Plan</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.brand} />}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 100, paddingTop: spacing.md }}
        >
          {!loading && !plan && (
            <View style={styles.emptyContainer}>
              <Ionicons name="restaurant-outline" size={48} color={colors.whiteA20} />
              <Text style={styles.empty}>No diet plan assigned to you yet.</Text>
            </View>
          )}

          {plan && (
            <>
              {/* Premium Plan Card */}
              <View style={styles.headerCard}>
                <View style={styles.planHeaderBadge}>
                  <Text style={styles.planHeaderBadgeText}>CURRENT PLAN</Text>
                </View>
                <Text style={styles.planTitle}>{plan.title || 'Your Daily Diet Plan'}</Text>
                <Text style={styles.preparedBy}>Prepared by: {plan.preparedBy || 'Hope Gym Coaches'}</Text>
                
                <View style={styles.macrosContainer}>
                  <View style={styles.macroBox}>
                    <View style={styles.macroIconWrap}>
                      <Ionicons name="flame" size={20} color={colors.brand} />
                    </View>
                    <Text style={styles.macroValue}>{plan.calories || 0}</Text>
                    <Text style={styles.macroLabel}>Calories</Text>
                  </View>
                  
                  <View style={styles.macroDivider} />
                  
                  <View style={styles.macroBox}>
                    <View style={styles.macroIconWrap}>
                      <MaterialCommunityIcons name="food-steak" size={20} color={colors.brand} />
                    </View>
                    <Text style={styles.macroValue}>{plan.protein || 0}g</Text>
                    <Text style={styles.macroLabel}>Protein</Text>
                  </View>
                  
                  <View style={styles.macroDivider} />
                  
                  <View style={styles.macroBox}>
                    <View style={styles.macroIconWrap}>
                      <Ionicons name="water" size={20} color={colors.brand} />
                    </View>
                    <Text style={styles.macroValue}>{plan.water || '3-4 L'}</Text>
                    <Text style={styles.macroLabel}>Water</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Daily Schedule</Text>

              <View style={styles.mealsContainer}>
                {renderMealSection('Breakfast', plan.meals?.breakfast, 'food-croissant')}
                {renderMealSection('Lunch', plan.meals?.lunch, 'food-apple')}
                {renderMealSection('Snacks', plan.meals?.snacks, 'food-apple')}
                {renderMealSection('Dinner', plan.meals?.dinner, 'food-variant')}
              </View>

              <View style={styles.guidelinesCard}>
                <View style={styles.guidelineIconCircle}>
                  <Ionicons name="information" size={24} color={colors.ink} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.guidelineTitle}>Pro Tip</Text>
                  <Text style={styles.guidelineText}>
                    Stay hydrated! Aim to drink at least {plan.water || '3-4 L'} of water daily. Avoid processed sugars and try to consume your meals on time.
                  </Text>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  
  // Cinematic Hero Background
  heroBackgroundContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: 350 },
  heroImage: { width: '100%', height: '100%', opacity: 0.4 },
  heroOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(11, 11, 11, 0.7)' },
  heroYellowGlow: { position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: 125, backgroundColor: colors.brand, opacity: 0.08, transform: [{ scale: 2 }] },

  // Navigation
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: spacing.sm, zIndex: 10 },
  navIcon: { padding: spacing.sm, marginLeft: -spacing.sm },
  navTitle: { fontSize: 18, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },

  // Header Card
  headerCard: { padding: spacing.xl, backgroundColor: colors.ink700, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255, 212, 0, 0.25)', alignItems: 'center', marginBottom: spacing.xl, shadowColor: colors.brand, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 8 },
  planHeaderBadge: { backgroundColor: 'rgba(255, 212, 0, 0.15)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.full, marginBottom: 12 },
  planHeaderBadgeText: { fontSize: 10, fontWeight: '800', color: colors.brand, letterSpacing: 1 },
  planTitle: { fontSize: 26, fontWeight: '900', color: colors.white, textAlign: 'center', marginBottom: 6 },
  preparedBy: { fontSize: 13, color: colors.whiteA60, textAlign: 'center' },
  
  // Macros
  macrosContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: colors.whiteA10 },
  macroBox: { alignItems: 'center', flex: 1 },
  macroIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 212, 0, 0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  macroValue: { fontSize: 18, fontWeight: '800', color: colors.white },
  macroLabel: { fontSize: 11, color: colors.whiteA60, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },
  macroDivider: { width: 1, height: '60%', backgroundColor: colors.whiteA10, alignSelf: 'center' },

  // Sections
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.white, marginBottom: spacing.md, letterSpacing: 0.5 },
  mealsContainer: { gap: spacing.md },
  
  // Meal Card
  mealCard: { backgroundColor: colors.ink700, borderRadius: 20, borderWidth: 1, borderColor: colors.whiteA10, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 4 },
  mealHeader: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderBottomWidth: 1, borderBottomColor: colors.whiteA10, gap: 12 },
  mealIconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 212, 0, 0.1)', alignItems: 'center', justifyContent: 'center' },
  mealTitle: { fontSize: 16, fontWeight: '700', color: colors.white },
  mealItems: { padding: spacing.lg, gap: 12 },
  mealItemRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.brand, marginTop: 8 },
  mealItemText: { flex: 1, fontSize: 15, color: colors.whiteA80, lineHeight: 22 },
  
  // Guidelines
  guidelinesCard: { flexDirection: 'row', backgroundColor: 'rgba(255, 212, 0, 0.1)', padding: spacing.lg, borderRadius: 20, marginTop: spacing.xl, gap: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 212, 0, 0.2)' },
  guidelineIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  guidelineTitle: { fontSize: 14, fontWeight: '800', color: colors.brand, marginBottom: 4 },
  guidelineText: { flex: 1, fontSize: 13, color: colors.whiteA80, lineHeight: 20 },
  
  // Empty State
  emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  empty: { textAlign: 'center', color: colors.whiteA40, marginTop: 16, fontSize: 15 },
});
