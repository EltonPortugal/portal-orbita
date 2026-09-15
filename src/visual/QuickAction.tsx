import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontFamily, radius, shadow, spacing } from '../constants';

interface QuickActionProps {
  icon: React.ComponentProps<typeof Feather>['name'];
  label: string;
  onPress: () => void;
}

/** Atalho de ação rápida em grade (Financeiro, Biblioteca, Avisos, Suporte...). */
export function QuickAction({ icon, label, onPress }: QuickActionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <Feather name={icon} size={19} color={colors.cyan} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    ...shadow.sm,
  },
  pressed: {
    transform: [{ translateY: 1 }],
  },
  icon: {
    marginBottom: 6,
  },
  label: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 10,
    color: colors.textDim,
    textAlign: 'center',
  },
});
