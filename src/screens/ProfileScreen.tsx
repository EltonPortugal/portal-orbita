import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, fontFamily, spacing } from '../constants';
import { student } from '../data';
import { Button, Eyebrow, IdCard, ScreenContainer, ToggleSwitch } from '../visual';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

/** Perfil do estudante: dados pessoais e preferências de conta. */
export function ProfileScreen({ navigation }: Props) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [faceId, setFaceId] = useState(false);

  return (
    <ScreenContainer>
      <Eyebrow label="Conta" style={styles.eyebrow} />
      <Text style={styles.heading}>Meu perfil</Text>

      <View style={styles.idCardWrap}>
        <IdCard student={student} showMeta={false} />
      </View>

      <View style={styles.list}>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <MaterialCommunityIcons name="card-account-details-outline" size={16} color={colors.cyan} />
            <Text style={styles.rowLabel}>CPF</Text>
          </View>
          <Text style={styles.rowValue}>{student.cpfMasked}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="mail" size={16} color={colors.cyan} />
            <Text style={styles.rowLabel}>E-mail institucional</Text>
          </View>
          <Text style={styles.rowValue}>{student.institutionalEmail}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="phone" size={16} color={colors.cyan} />
            <Text style={styles.rowLabel}>Telefone</Text>
          </View>
          <Text style={styles.rowValue}>{student.phoneMasked}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="bell" size={16} color={colors.cyan} />
            <Text style={styles.rowLabel}>Notificações push</Text>
          </View>
          <ToggleSwitch value={pushNotifications} onValueChange={setPushNotifications} />
        </View>
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Feather name="moon" size={16} color={colors.cyan} />
            <Text style={styles.rowLabel}>Modo escuro</Text>
          </View>
          <ToggleSwitch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <View style={[styles.row, styles.rowLast]}>
          <View style={styles.rowLeft}>
            <MaterialCommunityIcons name="face-recognition" size={16} color={colors.cyan} />
            <Text style={styles.rowLabel}>Biometria facial</Text>
          </View>
          <ToggleSwitch value={faceId} onValueChange={setFaceId} />
        </View>
      </View>

      <Button
        label="Encerrar sessão"
        variant="danger"
        style={styles.logoutButton}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
      />
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
  idCardWrap: {
    marginBottom: spacing.md,
  },
  list: {
    marginTop: spacing.xl - 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    borderStyle: 'dashed',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowLabel: {
    fontFamily: fontFamily.bodyRegular,
    fontSize: 13,
    color: colors.text,
  },
  rowValue: {
    fontFamily: fontFamily.monoRegular,
    fontSize: 11.5,
    color: colors.textDim,
  },
  logoutButton: {
    marginTop: spacing.xxl - 4,
  },
});
