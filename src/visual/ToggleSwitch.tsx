import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '../constants';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

/** Interruptor on/off usado na tela de Perfil (notificações, modo escuro, biometria). */
export function ToggleSwitch({ value, onValueChange }: ToggleSwitchProps) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  const toggle = () => {
    const next = !value;
    Haptics.selectionAsync().catch(() => undefined);
    Animated.timing(anim, {
      toValue: next ? 1 : 0,
      duration: 160,
      useNativeDriver: false,
    }).start();
    onValueChange(next);
  };

  const dotLeft = anim.interpolate({ inputRange: [0, 1], outputRange: [2, 20] });
  const trackColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.panel3, colors.text],
  });

  return (
    <Pressable onPress={toggle} hitSlop={8}>
      <Animated.View style={[styles.track, { backgroundColor: trackColor, borderColor: value ? colors.text : colors.line }]}>
        <Animated.View style={[styles.dot, { left: dotLeft }]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 40,
    height: 22,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.panel,
  },
});
