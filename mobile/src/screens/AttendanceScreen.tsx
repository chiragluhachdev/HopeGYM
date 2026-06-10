import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { fetchMyAttendance, checkIn } from '../api';

export default function AttendanceScreen() {
  const [data, setData] = useState<any>({ records: [], stats: { monthPresent: 0, percentage: 0, streak: 0 } });
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  async function load() {
    setLoading(true);
    try { 
      const response = await fetchMyAttendance();
      if (response && response.records) {
        setData(response);
      } else if (Array.isArray(response)) {
        // Fallback if backend hasn't updated to object response yet
        setData({ records: response, stats: { monthPresent: response.length, percentage: 0, streak: 0 } });
      }
    } catch {}
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleCheckIn() {
    setChecking(true);
    try {
      await checkIn();
      Alert.alert('✅ Checked In!', 'Your attendance has been recorded.');
      await load();
    } catch (e: any) {
      Alert.alert('Error', e.response?.data?.message || 'Already checked in today');
    }
    setChecking(false);
  }

  const records = data.records || [];
  const stats = data.stats || {};
  
  const today = new Date().toDateString();
  const checkedInToday = records.some((r: any) => new Date(r.date).toDateString() === today);

  // Generate simple current month grid
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const attendedDates = new Set(records.map((r: any) => new Date(r.date).getDate()));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 100 }}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.brand} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>
        <Text style={styles.subtitle}>Track your consistency</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.monthPresent || 0}</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.percentage || 0}%</Text>
          <Text style={styles.statLabel}>Attendance</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.streak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      {/* Check-in button */}
      <View style={styles.checkInWrapper}>
        <TouchableOpacity
          style={[styles.checkInBtn, checkedInToday && styles.checkInDone]}
          onPress={handleCheckIn}
          disabled={checkedInToday || checking}
          activeOpacity={0.8}
        >
          <View style={styles.checkInInner}>
            <Ionicons
              name={checkedInToday ? 'checkmark-circle' : 'finger-print'}
              size={40}
              color={checkedInToday ? colors.green : colors.ink}
            />
          </View>
          <Text style={[styles.checkInText, checkedInToday && { color: colors.green }]}>
            {checkedInToday ? "You're checked in for today!" : checking ? 'Checking in…' : 'Tap to Check In'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Monthly Calendar View */}
      <View style={styles.calendarCard}>
        <Text style={styles.calendarTitle}>{now.toLocaleString('default', { month: 'long', year: 'numeric' })}</Text>
        <View style={styles.calendarGrid}>
          {monthDays.map(day => {
            const isAttended = attendedDates.has(day);
            const isToday = day === now.getDate();
            return (
              <View key={day} style={[
                styles.dayCell, 
                isAttended && styles.dayAttended,
                isToday && !isAttended && styles.dayToday
              ]}>
                <Text style={[
                  styles.dayText, 
                  isAttended && styles.dayTextAttended,
                  isToday && !isAttended && styles.dayTextToday
                ]}>{day}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* History List */}
      <Text style={styles.sectionTitle}>Recent Logs</Text>
      <View style={styles.historyCard}>
        {records.length === 0 && <Text style={styles.empty}>No attendance records found.</Text>}
        {records.slice(0, 10).map((r: any, i: number) => (
          <View key={r._id || i} style={styles.historyItem}>
            <View style={styles.historyIcon}>
              <Ionicons name="checkmark" size={16} color={colors.green} />
            </View>
            <Text style={styles.historyDate}>
              {new Date(r.date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  header: { paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md },
  title: { fontSize: 28, fontWeight: '800', color: colors.white },
  subtitle: { fontSize: 14, color: colors.whiteA60, marginTop: 4 },
  statsRow: { flexDirection: 'row', paddingHorizontal: spacing.lg, gap: 12, marginBottom: spacing.lg },
  statBox: { flex: 1, backgroundColor: colors.ink700, borderRadius: radius.lg, paddingVertical: spacing.lg, alignItems: 'center', borderWidth: 1, borderColor: colors.whiteA10 },
  statValue: { fontSize: 24, fontWeight: '900', color: colors.brand },
  statLabel: { fontSize: 11, color: colors.whiteA60, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  checkInWrapper: { paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
  checkInBtn: { backgroundColor: colors.brand, borderRadius: radius.xl, paddingVertical: 24, alignItems: 'center', gap: 12, shadowColor: colors.brand, shadowOpacity: 0.3, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 10 },
  checkInDone: { backgroundColor: colors.ink700, borderWidth: 1, borderColor: 'rgba(34,197,94,0.3)', shadowOpacity: 0, elevation: 0 },
  checkInInner: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  checkInText: { fontSize: 16, fontWeight: '800', color: colors.ink },
  calendarCard: { marginHorizontal: spacing.lg, backgroundColor: colors.ink700, borderRadius: radius.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.whiteA10, marginBottom: spacing.lg },
  calendarTitle: { fontSize: 16, fontWeight: '700', color: colors.white, marginBottom: 16, textAlign: 'center' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  dayCell: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.whiteA10 },
  dayAttended: { backgroundColor: 'rgba(34,197,94,0.15)', borderColor: colors.green },
  dayToday: { borderColor: colors.brand },
  dayText: { fontSize: 13, color: colors.whiteA60, fontWeight: '600' },
  dayTextAttended: { color: colors.green },
  dayTextToday: { color: colors.brand },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: colors.white, marginLeft: spacing.lg, marginBottom: spacing.md },
  historyCard: { marginHorizontal: spacing.lg, backgroundColor: colors.ink700, borderRadius: radius.xl, padding: spacing.md, borderWidth: 1, borderColor: colors.whiteA10 },
  historyItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12, borderBottomWidth: 1, borderBottomColor: colors.whiteA10 },
  historyIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(34,197,94,0.1)', alignItems: 'center', justifyContent: 'center' },
  historyDate: { flex: 1, fontSize: 14, color: colors.white, fontWeight: '500' },
  empty: { textAlign: 'center', color: colors.whiteA40, padding: 20 },
});
