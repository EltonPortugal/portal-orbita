import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontFamily, spacing } from '../constants';
import { grades, gradesSummary } from '../data';
import { Grade } from '../types';
import { Chip, Eyebrow, GpaRing, ProgressBar, ScreenContainer } from '../visual';

type GradeFilter = 'todas' | Grade['status'];

const filters: { key: GradeFilter; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'cursando', label: 'Cursando' },
  { key: 'concluidas', label: 'Concluídas' },
];

function average(grade: Grade) {
  return grade.av2 != null ? (grade.av1 + grade.av2) / 2 : null;
}

/** Notas e frequência: anel de CRA, filtros e cartões expansíveis por disciplina. */
export function GradesScreen() {
  const [filter, setFilter] = useState<GradeFilter>('todas');
  const filtered = useMemo(
    () => grades.filter((grade) => filter === 'todas' || grade.status === filter),
    [filter],
  );

  return (
    <ScreenContainer>
      <Eyebrow label="Desempenho acadêmico" style={styles.eyebrow} />
      <Text style={styles.heading}>Notas &amp; frequência</Text>

      <View style={styles.summaryRow}>
        <GpaRing value={gradesSummary.cra} />
        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <Text style={styles.legendLabel}>Aprovadas</Text>
            <Text style={styles.legendValue}>{gradesSummary.approved}</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendLabel}>Cursando</Text>
            <Text style={styles.legendValue}>{gradesSummary.inProgress}</Text>
          </View>
          <View style={styles.legendRow}>
            <Text style={styles.legendLabel}>Pendentes</Text>
            <Text style={styles.legendValue}>{gradesSummary.pending}</Text>
          </View>
        </View>
      </View>

      <View style={styles.filterRow}>
        {filters.map((item) => (
          <Chip key={item.key} label={item.label} active={filter === item.key} onPress={() => setFilter(item.key)} />
        ))}
      </View>

      {filtered.map((grade) => (
        <GradeCard key={grade.code} grade={grade} />
      ))}
    </ScreenContainer>
  );
}

function GradeCard({ grade }: { grade: Grade }) {
  const [open, setOpen] = useState(false);
  const media = average(grade);

  let pillLabel: string = 'Cursando';
  let pillColor: string = colors.violet;
  let pillBg: string = 'rgba(166, 84, 59, 0.16)';
  if (media !== null) {
    pillLabel = media.toFixed(1);
    pillColor = media >= 7 ? colors.mint : colors.amber;
    pillBg = media >= 7 ? 'rgba(91, 127, 58, 0.16)' : 'rgba(201, 138, 46, 0.16)';
  }

  return (
    <Pressable style={styles.card} onPress={() => setOpen((prev) => !prev)}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.subject}>{grade.subject}</Text>
          <Text style={styles.code}>{grade.code}</Text>
        </View>
        <View style={[styles.pill, { backgroundColor: pillBg }]}>
          <Text style={[styles.pillLabel, { color: pillColor }]}>{pillLabel}</Text>
        </View>
      </View>

      {open && (
        <View style={styles.detail}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>AV1</Text>
            <View style={styles.barWrap}>
              <ProgressBar percent={(grade.av1 / 10) * 100} color={colors.cyan} height={5} />
            </View>
            <Text style={styles.detailValue}>{grade.av1.toFixed(1)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>AV2</Text>
            <View style={styles.barWrap}>
              <ProgressBar percent={grade.av2 != null ? (grade.av2 / 10) * 100 : 0} color={colors.cyan} height={5} />
            </View>
            <Text style={styles.detailValue}>{grade.av2 != null ? grade.av2.toFixed(1) : '—'}</Text>
          </View>
          <Text style={styles.freqNote}>
            Frequência: {grade.frequency}% · Situação: {grade.status === 'cursando' ? 'Em andamento' : 'Aprovado'}
          </Text>
        </View>
      )}
    </Pressable>
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
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg + 2,
    marginBottom: spacing.xl + 2,
  },
  legend: {
    flex: 1,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  legendLabel: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 12,
    color: colors.textDim,
  },
  legendValue: {
    fontFamily: fontFamily.monoBold,
    fontSize: 12,
    color: colors.text,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 16,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  subject: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 13.5,
    color: colors.text,
  },
  code: {
    fontFamily: fontFamily.monoRegular,
    fontSize: 10.5,
    color: colors.textFaint,
    marginTop: 2,
  },
  pill: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pillLabel: {
    fontFamily: fontFamily.monoBold,
    fontSize: 13,
  },
  detail: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontFamily: fontFamily.monoRegular,
    fontSize: 11.5,
    color: colors.textDim,
    width: 30,
  },
  barWrap: {
    flex: 1,
    marginHorizontal: spacing.sm + 2,
  },
  detailValue: {
    fontFamily: fontFamily.monoRegular,
    fontSize: 11.5,
    color: colors.textDim,
    width: 28,
    textAlign: 'right',
  },
  freqNote: {
    fontFamily: fontFamily.monoRegular,
    fontSize: 10.5,
    color: colors.textFaint,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    borderStyle: 'dashed',
  },
});
