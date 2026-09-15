import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { colors, fontFamily, radius, shadow, spacing } from '../constants';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  icon?: React.ComponentProps<typeof Feather>['name'];
  loading?: boolean;
  style?: ViewStyle;
}

/** Botão de ação principal do app (equivalente a `.btn` / `.btn-primary` / `.logout-btn`). */
export function Button({ label, onPress, variant = 'primary', icon, loading, style }: ButtonProps) {
  const isDanger = variant === 'danger';
  const isGhost = variant === 'ghost';

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    onPress?.();
  };

  return (
    <Pressable
      disabled={loading}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        isGhost && styles.ghost,
        isDanger && styles.danger,
        !isGhost && !isDanger && styles.primary,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isGhost || isDanger ? colors.text : colors.panel} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && (
            <Feather
              name={icon}
              size={15}
              color={isDanger ? colors.rose : isGhost ? colors.text : colors.panel}
            />
          )}
          <Text
            style={[
              styles.label,
              isGhost && styles.labelGhost,
              isDanger && styles.labelDanger,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    paddingVertical: 13,
    paddingHorizontal: spacing.xl - 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.text,
    ...shadow.md,
  },
  ghost: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.sm,
  },
  danger: {
    backgroundColor: 'rgba(175, 59, 46, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(175, 59, 46, 0.3)',
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 14,
    letterSpacing: 0.3,
    color: colors.panel,
  },
  labelGhost: {
    color: colors.text,
  },
  labelDanger: {
    color: colors.rose,
  },
});
