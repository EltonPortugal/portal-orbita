import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants';

interface BarcodeProps {
  bars?: number;
  minHeight?: number;
  maxHeight?: number;
}

/** Código de barras decorativo (carteirinha e boleto), gerado com alturas aleatórias. */
export function Barcode({ bars = 14, minHeight = 6, maxHeight = 18 }: BarcodeProps) {
  const heights = useMemo(
    () => Array.from({ length: bars }, () => minHeight + Math.random() * (maxHeight - minHeight)),
    [bars, minHeight, maxHeight],
  );

  return (
    <View style={styles.row}>
      {heights.map((height, index) => (
        <View key={index} style={[styles.bar, { height }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar: {
    width: 2,
    backgroundColor: colors.text,
    opacity: 0.65,
  },
});
