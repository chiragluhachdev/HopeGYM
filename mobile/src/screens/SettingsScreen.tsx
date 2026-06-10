import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Linking, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useAuth } from '../AuthContext';

export default function SettingsScreen({ navigation }: any) {
  const { logout } = useAuth();

  function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  }

  const handleLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.navIcon}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Settings</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: spacing.lg, gap: 16, paddingBottom: 100 }}>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal & Info</Text>
            
            <TouchableOpacity style={styles.menuRow} onPress={() => handleLink('https://hopegymspa.com/privacy')} activeOpacity={0.7}>
              <View style={styles.iconWrap}>
                <Ionicons name="shield-checkmark-outline" size={20} color={colors.brand} />
              </View>
              <Text style={styles.menuText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.whiteA20} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuRow} onPress={() => handleLink('https://hopegymspa.com/terms')} activeOpacity={0.7}>
              <View style={styles.iconWrap}>
                <Ionicons name="document-text-outline" size={20} color={colors.brand} />
              </View>
              <Text style={styles.menuText}>Terms & Conditions</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.whiteA20} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuRow, { borderBottomWidth: 0 }]} onPress={() => handleLink('https://hopegymspa.com/about')} activeOpacity={0.7}>
              <View style={styles.iconWrap}>
                <Ionicons name="information-circle-outline" size={20} color={colors.brand} />
              </View>
              <Text style={styles.menuText}>About App</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.whiteA20} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0 (Build 42)</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Theme</Text>
              <View style={styles.themeBadge}>
                <Ionicons name="moon" size={12} color={colors.ink} />
                <Text style={styles.themeBadgeText}>PREMIUM DARK</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={20} color={colors.red} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  
  // Navigation
  topNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: spacing.sm, zIndex: 10 },
  navIcon: { padding: spacing.sm, marginLeft: -spacing.sm },
  navTitle: { fontSize: 18, fontWeight: '700', color: colors.white, letterSpacing: 0.5 },

  section: { backgroundColor: colors.ink700, borderRadius: 24, borderWidth: 1, borderColor: colors.whiteA10, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: colors.brand, textTransform: 'uppercase', letterSpacing: 1, padding: spacing.lg, paddingBottom: 4 },
  
  menuRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.whiteA10, gap: 14 },
  iconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 212, 0, 0.1)', alignItems: 'center', justifyContent: 'center' },
  menuText: { flex: 1, fontSize: 16, color: colors.white, fontWeight: '600' },
  
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: 16, borderTopWidth: 1, borderTopColor: colors.whiteA10 },
  infoLabel: { fontSize: 15, color: colors.whiteA60 },
  infoValue: { fontSize: 15, fontWeight: '700', color: colors.white },
  
  themeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.brand, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.full, gap: 4 },
  themeBadgeText: { fontSize: 10, fontWeight: '800', color: colors.ink, letterSpacing: 1 },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 12, padding: 16, borderRadius: 20, backgroundColor: 'rgba(239,68,68,0.08)', gap: 8, borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)' },
  logoutText: { fontSize: 16, fontWeight: '700', color: colors.red },
});
