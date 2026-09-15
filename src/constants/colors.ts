/**
 * Paleta de cores "retrô-clean" do Portal Órbita.
 * Espelha as variáveis definidas em `legacy/style.css` (bloco :root).
 */
export const colors = {
  void: '#F6F1E3',
  panel: '#FBF8EF',
  panel2: '#F1E8D2',
  panel3: '#E8DCBC',
  line: '#DECBA0',

  cyan: '#2F6F68',
  violet: '#A6543B',
  mint: '#5B7F3A',
  amber: '#C98A2E',
  rose: '#AF3B2E',

  text: '#2B2A22',
  textDim: '#6E6650',
  textFaint: '#A79A78',

  deviceFrameStart: '#3E3527',
  deviceFrameEnd: '#2C2519',

  white: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;
