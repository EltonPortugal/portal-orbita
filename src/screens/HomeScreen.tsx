import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fontFamily, spacing } from '../constants';
import { Theme, useColors, useThemedStyles } from '../theme';
import { student, nextClass, notices } from '../data';
import { useClock } from '../hooks/useClock';
import {
  Card,
  IdCard,
  QuickAction,
  ScreenContainer,
  SectionHeader,
  StatTile,
  Tag,
  ThemeToggle,
} from '../visual';
import { MainTabParamList, RootStackParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

/** Tela inicial: carteirinha, indicadores rápidos, próxima aula e mural recente. */
export function HomeScreen({ navigation }: Props) {
  const styles = useThemedStyles(makeStyles);
  const colors = useColors();
  const { greeting } = useClock();
  const recentNotices = notices.slice(0, 3);

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.name}>{student.displayName}</Text>
        </View>
        <View style={styles.headerActions}>
          <ThemeToggle />
          <Pressable style={styles.bell} onPress={() => navigation.navigate('Notices')} hitSlop={8}>
            <Feather name="bell" size={17} color={colors.violet} />
            <View style={styles.bellDot} />
          </Pressable>
        </View>
      </View>

      <View style={styles.idCardWrap}>
        <IdCard student={student} />
      </View>

      <View style={styles.statsRow}>
        <StatTile value={student.cra.toFixed(1)} label="CRA geral" />
        <StatTile value={`${student.attendance}%`} label="Frequência" />
        <StatTile value={String(student.credits)} label="Créditos" />
      </View>

      <Card style={styles.nextClass}>
        <View style={styles.nextClassBar} />
        <View style={styles.nextClassInfo}>
          <Text style={styles.nextClassSubject}>{nextClass.subject}</Text>
          <Text style={styles.nextClassMeta}>{nextClass.room}</Text>
        </View>
        <View style={styles.nextClassCountdown}>
          <Text style={styles.countdownValue}>{nextClass.startsIn}</Text>
          <Text style={styles.countdownTime}>{nextClass.time}</Text>
        </View>
      </Card>

      <View style={styles.quickGrid}>
        <QuickAction icon="credit-card" label="Financeiro" onPress={() => navigation.navigate('Financial')} />
        <QuickAction icon="book-open" label="Biblioteca" onPress={() => navigation.navigate('Library')} />
        <QuickAction icon="bell" label="Avisos" onPress={() => navigation.navigate('Notices')} />
        <QuickAction icon="help-circle" label="Suporte" onPress={() => navigation.navigate('Support')} />
      </View>

      <SectionHeader
        title="Mural recente"
        actionLabel="ver tudo"
        onActionPress={() => navigation.navigate('Notices')}
      />
      <Card>
        {recentNotices.map((notice, index) => (
          <View
            key={notice.id}
            style={[styles.noticeRow, index === recentNotices.length - 1 && styles.noticeRowLast]}
          >
            <Tag category={notice.category} />
            <Text style={styles.noticeText}>
              <Text style={styles.noticeTitle}>{notice.title}</Text> {notice.text}
            </Text>
          </View>
        ))}
      </Card>
    </ScreenContainer>
  );
}

const makeStyles = (t: Theme) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingVertical: spacing.lg,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    greeting: {
      fontFamily: fontFamily.monoRegular,
      fontSize: 10.5,
      color: t.colors.textDim,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
    },
    name: {
      fontFamily: fontFamily.display,
      fontSize: 26,
      color: t.colors.text,
      marginTop: 2,
    },
    bell: {
      width: 38,
      height: 38,
      borderRadius: 12,
      backgroundColor: t.colors.panel,
      borderWidth: 1,
      borderColor: t.colors.line,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bellDot: {
      position: 'absolute',
      top: 8,
      right: 9,
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: t.colors.rose,
      borderWidth: 1.5,
      borderColor: t.colors.panel,
    },
    idCardWrap: {
      marginBottom: spacing.xl,
    },
    statsRow: {
      flexDirection: 'row',
      gap: spacing.md - 2,
      marginBottom: spacing.xl - 2,
    },
    nextClass: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.lg - 2,
      marginBottom: spacing.xl - 2,
    },
    nextClassBar: {
      width: 4,
      alignSelf: 'stretch',
      borderRadius: 4,
      backgroundColor: t.colors.violet,
    },
    nextClassInfo: {
      flex: 1,
    },
    nextClassSubject: {
      fontFamily: fontFamily.bodyBold,
      fontSize: 14.5,
      color: t.colors.text,
    },
    nextClassMeta: {
      fontFamily: fontFamily.monoRegular,
      fontSize: 11,
      color: t.colors.textDim,
      marginTop: 3,
    },
    nextClassCountdown: {
      alignItems: 'flex-end',
    },
    countdownValue: {
      fontFamily: fontFamily.monoBold,
      fontSize: 13,
      color: t.colors.mint,
    },
    countdownTime: {
      fontFamily: fontFamily.monoRegular,
      fontSize: 9,
      color: t.colors.textFaint,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 2,
    },
    quickGrid: {
      flexDirection: 'row',
      gap: spacing.md - 2,
      marginBottom: spacing.xl,
    },
    noticeRow: {
      flexDirection: 'row',
      gap: spacing.md - 2,
      alignItems: 'flex-start',
      paddingVertical: 11,
      borderBottomWidth: 1,
      borderBottomColor: t.colors.line,
      borderStyle: 'dashed',
    },
    noticeRowLast: {
      borderBottomWidth: 0,
    },
    noticeText: {
      flex: 1,
      fontFamily: fontFamily.bodyRegular,
      fontSize: 12.5,
      color: t.colors.textDim,
      lineHeight: 18,
    },
    noticeTitle: {
      fontFamily: fontFamily.bodyBold,
      color: t.colors.text,
    },
  });
