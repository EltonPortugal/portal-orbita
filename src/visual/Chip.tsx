import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontFamily, radius, shadow, spacing } from '../constants';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

/** Chip/pill selecionável — usado para dias da semana, filtros e categorias. */
export function Chip({ label, active, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active && styles.chipActive,
        pressed && styles.chipPressed,
      ]}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: spacing.sm + 1,
    paddingHorizontal: spacing.lg - 2,
    borderRadius: radius.md - 2,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.sm,
  },
  chipActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  chipPressed: {
    opacity: 0.75,
  },
  label: {
    fontFamily: fontFamily.monoBold,
    fontSize: 12,
    color: colors.textDim,
  },
  labelActive: {
    color: colors.panel,
  },
});
