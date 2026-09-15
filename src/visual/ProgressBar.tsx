import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../constants';

interface ProgressBarProps {
  /** 0 a 100 */
  percent: number;
  color?: string;
  height?: number;
}

/** Barra de progresso simples (usada em disciplinas e no detalhe de notas). */
export function ProgressBar({ percent, color = colors.violet, height = 6 }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <View style={[styles.track, { height, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          { width: `${clamped}%`, backgroundColor: color, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: colors.panel3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
  },
});
