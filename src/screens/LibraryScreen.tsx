import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, shadow, spacing } from '../constants';
import { libraryCategories, loans } from '../data';
import { Chip, SectionHeader, ScreenContainer, TopBar } from '../visual';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Library'>;

const dueStatusColor = {
  ok: { fg: colors.mint, bg: 'rgba(91, 127, 58, 0.14)' },
  warn: { fg: colors.rose, bg: 'rgba(175, 59, 46, 0.14)' },
};

/** Biblioteca: busca, categorias e lista de empréstimos ativos. */
export function LibraryScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(libraryCategories[0]);

  return (
    <ScreenContainer>
      <TopBar title="Biblioteca" onBack={navigation.goBack} />

      <View style={styles.searchBox}>
        <Feather name="search" size={16} color={colors.textDim} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar título, autor ou ISBN..."
          placeholderTextColor={colors.textFaint}
          style={styles.searchInput}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {libraryCategories.map((category) => (
          <Chip
            key={category}
            label={category}
            active={category === activeCategory}
            onPress={() => setActiveCategory(category)}
          />
        ))}
      </ScrollView>

      <SectionHeader title="Meus empréstimos" />
      {loans.map((book) => {
        const tone = dueStatusColor[book.dueStatus];
        return (
          <View key={book.id} style={styles.bookRow}>
            <View style={styles.cover} />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
            </View>
            <View style={[styles.duePill, { backgroundColor: tone.bg }]}>
              <Text style={[styles.dueLabel, { color: tone.fg }]}>{book.dueLabel}</Text>
            </View>
          </View>
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: spacing.xl - 2,
    ...shadow.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.monoRegular,
    fontSize: 13,
    color: colors.text,
  },
  categoryRow: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  bookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg - 2,
  },
  cover: {
    width: 42,
    height: 56,
    borderRadius: 4,
    backgroundColor: colors.violet,
    ...shadow.sm,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 13,
    color: colors.text,
  },
  bookAuthor: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 11,
    color: colors.textDim,
    marginTop: 2,
  },
  duePill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 7,
  },
  dueLabel: {
    fontFamily: fontFamily.monoBold,
    fontSize: 10.5,
  },
});
