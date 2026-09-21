import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorScheme, Theme, darkTheme, lightTheme } from './palettes';

const STORAGE_KEY = '@portal-orbita/color-scheme';

interface ThemeContextValue {
  theme: Theme;
  scheme: ColorScheme;
  /** `false` enquanto a preferência salva ainda está sendo lida do disco. */
  hydrated: boolean;
  setScheme: (scheme: ColorScheme) => void;
  toggleScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function persist(scheme: ColorScheme) {
  // Falha ao gravar não pode derrubar a troca de tema — a sessão atual segue correta.
  AsyncStorage.setItem(STORAGE_KEY, scheme).catch(() => undefined);
}

/**
 * Guarda o modo claro/escuro e o devolve já resolvido em cores. A escolha é
 * gravada no aparelho, então o app reabre no tema que o usuário deixou.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [scheme, setSchemeState] = useState<ColorScheme>('light');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (active && (stored === 'light' || stored === 'dark')) {
          setSchemeState(stored);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setHydrated(true);
      });
    return () => {
      active = false;
    };
  }, []);

  /**
   * Alinha a camada nativa ao tema do app. Sem isto, o que o React Native não
   * pinta — teclado, modais e seletores do sistema — seguiria a aparência do
   * aparelho, e um app escuro levantaria um teclado branco. Depende de
   * `userInterfaceStyle: "automatic"` no app.json; se estiver travado em
   * "light" ou "dark", o sistema ignora esta chamada.
   */
  useEffect(() => {
    // Ausente no React Native Web, onde não há camada nativa para alinhar.
    Appearance.setColorScheme?.(scheme);
  }, [scheme]);

  const setScheme = useCallback((next: ColorScheme) => {
    setSchemeState(next);
    persist(next);
  }, []);

  const toggleScheme = useCallback(() => {
    setSchemeState((previous) => {
      const next: ColorScheme = previous === 'dark' ? 'light' : 'dark';
      persist(next);
      return next;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: scheme === 'dark' ? darkTheme : lightTheme,
      scheme,
      hydrated,
      setScheme,
      toggleScheme,
    }),
    [scheme, hydrated, setScheme, toggleScheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme precisa estar dentro de <ThemeProvider>.');
  }
  return context;
}

/** Atalho para quem só precisa das cores da paleta ativa. */
export function useColors() {
  return useTheme().theme.colors;
}

/**
 * Versão temática de `StyleSheet.create`. Recebe a fábrica de estilos declarada
 * no escopo do módulo e a reexecuta sempre que o tema muda — é isto que faz a
 * folha de estilos deixar de ser um retrato fixo das cores do import.
 *
 * A fábrica é quem chama `StyleSheet.create`, para que o TypeScript preserve a
 * tipagem literal dos estilos (`textTransform: 'uppercase'` e afins).
 */
export function useThemedStyles<T>(makeStyles: (theme: Theme) => T): T {
  const { theme } = useTheme();
  return useMemo(() => makeStyles(theme), [theme, makeStyles]);
}
