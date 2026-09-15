import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../constants';
import { courses } from '../data';
import { Eyebrow, ProgressBar, ScreenContainer } from '../visual';

/** Lista de disciplinas do semestre corrente com progresso individual. */
export function CoursesScreen() {
  return (
    <ScreenContainer>
      <Eyebrow label="Semestre 2026.2" style={styles.eyebrow} />
      <Text style={styles.heading}>Minhas disciplinas</Text>

      {courses.map((course) => (
        <View key={course.subject} style={styles.card}>
          <View style={styles.top}>
            <View style={styles.topInfo}>
              <Text style={styles.subject}>{course.subject}</Text>
              <Text style={styles.professor}>{course.professor}</Text>
            </View>
            <View style={styles.creditsBadge}>
              <Text style={styles.creditsLabel}>{course.credits} créditos</Text>
            </View>
          </View>
          <ProgressBar percent={course.progress} color={colors.violet} height={6} />
          <View style={styles.footer}>
            <Text style={styles.footerText}>{course.progress}% do semestre</Text>
            <Text style={styles.footerText}>{course.room}</Text>
          </View>
        </View>
      ))}
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
    marginBottom: spacing.xl - 2,
  },
  card: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    padding: 15,
    marginBottom: spacing.md,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md - 2,
  },
  topInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  subject: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 14,
    color: colors.text,
  },
  professor: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 11.5,
    color: colors.textDim,
    marginTop: 3,
  },
  creditsBadge: {
    backgroundColor: 'rgba(47, 111, 104, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 7,
  },
  creditsLabel: {
    fontFamily: fontFamily.monoBold,
    fontSize: 10,
    color: colors.cyan,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  footerText: {
    fontFamily: fontFamily.monoRegular,
    fontSize: 10.5,
    color: colors.textFaint,
  },
});
