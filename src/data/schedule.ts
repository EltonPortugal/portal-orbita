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
    { time: '19:00', subject: 'Inteligência Artificial', room: 'Sala 304 · Bloco C', professor: 'Prof. R. Nakamura', accent: 'cyan' },
    { time: '21:00', subject: 'Banco de Dados II', room: 'Lab 05 · Bloco B', professor: 'Prof.ª L. Andrade', accent: 'violet' },
  ],
  TER: [
    { time: '19:00', subject: 'Arquitetura de Software', room: 'Sala 210 · Bloco A', professor: 'Prof. F. Ramalho', accent: 'mint' },
  ],
  QUA: [
    { time: '19:00', subject: 'Inteligência Artificial', room: 'Sala 304 · Bloco C', professor: 'Prof. R. Nakamura', accent: 'cyan' },
    { time: '21:00', subject: 'Cálculo Numérico', room: 'Sala 108 · Bloco A', professor: 'Prof. E. Villas', accent: 'amber' },
  ],
  QUI: [
    { time: '19:00', subject: 'Engenharia de Requisitos', room: 'Sala 212 · Bloco A', professor: 'Prof.ª C. Bezerra', accent: 'rose' },
    { time: '21:00', subject: 'Banco de Dados II', room: 'Lab 05 · Bloco B', professor: 'Prof.ª L. Andrade', accent: 'violet' },
  ],
  SEX: [
    { time: '19:00', subject: 'Arquitetura de Software', room: 'Sala 210 · Bloco A', professor: 'Prof. F. Ramalho', accent: 'mint' },
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
