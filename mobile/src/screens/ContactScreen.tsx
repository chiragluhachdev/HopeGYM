import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';

const PHONE = '8796797503';
const WHATSAPP = '918796797503';
const EMAIL = 'info@hopegymspa.com';
const WEBSITE = 'https://hopegymspa.com'; // Replace with actual domain
const MAPS_URL = 'https://maps.google.com/?q=Hope+Gym+and+Spa';

export default function ContactScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: spacing.lg, gap: 16 }}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Get in Touch</Text>
        <Text style={styles.heroDesc}>We'd love to hear from you. Reach out via phone, WhatsApp, email, or visit us directly.</Text>
      </View>

      <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(`tel:+91${PHONE}`)} activeOpacity={0.7}>
        <View style={styles.iconBox}><Ionicons name="call" size={22} color={colors.brand} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.contactLabel}>Call Gym</Text>
          <Text style={styles.contactValue}>+91 {PHONE}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.whiteA20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(`https://wa.me/${WHATSAPP}`)} activeOpacity={0.7}>
        <View style={[styles.iconBox, { backgroundColor: 'rgba(37,211,102,0.1)' }]}><Ionicons name="logo-whatsapp" size={22} color="#25D366" /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.contactLabel}>WhatsApp</Text>
          <Text style={styles.contactValue}>Chat with us</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.whiteA20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(`mailto:${EMAIL}`)} activeOpacity={0.7}>
        <View style={[styles.iconBox, { backgroundColor: 'rgba(59,130,246,0.1)' }]}><Ionicons name="mail" size={22} color="#3B82F6" /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>{EMAIL}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.whiteA20} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(WEBSITE)} activeOpacity={0.7}>
        <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.1)' }]}><Ionicons name="globe-outline" size={22} color={colors.white} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.contactLabel}>Website</Text>
          <Text style={styles.contactValue}>Visit Online</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.whiteA20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(MAPS_URL)} activeOpacity={0.7}>
        <View style={[styles.iconBox, { backgroundColor: 'rgba(239,68,68,0.1)' }]}><Ionicons name="location" size={22} color={colors.red} /></View>
        <View style={{ flex: 1 }}>
          <Text style={styles.contactLabel}>Google Maps</Text>
          <Text style={styles.contactValue}>Get Directions</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.whiteA20} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  heroCard: { padding: spacing.xl, backgroundColor: colors.ink700, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.whiteA10 },
  heroTitle: { fontSize: 24, fontWeight: '800', color: colors.white },
  heroDesc: { fontSize: 14, color: colors.whiteA60, marginTop: 8, lineHeight: 22 },
  contactItem: { flexDirection: 'row', alignItems: 'center', padding: spacing.lg, backgroundColor: colors.ink700, borderRadius: radius.lg, gap: 14, borderWidth: 1, borderColor: colors.whiteA10 },
  iconBox: { width: 44, height: 44, borderRadius: radius.md, backgroundColor: 'rgba(255,212,0,0.1)', alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: 12, color: colors.whiteA40 },
  contactValue: { fontSize: 16, fontWeight: '600', color: colors.white, marginTop: 2 },
});
