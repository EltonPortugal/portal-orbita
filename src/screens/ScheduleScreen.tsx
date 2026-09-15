import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../constants';
import { dayNames, dayOrder, schedule } from '../data';
import { DayKey } from '../types';
import { Chip, EmptyState, Eyebrow, ScreenContainer } from '../visual';

/** Mapeia `Date#getDay()` (0 = domingo) para a chave do dia letivo mais próxima. */
function resolveTodayKey(): DayKey {
  const jsWeekday = new Date().getDay();
  const weekdayToDayKey: DayKey[] = ['SÁB', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  return weekdayToDayKey[jsWeekday] ?? 'SEG';
}

/** Grade semanal de aulas com seletor de dia — equivalente às telas "Horário". */
export function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState<DayKey>(resolveTodayKey);
  const classes = useMemo(() => schedule[selectedDay] ?? [], [selectedDay]);

  return (
    <ScreenContainer scrollable={false}>
      <Eyebrow label="Horário semanal" style={styles.eyebrow} />
      <Text style={styles.heading}>Suas aulas</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dayChips}
      >
        {dayOrder.map((day) => (
          <Chip key={day} label={day} active={day === selectedDay} onPress={() => setSelectedDay(day)} />
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {classes.length === 0 ? (
          <EmptyState icon="calendar" message={`Sem aulas em ${dayNames[selectedDay]}`} />
        ) : (
          classes.map((session, index) => (
            <View key={`${session.time}-${session.subject}`} style={styles.classItem}>
              <Text style={styles.time}>{session.time}</Text>
              <View style={styles.timeline}>
                <View style={[styles.node, { backgroundColor: session.color }]} />
                {index < classes.length - 1 && <View style={styles.stem} />}
              </View>
              <View style={styles.classCard}>
                <Text style={styles.subject}>{session.subject}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.meta}>{session.room}</Text>
                  <Text style={styles.meta}>{session.professor}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  dayChips: {
    gap: spacing.sm,
    paddingBottom: spacing.md + 2,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  classItem: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  time: {
    width: 44,
    textAlign: 'right',
    paddingTop: 14,
    fontFamily: fontFamily.monoBold,
    fontSize: 11,
    color: colors.textDim,
  },
  timeline: {
    alignItems: 'center',
  },
  node: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 12,
    borderWidth: 2,
    borderColor: colors.panel,
  },
  stem: {
    flex: 1,
    width: 1,
    backgroundColor: colors.line,
    marginVertical: 4,
  },
  classCard: {
    flex: 1,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg - 2,
    marginBottom: 2,
  },
  subject: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 13.5,
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md - 2,
    marginTop: 4,
  },
  meta: {
    fontFamily: fontFamily.monoRegular,
    fontSize: 11,
    color: colors.textDim,
  },
});
