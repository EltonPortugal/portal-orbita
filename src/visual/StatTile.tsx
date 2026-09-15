import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, radius, shadow, spacing } from '../constants';

interface StatTileProps {
  value: string;
  label: string;
}

/** Bloco de estatística curta (CRA, Frequência, Créditos) na Home. */
export function StatTile({ value, label }: StatTileProps) {
  return (
    <View style={styles.tile}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
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
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    ...shadow.sm,
  },
  value: {
    fontFamily: fontFamily.monoBold,
    fontSize: 19,
    color: colors.cyan,
  },
  label: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 10,
    color: colors.textDim,
    marginTop: 3,
  },
});
