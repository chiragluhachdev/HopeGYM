import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Linking, TouchableOpacity, RefreshControl, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { fetchBranches } from '../api';

export default function BranchesScreen({ navigation }: any) {
  const [branches, setBranches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setBranches(await fetchBranches()); } catch {}
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container}>
      {/* Cinematic Hero Background */}
      <View style={styles.heroBackgroundContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80' }}
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
          <Text style={styles.navTitle}>Our Branches</Text>
          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={branches}
          keyExtractor={(item) => item._id}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.brand} />}
          contentContainerStyle={{ padding: spacing.lg, gap: 20, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.listSubtitle}>Find a Hope Gym near you and start your fitness journey today.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80' }} style={styles.image} />
                {item.featured && (
                  <View style={styles.featuredBadge}>
                    <Ionicons name="star" size={10} color={colors.ink} />
                    <Text style={styles.featuredText}>PREMIER</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.cardBody}>
                <Text style={styles.name}>{item.name}</Text>
                
                <View style={styles.infoRow}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="location" size={14} color={colors.brand} />
                  </View>
                  <Text style={styles.infoText}>{item.address}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="time" size={14} color={colors.brand} />
                  </View>
                  <Text style={styles.infoText}>{item.hours || '6:00 AM - 11:00 PM'}</Text>
                </View>

                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => Linking.openURL(`tel:${item.phone?.replace(/\s/g, '')}`)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="call" size={16} color={colors.ink} />
                    <Text style={styles.actionText}>Call Now</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={styles.actionBtnOutline}
                    onPress={() => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(item.mapsQuery || item.address)}`)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="navigate" size={16} color={colors.white} />
                    <Text style={styles.actionTextOutline}>Directions</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  
  // Cinematic Hero Background
  heroBackgroundContainer: { position: 'absolute', top: 0, left: 0, right: 0, height: 350 },
  heroImage: { width: '100%', height: '100%', opacity: 0.3 },
  heroOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(11, 11, 11, 0.7)' },
  heroYellowGlow: { position: 'absolute', top: -50, right: -50, width: 250, height: 250, borderRadius: 125, backgroundColor: colors.brand, opacity: 0.08, transform: [{ scale: 2 }] },

  // Navigation
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: spacing.sm, zIndex: 10 },
  navIcon: { padding: spacing.sm, marginLeft: -spacing.sm },
  navTitle: { fontSize: 18, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },

  listHeader: { marginBottom: spacing.md },
  listSubtitle: { fontSize: 14, color: colors.whiteA60, lineHeight: 22 },

  // Card Styles
  card: { borderRadius: 24, overflow: 'hidden', backgroundColor: colors.ink700, borderWidth: 1, borderColor: 'rgba(255, 212, 0, 0.15)', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 8 },
  imageContainer: { position: 'relative', width: '100%', height: 180 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  imageOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, backgroundColor: 'rgba(11, 11, 11, 0.8)' },
  featuredBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: colors.brand, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full, flexDirection: 'row', alignItems: 'center', gap: 4 },
  featuredText: { fontSize: 9, fontWeight: '800', color: colors.ink, letterSpacing: 1 },
  
  cardBody: { padding: spacing.lg, paddingTop: spacing.md },
  name: { fontSize: 20, fontWeight: '800', color: colors.white, marginBottom: 12 },
  
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  iconCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255, 212, 0, 0.1)', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  infoText: { flex: 1, fontSize: 13, color: colors.whiteA80, lineHeight: 20, marginTop: 4 },
  
  actions: { flexDirection: 'row', gap: 12, marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.whiteA10 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.brand, paddingVertical: 12, borderRadius: radius.lg },
  actionText: { fontSize: 14, fontWeight: '700', color: colors.ink },
  actionBtnOutline: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingVertical: 12, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.whiteA20 },
  actionTextOutline: { fontSize: 14, fontWeight: '600', color: colors.white },
});
