import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants';

interface ScreenContainerProps {
  children: React.ReactNode;
  /** Desativa o scroll quando a tela já controla sua própria rolagem. */
  scrollable?: boolean;
  contentStyle?: ViewStyle;
}

/** Casco padrão de tela: fundo "papel", área segura e rolagem com respiro inferior. */
export function ScreenContainer({ children, scrollable = true, contentStyle }: ScreenContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={[styles.content, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.void,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 40,
  },
});
