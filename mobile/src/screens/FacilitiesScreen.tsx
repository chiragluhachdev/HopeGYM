import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, RefreshControl } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { fetchFacilities } from '../api';

export default function FacilitiesScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() { setLoading(true); try { setItems(await fetchFacilities()); } catch {} setLoading(false); }
  useEffect(() => { load(); }, []);

  return (
    <FlatList
      style={styles.container}
      data={items}
      keyExtractor={(item) => item._id}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.brand} />}
      contentContainerStyle={{ padding: spacing.lg, gap: 12 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
          <View style={styles.body}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  card: { borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.ink700, borderWidth: 1, borderColor: colors.whiteA10 },
  image: { width: '100%', height: 150 },
  body: { padding: spacing.md },
  name: { fontSize: 16, fontWeight: '700', color: colors.white },
  desc: { fontSize: 13, color: colors.whiteA60, marginTop: 4, lineHeight: 20 },
});
