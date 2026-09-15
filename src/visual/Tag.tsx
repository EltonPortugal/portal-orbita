import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily } from '../constants';
import { NoticeCategory } from '../types';
import { noticeCategoryLabel } from '../data';

const tagTheme: Record<NoticeCategory, { bg: string; fg: string }> = {
  acad: { bg: 'rgba(47, 111, 104, 0.14)', fg: colors.cyan },
  event: { bg: 'rgba(166, 84, 59, 0.14)', fg: colors.violet },
  fin: { bg: 'rgba(201, 138, 46, 0.16)', fg: colors.amber },
};

/** Etiqueta colorida de categoria (Acadêmico / Eventos / Financeiro). */
export function Tag({ category }: { category: NoticeCategory }) {
  const theme = tagTheme[category];
  return (
    <View style={[styles.tag, { backgroundColor: theme.bg }]}>
      <Text style={[styles.label, { color: theme.fg }]}>{noticeCategoryLabel[category]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 6,
  },
  label: {
    fontFamily: fontFamily.monoBold,
    fontSize: 8.5,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
