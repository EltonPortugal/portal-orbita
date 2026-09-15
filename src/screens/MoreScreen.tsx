import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, fontFamily, spacing } from '../constants';
import { Eyebrow, MoreTile, ScreenContainer } from '../visual';
import { MainTabParamList, RootStackParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'More'>,
  NativeStackScreenProps<RootStackParamList>
>;

/** Grade de navegação para as demais áreas do portal e encerramento de sessão. */
export function MoreScreen({ navigation }: Props) {
  const rootNavigation = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScreenContainer>
      <Eyebrow label="Navegação" style={styles.eyebrow} />
      <Text style={styles.heading}>Mais opções</Text>

      <View style={styles.grid}>
        <MoreTile
          icon="credit-card"
          title="Financeiro"
          description="Boletos e pagamentos"
          onPress={() => navigation.navigate('Financial')}
        />
        <MoreTile
          icon="book-open"
          title="Biblioteca"
          description="Empréstimos e acervo"
          onPress={() => navigation.navigate('Library')}
        />
        <MoreTile
          icon="bell"
          title="Mural"
          description="Avisos e comunicados"
          onPress={() => navigation.navigate('Notices')}
        />
        <MoreTile
          icon="user"
          title="Perfil"
          description="Dados e configurações"
          onPress={() => navigation.navigate('Profile')}
        />
        <MoreTile
          icon="help-circle"
          title="Suporte"
          description="Central de ajuda"
          onPress={() => navigation.navigate('Support')}
        />
        <MoreTile
          icon="log-out"
          title="Sair"
          description="Encerrar sessão"
          tone="rose"
          onPress={() => rootNavigation?.reset({ index: 0, routes: [{ name: 'Login' }] })}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    marginTop: 16,
  },
  heading: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 19,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
});
