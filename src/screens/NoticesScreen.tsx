import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { fontFamily, spacing } from '../constants';
import { Palette, Theme, useColors, useThemedStyles } from '../theme';
import { notices } from '../data';
import { NoticeCategory } from '../types';
import { ScreenContainer, Tag, TopBar } from '../visual';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Notices'>;

/** Bolinha que marca a categoria do aviso na lateral da lista. */
function categoryDot(colors: Palette, category: NoticeCategory) {
  switch (category) {
    case 'acad':
      return colors.cyan;
    case 'event':
      return colors.violet;
    case 'fin':
      return colors.amber;
  }
}

/** Mural completo de avisos institucionais. */
export function NoticesScreen({ navigation }: Props) {
  const styles = useThemedStyles(makeStyles);
  const colors = useColors();
  return (
    <ScreenContainer>
      <TopBar title="Mural de avisos" onBack={navigation.goBack} />

      {notices.map((notice, index) => (
        <View
          key={notice.id}
          style={[styles.row, index === notices.length - 1 && styles.rowLast]}
        >
          <View style={[styles.dot, { backgroundColor: categoryDot(colors, notice.category) }]} />
          <View style={styles.body}>
            <View style={styles.head}>
              <Text style={styles.title}>{notice.title}</Text>
              <Tag category={notice.category} />
            </View>
            <Text style={styles.text}>{notice.text}</Text>
            <Text style={styles.date}>{notice.date}</Text>
          </View>
        </View>
      ))}
    </ScreenContainer>
  );
}

const makeStyles = (t: Theme) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: spacing.md,
      paddingVertical: spacing.lg - 2,
      borderBottomWidth: 1,
      borderBottomColor: t.colors.line,
      borderStyle: 'dashed',
    },
    rowLast: {
      borderBottomWidth: 0,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginTop: 6,
    },
    body: {
      flex: 1,
    },
    head: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: spacing.sm,
      marginBottom: 4,
    },
    title: {
      flex: 1,
      fontFamily: fontFamily.bodyBold,
      fontSize: 13,
      color: t.colors.text,
    },
    text: {
      fontFamily: fontFamily.bodyRegular,
      fontSize: 12,
      color: t.colors.textDim,
      lineHeight: 18,
    },
    date: {
      fontFamily: fontFamily.monoRegular,
      fontSize: 10,
      color: t.colors.textFaint,
      marginTop: 6,
    },
  });
