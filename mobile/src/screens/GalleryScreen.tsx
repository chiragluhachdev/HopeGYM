import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, RefreshControl, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { fetchGallery } from '../api';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - spacing.lg * 2 - 8) / 2;

const filters = ['All', 'Photos', 'Events', 'Transformations', 'Facilities'];

export default function GalleryScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  async function load() { 
    setLoading(true); 
    try { 
      setItems(await fetchGallery()); 
    } catch {} 
    setLoading(false); 
  }
  
  useEffect(() => { load(); }, []);

  const filteredItems = items.filter(item => {
    if (category === 'All') return true;
    // Basic mapping, assuming backend uses lowercase categories or standard text
    if (category === 'Facilities') return item.category === 'facility';
    // Fallback fuzzy match for others if exact category match fails
    return item.category?.toLowerCase() === category.toLowerCase() || item.alt?.toLowerCase().includes(category.toLowerCase());
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gallery</Text>
      </View>

      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {filters.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, category === cat && styles.chipActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.chipText, category === cat && styles.chipTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item._id}
        numColumns={2}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} tintColor={colors.brand} />}
        contentContainerStyle={{ padding: spacing.lg, gap: 8, paddingBottom: 100 }}
        columnWrapperStyle={{ gap: 8 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.src }} style={styles.image} />
            {item.alt ? <Text style={styles.alt} numberOfLines={1}>{item.alt}</Text> : null}
          </View>
        )}
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>No images found for this category</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  header: { paddingHorizontal: spacing.lg, paddingTop: 60, paddingBottom: spacing.md },
  title: { fontSize: 28, fontWeight: '800', color: colors.white },
  filtersWrapper: { paddingBottom: spacing.md },
  filters: { paddingHorizontal: spacing.lg, gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.full, backgroundColor: colors.ink700, borderWidth: 1, borderColor: colors.whiteA10 },
  chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipText: { fontSize: 13, fontWeight: '600', color: colors.whiteA60 },
  chipTextActive: { color: colors.ink },
  card: { width: ITEM_SIZE, borderRadius: radius.md, overflow: 'hidden', backgroundColor: colors.ink700 },
  image: { width: ITEM_SIZE, height: ITEM_SIZE, resizeMode: 'cover' },
  alt: { paddingHorizontal: 8, paddingVertical: 6, fontSize: 11, color: colors.whiteA60 },
  empty: { textAlign: 'center', color: colors.whiteA40, marginTop: 40 },
});
