import { Platform } from 'react-native';
import { colors } from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 14,
  xl: 16,
  pill: 20,
} as const;

/**
 * Sombras equivalentes às variáveis `--shadow-sm` / `--shadow-md` / `--shadow-lift`
 * de `legacy/style.css`, adaptadas para as APIs de sombra do iOS/Android.
 */
function paperShadow(opacity: number, radiusPx: number, elevation: number) {
  return Platform.select({
    android: { elevation },
    default: {
      shadowColor: colors.text,
      shadowOffset: { width: 0, height: Math.round(radiusPx / 3) },
      shadowOpacity: opacity,
      shadowRadius: radiusPx,
    },
  });
}

export const shadow = {
  sm: paperShadow(0.08, 6, 2),
  md: paperShadow(0.1, 12, 4),
  lift: paperShadow(0.22, 24, 10),
} as const;
