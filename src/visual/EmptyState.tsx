import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, fontFamily } from '../constants';

interface EmptyStateProps {
  icon: React.ComponentProps<typeof Feather>['name'];
  message: string;
}

/** Estado vazio genérico (ex.: dia sem aulas no Horário). */
export function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <Feather name={icon} size={34} color={colors.textFaint} style={styles.icon} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 10,
  },
  icon: {
    marginBottom: 10,
  },
  message: {
    fontFamily: fontFamily.monoRegular,
    fontSize: 12.5,
    color: colors.textFaint,
  },
});
