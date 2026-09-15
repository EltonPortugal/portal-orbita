import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontFamily, radius, shadow, spacing } from '../constants';

interface TopBarProps {
  title: string;
  onBack: () => void;
}

/** Cabeçalho com botão de voltar, usado em todas as telas secundárias. */
export function TopBar({ title, onBack }: TopBarProps) {
  return (
    <View style={styles.row}>
      <Pressable onPress={onBack} style={styles.backBtn} hitSlop={8}>
        <Feather name="chevron-left" size={18} color={colors.violet} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.lg - 2,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: radius.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.sm,
  },
  title: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 19,
    color: colors.text,
  },
});
