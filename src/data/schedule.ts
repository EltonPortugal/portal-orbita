import { colors } from '../constants/colors';
import { DayKey, WeekSchedule } from '../types';

export const dayOrder: DayKey[] = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

export const dayNames: Record<DayKey, string> = {
  SEG: 'Segunda',
  TER: 'Terça',
  QUA: 'Quarta',
  QUI: 'Quinta',
  SEX: 'Sexta',
  SÁB: 'Sábado',
};

export const schedule: WeekSchedule = {
  SEG: [
    { time: '19:00', subject: 'Inteligência Artificial', room: 'Sala 304 · Bloco C', professor: 'Prof. R. Nakamura', color: colors.cyan },
    { time: '21:00', subject: 'Banco de Dados II', room: 'Lab 05 · Bloco B', professor: 'Prof.ª L. Andrade', color: colors.violet },
  ],
  TER: [
    { time: '19:00', subject: 'Arquitetura de Software', room: 'Sala 210 · Bloco A', professor: 'Prof. F. Ramalho', color: colors.mint },
  ],
  QUA: [
    { time: '19:00', subject: 'Inteligência Artificial', room: 'Sala 304 · Bloco C', professor: 'Prof. R. Nakamura', color: colors.cyan },
    { time: '21:00', subject: 'Cálculo Numérico', room: 'Sala 108 · Bloco A', professor: 'Prof. E. Villas', color: colors.amber },
  ],
  QUI: [
    { time: '19:00', subject: 'Engenharia de Requisitos', room: 'Sala 212 · Bloco A', professor: 'Prof.ª C. Bezerra', color: colors.rose },
    { time: '21:00', subject: 'Banco de Dados II', room: 'Lab 05 · Bloco B', professor: 'Prof.ª L. Andrade', color: colors.violet },
  ],
  SEX: [
    { time: '19:00', subject: 'Arquitetura de Software', room: 'Sala 210 · Bloco A', professor: 'Prof. F. Ramalho', color: colors.mint },
  ],
  SÁB: [],
};

/** Próxima aula fixa exibida no card de destaque da Home. */
export const nextClass = {
  subject: 'Inteligência Artificial',
  room: 'Sala 304 · Bloco C · Prof. R. Nakamura',
  startsIn: 'em 47 min',
  time: '19:00',
};
