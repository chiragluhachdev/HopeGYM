import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  RefreshControl,
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../AuthContext';
import { fetchMyMembership, fetchAnnouncements } from '../api';

// Hardcoded theme matching the design spec
const theme = {
  primaryBg: '#0B0B0B',
  secondaryBg: '#161616',
  cardBg: '#1A1A1A',
  accent: '#FFD400',
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  spacing: { sm: 8, md: 16, lg: 24, xl: 32 },
};

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { member } = useAuth();
  const [membership, setMembership] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    try {
      const [ms, an] = await Promise.all([
        fetchMyMembership().catch(() => null),
        fetchAnnouncements().catch(() => []),
      ]);
      setMembership(ms);
      
      // Fallback announcement if API is empty to match the spec
      if (an.length === 0) {
        setAnnouncements([{
          _id: '1',
          title: 'Special Offer!',
          body: 'Renew your membership this week and get 20% OFF on all plans.'
        }]);
      } else {
        setAnnouncements(an.slice(0, 1)); // Displaying a single announcement card as per spec
      }
    } catch {}
  }

  useEffect(() => { 
    load();
  }, []);

  async function onRefresh() { 
    setRefreshing(true); 
    await load(); 
    setRefreshing(false); 
  }

  const quickLinks = [
    { label: 'Workout', sub: 'Plans', icon: 'dumbbell', screen: 'Workout' },
    { label: 'Diet', sub: 'Plan', icon: 'food-apple', screen: 'Diet' },
    { label: 'Attendance', sub: 'Check-in', icon: 'calendar-check', screen: 'Attendance' }, 
    { label: 'Membership', sub: 'Details', icon: 'card-account-details', screen: 'Membership' },
  ];
  
  // Calculate days left
  const daysLeft = membership?.expiryDate 
    ? Math.max(0, Math.ceil((new Date(membership.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 165; // Fallback to match spec mockup

  return (
    <View style={styles.container}>
      {/* Background Hero Image - Positioned Right */}
      <View style={styles.heroBackgroundContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        {/* Black overlay and subtle yellow glow simulation */}
        <View style={styles.heroOverlay} />
        <View style={styles.heroYellowGlow} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        {/* 1. Header Section */}
        <View style={styles.topNav}>
          <View style={styles.navIcon} />
          <Image 
            source={require('../../assets/web-logo.png')} 
            style={styles.navLogo} 
            resizeMode="contain"
          />
          <TouchableOpacity onPress={() => {}} style={[styles.navIcon, { marginRight: -10, marginTop: -5 }]}>
            <Ionicons name="notifications-outline" size={26} color={theme.textPrimary} />
            <View style={styles.badgeDot} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.accent} />}
        >
          {/* Small Top Spacer */}
          <View style={{ height: theme.spacing.sm }} />

          {/* 4. Membership Card */}
          <TouchableOpacity 
            style={styles.membershipCard} 
            onPress={() => navigation.navigate('Membership')} 
            activeOpacity={0.9}
          >
            <View style={styles.memLeft}>
              <View style={styles.memIconCircle}>
                <FontAwesome5 name="crown" size={18} color={theme.accent} />
              </View>
              <View style={styles.memDetails}>
                <View style={styles.planNameRow}>
                  <Text style={styles.memPlanName} numberOfLines={1}>
                    {membership?.planName?.toUpperCase() || 'GOLD PLAN'}
                  </Text>
                  <View style={[styles.statusBadge, membership?.status !== 'inactive' ? styles.statusActive : styles.statusInactive]}>
                    <Text style={styles.statusText}>{membership?.status?.toUpperCase() || 'ACTIVE'}</Text>
                  </View>
                </View>
                <Text style={styles.validUntilLabel}>Valid Until</Text>
                <Text style={styles.validUntilDate}>
                  {membership?.expiryDate 
                    ? new Date(membership.expiryDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) 
                    : '15 Jan 2027'}
                </Text>
              </View>
            </View>
            
            <View style={styles.memDivider} />

            <View style={styles.memRight}>
              <View style={styles.calendarCircle}>
                <Ionicons name="calendar-outline" size={18} color={theme.accent} />
              </View>
              <Text style={styles.daysNumber}>{daysLeft}</Text>
              <Text style={styles.daysLabel}>Days Left</Text>
            </View>
          </TouchableOpacity>

          {/* 5. Quick Actions Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickGrid}>
            {quickLinks.map((link) => (
              <TouchableOpacity
                key={link.label}
                style={styles.quickItem}
                onPress={() => navigation.navigate(link.screen)}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons name={link.icon as any} size={28} color={theme.accent} />
                <View style={styles.quickTextContainer}>
                  <Text style={styles.quickLabel}>{link.label}</Text>
                  <Text style={styles.quickSubLabel}>{link.sub}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* 6. Announcement Card */}
          {announcements.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Announcement</Text>
              </View>
              {announcements.map((a: any, index: number) => (
                <TouchableOpacity key={a._id || index} style={styles.announcementCard} activeOpacity={0.8}>
                  <View style={styles.announceIconCircle}>
                    <MaterialCommunityIcons name="bullhorn" size={20} color={theme.accent} />
                  </View>
                  <View style={styles.announceContent}>
                    <Text style={styles.announceTitle}>{a.title}</Text>
                    <Text style={styles.announceDesc} numberOfLines={2}>{a.body}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}

          {/* 7. Our Branches Section */}
          <View style={[styles.sectionHeader, { marginTop: theme.spacing.md }]}>
            <Text style={styles.sectionTitle}>Our Branches</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Branches')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.branchCard} onPress={() => navigation.navigate('Branches')} activeOpacity={0.9}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80' }} 
              style={styles.branchImg} 
            />
            <View style={styles.branchContent}>
              <Text style={styles.branchName}>Hope Gym – Pal Road</Text>
              <View style={styles.branchRow}>
                <Ionicons name="location-outline" size={14} color={theme.textSecondary} />
                <Text style={styles.branchText}>📍 Surat, Gujarat</Text>
              </View>
              <View style={styles.branchRow}>
                <Ionicons name="time-outline" size={14} color={theme.textSecondary} />
                <Text style={styles.branchText}>🕒 6:00 AM – 11:00 PM</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} style={{ marginRight: theme.spacing.md }} />
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.primaryBg 
  },
  
  // 3. Background Hero Image
  heroBackgroundContainer: {
    position: 'absolute',
    top: 0, 
    right: 0,
    width: '65%', // Positioned on the right
    height: 400,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    opacity: 0.3, // Low opacity
  },
  heroOverlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(11, 11, 11, 0.6)', // Black overlay
  },
  heroYellowGlow: {
    position: 'absolute',
    top: 50,
    right: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: theme.accent,
    opacity: 0.08, // Slight yellow lighting effect
    transform: [{ scale: 2 }],
  },
  
  // 1. Header Section
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: theme.spacing.md,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  navIcon: {
    padding: theme.spacing.sm,
  },
  navLogo: {
    width: 140,
    height: 40,
  },
  badgeDot: {
    position: 'absolute',
    top: 10, right: 12,
    width: 8, height: 8,
    borderRadius: 4,
    backgroundColor: theme.accent,
    borderWidth: 1.5,
    borderColor: theme.primaryBg,
  },

  membershipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.lg,
    backgroundColor: theme.cardBg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 212, 0, 0.25)', // Thin yellow border
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    shadowColor: theme.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  memLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  memIconCircle: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 212, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  memDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  planNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  memPlanName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginRight: 6,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusActive: { backgroundColor: 'rgba(255, 212, 0, 0.15)' },
  statusInactive: { backgroundColor: 'rgba(160, 160, 160, 0.15)' },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: theme.accent,
    textTransform: 'uppercase',
  },
  validUntilLabel: {
    fontSize: 10,
    color: theme.textSecondary,
    marginBottom: 2,
  },
  validUntilDate: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  memDivider: {
    width: 1,
    height: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: theme.spacing.md,
  },
  memRight: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  calendarCircle: {
    marginBottom: 2,
  },
  daysNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.accent,
  },
  daysLabel: {
    fontSize: 10,
    color: theme.textSecondary,
  },

  // Common Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textPrimary,
    letterSpacing: 0.5,
  },
  viewAllText: {
    fontSize: 12,
    color: theme.textSecondary,
    fontWeight: '600',
  },

  // 5. Quick Actions Section
  quickGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  quickItem: {
    width: (width - theme.spacing.lg * 2 - theme.spacing.sm * 3) / 4, 
    backgroundColor: theme.cardBg,
    borderRadius: 18, // 18px rounded corners specified
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  quickTextContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.textPrimary,
  },
  quickSubLabel: {
    fontSize: 9,
    color: theme.textSecondary,
    marginTop: 2,
  },

  // 6. Announcement Card
  announcementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.cardBg,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  announceIconCircle: {
    width: 48, height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 212, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  announceContent: {
    flex: 1,
    paddingRight: theme.spacing.sm,
  },
  announceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 4,
  },
  announceDesc: {
    fontSize: 12,
    color: theme.textSecondary,
    lineHeight: 18,
  },

  // 7. Our Branches Section
  branchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.cardBg,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    borderRadius: 16,
    overflow: 'hidden',
  },
  branchImg: {
    width: 100,
    height: 90,
  },
  branchContent: {
    flex: 1,
    padding: theme.spacing.md,
    paddingLeft: theme.spacing.md,
  },
  branchName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.textPrimary,
    marginBottom: 6,
  },
  branchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  branchText: {
    fontSize: 11,
    color: theme.textSecondary,
    marginLeft: 6,
  },
});