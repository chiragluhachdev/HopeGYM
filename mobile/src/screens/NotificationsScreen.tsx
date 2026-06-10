import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../theme';
import { fetchNotifications, markRead } from '../api';

export default function NotificationsScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setItems(await fetchNotifications()); } catch {}
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleRead(id: string) {
    try {
      await markRead(id);
      setItems((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)));
    } catch {}
  }

  const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
    membership: 'card',
    announcement: 'megaphone',
    attendance: 'calendar',
    offer: 'pricetag',
    event: 'calendar-number',
    holiday: 'partly-sunny',
    general: 'notifications',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.brand} />}
        contentContainerStyle={{ padding: spacing.lg, gap: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, !item.read && styles.cardUnread]}
            onPress={() => handleRead(item._id)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrap}>
              <Ionicons name={iconMap[item.type] || 'notifications'} size={20} color={colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBody}>{item.body}</Text>
              <Text style={styles.cardTime}>{new Date(item.createdAt).toLocaleDateString('en-IN')}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        )}
        ListEmptyComponent={!loading ? <Text style={styles.empty}>No notifications yet</Text> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  header: { paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md },
  title: { fontSize: 28, fontWeight: '800', color: colors.white },
  card: { flexDirection: 'row', alignItems: 'flex-start', padding: spacing.md, backgroundColor: colors.ink700, borderRadius: radius.lg, gap: 12, borderWidth: 1, borderColor: colors.whiteA10 },
  cardUnread: { borderColor: 'rgba(255,212,0,0.2)', backgroundColor: 'rgba(255,212,0,0.04)' },
  iconWrap: { width: 40, height: 40, borderRadius: radius.md, backgroundColor: 'rgba(255,212,0,0.1)', alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.white },
  cardBody: { fontSize: 13, color: colors.whiteA60, marginTop: 2, lineHeight: 20 },
  cardTime: { fontSize: 11, color: colors.whiteA40, marginTop: 4 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.brand, marginTop: 4 },
  empty: { textAlign: 'center', color: colors.whiteA40, marginTop: 40, fontSize: 14 },
});
