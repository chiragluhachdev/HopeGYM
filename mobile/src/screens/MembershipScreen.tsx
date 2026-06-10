import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, RefreshControl, Image, SafeAreaView, Platform } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { fetchMyMembership, fetchMyPayments, fetchPlans, renewMembership } from '../api';

export default function MembershipScreen({ navigation }: any) {
  const [membership, setMembership] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [ms, pay, pl] = await Promise.all([
        fetchMyMembership().catch(() => null),
        fetchMyPayments().catch(() => []),
        fetchPlans().catch(() => []),
      ]);
      setMembership(ms);
      setPayments(pay);
      setPlans(pl);
    } catch {}
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleRenew(planId: string, paymentMethod: 'cod' | 'razorpay') {
    if (paymentMethod === 'razorpay') {
      Alert.alert('Coming Soon', 'Razorpay integration is a placeholder for future updates. Please select Cash at Reception for now.');
      return;
    }
    try {
      await renewMembership({ planId, paymentMethod });
      Alert.alert('✅ Renewed!', 'Your membership request has been placed. Please pay in cash at the reception.');
      load();
    } catch (e: any) {
      Alert.alert('Error', e.response?.data?.message || 'Renewal failed');
    }
  }

  return (
    <View style={styles.container}>
      {/* Cinematic Hero Background */}
      <View style={styles.heroBackgroundContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80' }}
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
          <Text style={styles.navTitle}>Membership</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.brand} />}
          contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 100, paddingTop: spacing.xl }}
        >
          {/* Current plan */}
          <View style={styles.currentCard}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <FontAwesome5 name="crown" size={16} color={colors.brand} style={{ marginRight: 6 }} />
                <Text style={styles.label}>Current Plan</Text>
              </View>
              <View style={[styles.statusBadge, membership?.status === 'active' ? styles.active : styles.expired]}>
                <Text style={[styles.statusText, membership?.status !== 'active' && { color: colors.red }]}>
                  {membership?.status || 'Inactive'}
                </Text>
              </View>
            </View>

            <Text style={styles.planName}>{membership?.planName || 'No Active Plan'}</Text>

            {membership ? (
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Membership ID</Text>
                  <Text style={styles.detailValue}>#{membership._id?.slice(-6)?.toUpperCase() || 'N/A'}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Remaining</Text>
                  <Text style={[styles.detailValue, { color: colors.brand, fontSize: 18 }]}>{membership.remainingDays || 0} Days</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Joining Date</Text>
                  <Text style={styles.detailValue}>{new Date(membership.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Expiry Date</Text>
                  <Text style={styles.detailValue}>{new Date(membership.expiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.noPlanText}>You do not have an active membership. Please select a plan below to get started.</Text>
            )}
          </View>

          {/* Plans for renewal */}
          <Text style={styles.sectionTitle}>Available Plans</Text>
          {plans.map((p: any, index: number) => (
            <View key={p._id || index} style={styles.planCard}>
              <View style={styles.planCardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.planCardName}>{p.name}</Text>
                  <Text style={styles.planCardPrice}>₹{p.price?.toLocaleString('en-IN')} <Text style={styles.planCardPeriod}>/ {p.period}</Text></Text>
                </View>
                <View style={styles.planIconCircle}>
                  <Ionicons name="flash" size={20} color={colors.ink} />
                </View>
              </View>
              
              <View style={styles.paymentOptionsRow}>
                <TouchableOpacity style={styles.renewBtn} onPress={() => handleRenew(p._id, 'cod')} activeOpacity={0.8}>
                  <Ionicons name="cash-outline" size={16} color={colors.ink} />
                  <Text style={styles.renewBtnText}>Cash at Reception</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.razorpayBtn} onPress={() => handleRenew(p._id, 'razorpay')} activeOpacity={0.8}>
                  <Ionicons name="card-outline" size={16} color={colors.white} />
                  <Text style={styles.razorpayBtnText}>Pay Online</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Payment history */}
          {payments.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Payment History</Text>
              <View style={styles.historyContainer}>
                {payments.map((p: any, index: number) => (
                  <View key={p._id || index} style={[styles.paymentItem, index === payments.length - 1 && { borderBottomWidth: 0 }]}>
                    <View style={styles.paymentIconWrap}>
                      <Ionicons name="receipt-outline" size={18} color={colors.whiteA60} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.paymentDesc}>{p.description}</Text>
                      <Text style={styles.paymentDate}>{new Date(p.createdAt).toLocaleDateString('en-IN')}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.paymentAmount}>₹{p.amount?.toLocaleString('en-IN')}</Text>
                      <View style={[styles.paymentBadge, p.status === 'paid' ? styles.active : styles.expired]}>
                        <Text style={[styles.paymentStatus, p.status !== 'paid' && { color: colors.red }]}>{p.status}</Text>
                      </View>
                    </View>
                  </View>
                ))}
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
  heroImage: { width: '100%', height: '100%', opacity: 0.35 },
  heroOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(11, 11, 11, 0.75)' },
  heroYellowGlow: { position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: 125, backgroundColor: colors.brand, opacity: 0.08, transform: [{ scale: 2 }] },

  // Navigation
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: spacing.sm, zIndex: 10 },
  navIcon: { padding: spacing.sm, marginLeft: -spacing.sm },
  navTitle: { fontSize: 18, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },

  // Current Card
  currentCard: { padding: spacing.xl, backgroundColor: colors.ink700, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255, 212, 0, 0.25)', marginBottom: spacing.xl, shadowColor: colors.brand, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 8 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  cardHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 11, fontWeight: '800', color: colors.brand, textTransform: 'uppercase', letterSpacing: 1 },
  planName: { fontSize: 32, fontWeight: '900', color: colors.white, marginBottom: 16 },
  noPlanText: { fontSize: 14, color: colors.whiteA60, lineHeight: 22 },
  
  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20, borderTopWidth: 1, borderTopColor: colors.whiteA10, paddingTop: 20 },
  detailItem: { width: '40%' },
  detailLabel: { fontSize: 11, color: colors.whiteA60, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  detailValue: { fontSize: 15, fontWeight: '800', color: colors.white },
  
  statusBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.full },
  active: { backgroundColor: 'rgba(34,197,94,0.15)' },
  expired: { backgroundColor: 'rgba(239,68,68,0.15)' },
  statusText: { fontSize: 10, fontWeight: '800', color: colors.green, textTransform: 'uppercase', letterSpacing: 1 },
  
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.white, marginBottom: spacing.md, letterSpacing: 0.5 },
  
  // Plan Cards
  planCard: { padding: spacing.lg, backgroundColor: colors.ink700, borderRadius: 20, borderWidth: 1, borderColor: colors.whiteA10, marginBottom: spacing.md, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  planCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  planCardName: { fontSize: 20, fontWeight: '800', color: colors.white },
  planCardPrice: { fontSize: 18, color: colors.brand, marginTop: 4, fontWeight: '800' },
  planCardPeriod: { fontSize: 14, color: colors.whiteA60, fontWeight: '600' },
  planIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  
  paymentOptionsRow: { flexDirection: 'row', gap: 12 },
  renewBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.brand, paddingVertical: 14, borderRadius: radius.lg },
  renewBtnText: { fontSize: 13, fontWeight: '800', color: colors.ink },
  razorpayBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderWidth: 1, borderColor: colors.whiteA20, paddingVertical: 14, borderRadius: radius.lg },
  razorpayBtnText: { fontSize: 13, fontWeight: '700', color: colors.white },
  
  // History
  historyContainer: { backgroundColor: colors.ink700, borderRadius: 20, borderWidth: 1, borderColor: colors.whiteA10, overflow: 'hidden' },
  paymentItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.whiteA10, gap: 16 },
  paymentIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.05)', alignItems: 'center', justifyContent: 'center' },
  paymentDesc: { fontSize: 15, fontWeight: '700', color: colors.white },
  paymentDate: { fontSize: 12, color: colors.whiteA40, marginTop: 4 },
  paymentAmount: { fontSize: 16, fontWeight: '800', color: colors.white, marginBottom: 4 },
  paymentBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.full },
  paymentStatus: { fontSize: 9, fontWeight: '800', color: colors.green, textTransform: 'uppercase', letterSpacing: 0.5 },
});
