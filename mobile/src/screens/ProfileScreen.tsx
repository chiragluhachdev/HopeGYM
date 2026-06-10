import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator, Image, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { useAuth } from '../AuthContext';
import { fetchMyMembership, updateMe, fetchBranches } from '../api';

export default function ProfileScreen({ navigation }: any) {
  const { member, refresh } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState(member?.name || '');
  const [email, setEmail] = useState(member?.email || '');
  const [height, setHeight] = useState(member?.height?.toString() || '');
  const [weight, setWeight] = useState(member?.weight?.toString() || '');
  const [goal, setGoal] = useState(member?.goal || '');

  // Display data
  const [membership, setMembership] = useState<any>(null);
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    fetchMyMembership().then(setMembership).catch(() => {});
    fetchBranches().then(setBranches).catch(() => {});
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateMe({
        name,
        email,
        height: height ? Number(height) : undefined,
        weight: weight ? Number(weight) : undefined,
        goal
      });
      await refresh();
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (e: any) {
      Alert.alert('Error', e.response?.data?.message || 'Update failed');
    }
    setLoading(false);
  };

  const branchName = member?.branchId?.name || branches.find(b => b._id === member?.branchId)?.name || 'Not assigned';

  return (
    <View style={styles.container}>
      {/* Cinematic Hero Background for Profile */}
      <View style={styles.heroBackgroundContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroYellowGlow} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={{ width: 40 }} />
              <Text style={styles.headerTitle}>Profile</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.settingsIcon}>
                <Ionicons name="settings-outline" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{member?.name?.charAt(0)?.toUpperCase() || '?'}</Text>
              </View>
              <TouchableOpacity style={styles.editPhotoBtn}>
                <Ionicons name="camera" size={16} color={colors.ink} />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{member?.name}</Text>
            <Text style={styles.phone}>{member?.phone}</Text>
            
            <View style={styles.headerBadge}>
              <Ionicons name="star" size={12} color={colors.ink} />
              <Text style={styles.headerBadgeText}>PRO MEMBER</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Personal Details</Text>
              <TouchableOpacity onPress={() => isEditing ? handleSave() : setIsEditing(true)}>
                {loading ? <ActivityIndicator color={colors.brand} /> : <Text style={styles.editText}>{isEditing ? 'Save' : 'Edit'}</Text>}
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <View style={styles.fieldRow}>
                <View style={styles.fieldLabelWrap}>
                  <Ionicons name="person-outline" size={16} color={colors.whiteA40} />
                  <Text style={styles.fieldLabel}>Full Name</Text>
                </View>
                {isEditing ? (
                  <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor={colors.whiteA40} />
                ) : (
                  <Text style={styles.fieldValue}>{member?.name}</Text>
                )}
              </View>
              
              <View style={styles.fieldRow}>
                <View style={styles.fieldLabelWrap}>
                  <Ionicons name="mail-outline" size={16} color={colors.whiteA40} />
                  <Text style={styles.fieldLabel}>Email</Text>
                </View>
                {isEditing ? (
                  <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholderTextColor={colors.whiteA40} />
                ) : (
                  <Text style={styles.fieldValue}>{member?.email || 'Not provided'}</Text>
                )}
              </View>

              <View style={styles.fieldRow}>
                <View style={styles.fieldLabelWrap}>
                  <Ionicons name="resize-outline" size={16} color={colors.whiteA40} />
                  <Text style={styles.fieldLabel}>Height</Text>
                </View>
                {isEditing ? (
                  <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" placeholder="cm" placeholderTextColor={colors.whiteA40} />
                ) : (
                  <Text style={styles.fieldValue}>{member?.height ? `${member.height} cm` : 'Not provided'}</Text>
                )}
              </View>

              <View style={styles.fieldRow}>
                <View style={styles.fieldLabelWrap}>
                  <Ionicons name="barbell-outline" size={16} color={colors.whiteA40} />
                  <Text style={styles.fieldLabel}>Weight</Text>
                </View>
                {isEditing ? (
                  <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" placeholder="kg" placeholderTextColor={colors.whiteA40} />
                ) : (
                  <Text style={styles.fieldValue}>{member?.weight ? `${member.weight} kg` : 'Not provided'}</Text>
                )}
              </View>

              <View style={styles.fieldRow}>
                <View style={styles.fieldLabelWrap}>
                  <Ionicons name="flag-outline" size={16} color={colors.whiteA40} />
                  <Text style={styles.fieldLabel}>Fitness Goal</Text>
                </View>
                {isEditing ? (
                  <TextInput style={styles.input} value={goal} onChangeText={setGoal} placeholderTextColor={colors.whiteA40} />
                ) : (
                  <Text style={styles.fieldValue}>{member?.goal || 'Not provided'}</Text>
                )}
              </View>

              <View style={[styles.fieldRow, { borderBottomWidth: 0 }]}>
                <View style={styles.fieldLabelWrap}>
                  <Ionicons name="business-outline" size={16} color={colors.whiteA40} />
                  <Text style={styles.fieldLabel}>Home Branch</Text>
                </View>
                <Text style={styles.fieldValue}>{branchName}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Membership Summary</Text>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Membership')} activeOpacity={0.8}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={styles.planName}>{membership?.planName || 'No Active Plan'}</Text>
                  <Text style={styles.planStatus}>Status: {membership?.status || 'N/A'}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.whiteA40} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>More Options</Text>
            <View style={styles.card}>
              {[
                { label: 'Diet Plan', icon: 'restaurant-outline', screen: 'Diet' },
                { label: 'Our Branches', icon: 'location-outline', screen: 'Branches' },
                { label: 'Facilities', icon: 'grid-outline', screen: 'Facilities' },
                { label: 'Gallery', icon: 'images-outline', screen: 'Gallery' },
                { label: 'Contact Us', icon: 'call-outline', screen: 'Contact' },
              ].map((item, index) => (
                <TouchableOpacity key={item.label} style={[styles.menuItem, index === 4 && { borderBottomWidth: 0 }]} onPress={() => navigation.navigate(item.screen as any)}>
                  <View style={styles.menuIconWrap}>
                    <Ionicons name={item.icon as any} size={18} color={colors.brand} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={18} color={colors.whiteA20} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
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

  header: { alignItems: 'center', paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: spacing.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: spacing.lg, alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
  settingsIcon: { padding: 8, marginRight: -8 },
  
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255, 212, 0, 0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.brand, shadowColor: colors.brand, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  avatarText: { fontSize: 40, fontWeight: '900', color: colors.brand },
  editPhotoBtn: { position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.brand, width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.ink },
  
  name: { fontSize: 28, fontWeight: '900', color: colors.white, marginBottom: 4 },
  phone: { fontSize: 14, color: colors.whiteA60, marginBottom: 12 },
  headerBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.brand, paddingHorizontal: 12, paddingVertical: 4, borderRadius: radius.full, gap: 4 },
  headerBadgeText: { fontSize: 10, fontWeight: '800', color: colors.ink, letterSpacing: 1 },
  
  section: { marginTop: spacing.xl, paddingHorizontal: spacing.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: colors.white, letterSpacing: 0.5 },
  editText: { fontSize: 14, fontWeight: '700', color: colors.brand, padding: 4 },
  
  card: { backgroundColor: colors.ink700, borderRadius: 24, padding: spacing.lg, borderWidth: 1, borderColor: colors.whiteA10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  fieldRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.whiteA10 },
  fieldLabelWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  fieldLabel: { fontSize: 14, color: colors.whiteA60 },
  fieldValue: { fontSize: 15, color: colors.white, fontWeight: '700', flex: 2, textAlign: 'right' },
  input: { flex: 2, backgroundColor: 'rgba(255,255,255,0.05)', color: colors.white, borderRadius: radius.md, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, textAlign: 'right', borderWidth: 1, borderColor: colors.brand },
  
  planName: { fontSize: 18, fontWeight: '800', color: colors.white },
  planStatus: { fontSize: 13, color: colors.brand, marginTop: 4, fontWeight: '700' },
  
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 14, borderBottomWidth: 1, borderBottomColor: colors.whiteA10 },
  menuIconWrap: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 212, 0, 0.1)', alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.white },
});
