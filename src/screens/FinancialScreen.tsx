import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, fontFamily, spacing } from '../constants';
import { invoice, paymentHistory } from '../data';
import { Barcode, Button, Card, ScreenContainer, SectionHeader, TopBar } from '../visual';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Financial'>;

/** Área financeira: fatura em aberto, código de barras e histórico de pagamentos. */
export function FinancialScreen({ navigation }: Props) {
  return (
    <ScreenContainer>
      <TopBar title="Financeiro" onBack={navigation.goBack} />

      <View style={styles.banner}>
        <Feather name="alert-triangle" size={20} color={colors.amber} />
        <View>
          <Text style={styles.bannerTitle}>Fatura em aberto</Text>
          <Text style={styles.bannerSubtitle}>Vencimento em {invoice.dueDate}</Text>
        </View>
      </View>

      <Card style={styles.invoiceCard}>
        <Text style={styles.invoiceEyebrow}>{invoice.referenceLabel}</Text>
        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Valor</Text>
          <Text style={styles.invoiceValue}>{invoice.amount}</Text>
        </View>
        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Vencimento</Text>
          <Text style={styles.invoiceValue}>{invoice.dueDate}</Text>
        </View>
        <View style={styles.invoiceRow}>
          <Text style={styles.invoiceLabel}>Desconto pontualidade</Text>
          <Text style={[styles.invoiceValue, { color: colors.mint }]}>{invoice.punctualityDiscount}</Text>
        </View>
        <View style={styles.barcodeStrip}>
          <Barcode bars={46} minHeight={6} maxHeight={34} />
        </View>
        <Button label="Gerar 2ª via" />
      </Card>

      <SectionHeader title="Histórico de pagamentos" />
      <Card>
        {paymentHistory.map((entry, index) => (
          <View
            key={entry.month}
            style={[styles.historyRow, index === paymentHistory.length - 1 && styles.historyRowLast]}
          >
            <Text style={styles.historyMonth}>{entry.month}</Text>
            <Text style={styles.historyAmount}>{entry.amount}</Text>
          </View>
        ))}
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(201, 138, 46, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(201, 138, 46, 0.35)',
    marginBottom: spacing.xl - 2,
  },
  bannerTitle: {
    fontFamily: fontFamily.bodyBold,
    fontSize: 13.5,
    color: colors.amber,
  },
  bannerSubtitle: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 11,
    color: colors.textDim,
    marginTop: 2,
  },
  invoiceCard: {
    marginBottom: spacing.xl,
  },
  invoiceEyebrow: {
    fontFamily: fontFamily.monoBold,
    fontSize: 10.5,
    letterSpacing: 1.5,
    color: colors.cyan,
    marginBottom: spacing.md,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm + 2,
  },
  invoiceLabel: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 12.5,
    color: colors.textDim,
  },
  invoiceValue: {
    fontFamily: fontFamily.monoBold,
    fontSize: 12.5,
    color: colors.text,
  },
  barcodeStrip: {
    alignItems: 'center',
    marginVertical: spacing.md + 2,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    borderStyle: 'dashed',
  },
  historyRowLast: {
    borderBottomWidth: 0,
  },
  historyMonth: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 12,
    color: colors.textDim,
  },
  historyAmount: {
    fontFamily: fontFamily.monoBold,
    fontSize: 12,
    color: colors.mint,
  },
});
