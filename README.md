# Portal Órbita — App Mobile (Expo + React Native)

Aplicativo do portal acadêmico do Instituto Órbita, construído com Expo,
React Native e TypeScript. É a evolução do protótipo estático em HTML/CSS/JS
mantido em [`docs/legacy/`](docs/legacy) para referência visual.

## Como rodar

```bash
npm install
npm start        # abre o Expo Dev Tools
npm run android   # abre no emulador/dispositivo Android
npm run ios       # abre no simulador iOS (requer macOS)
npm run web       # abre no navegador
```

## Estrutura do projeto

```
portal-orbita/
├── App.tsx              → Compositor raiz: carrega fontes e monta os
│                          providers de tema/navegação/área segura. Não contém
│                          nenhuma tela nem regra de negócio.
├── index.ts              → Ponto de entrada padrão do Expo (registra App.tsx)
├── app.json               → Configuração do app Expo (nome, ícones, plugins)
├── src/
│   ├── constants/         → Tipografia (Google Fonts) e tokens de
│   │                        espaçamento/raio.
│   ├── theme/              → Paletas clara/escura, provider do modo noturno
│   │                        e o hook `useThemedStyles`.
│   ├── data/               → Dados mockados (aluno, horário, notas,
│   │                        disciplinas, avisos, financeiro, biblioteca, FAQ).
│   ├── types/              → Tipos TypeScript compartilhados dos dados acima.
│   ├── visual/              → Design system: componentes visuais reutilizáveis
│   │                        (Card, Chip, Tag, Button, IdCard, GpaRing, etc.).
│   ├── hooks/               → Hooks compartilhados (`useClock`, `useNextClass`).
│   ├── navigation/          → `RootNavigator` (stack) e `MainTabs` (abas),
│   │                        com os tipos de rotas (`types.ts`).
│   └── screens/             → Uma tela por arquivo, compondo os componentes
│                            de `visual/` com os dados de `data/`.
├── assets/                → Ícones e splash screen do app.
└── docs/legacy/           → Protótipo estático original (HTML/CSS/JS),
                             mantido apenas como referência de design.
```

## Navegação

- **Login** → tela inicial, autentica e leva para as abas principais.
- **Abas principais** (`MainTabs`): Início, Horário, Notas, Disciplinas, Mais.
- **Telas secundárias** (empilhadas sobre as abas, com botão voltar):
  Financeiro, Biblioteca, Mural de avisos, Suporte e Perfil.

## Personalização rápida

- Cores, fontes e espaçamentos: `src/constants/`.
- Dados mockados (aluno, notas, horário, disciplinas, avisos...): `src/data/`.
- Componentes visuais (aparência): `src/visual/`.
