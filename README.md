# Portal Órbita — Protótipo Mobile

Protótipo de portal acadêmico com estética retrô-clean (cores claras, sombras leves).

## Estrutura de arquivos

```
portal-academico/
├── index.html   → estrutura das telas (HTML)
├── style.css    → toda a estilização e tema visual (CSS)
├── script.js    → navegação, dados e interatividade (JavaScript)
└── README.md    → este arquivo
```

## Como usar

Abra `index.html` diretamente no navegador. Os três arquivos precisam
ficar **na mesma pasta**, pois o HTML referencia o CSS e o JS por
caminho relativo (`style.css` e `script.js`).

## Organização interna

- **style.css** está dividido em 15 seções comentadas (variáveis,
  moldura do dispositivo, componentes globais, e uma seção por tela:
  login, início, horário, notas, disciplinas, mais, financeiro,
  biblioteca, avisos, perfil, navegação inferior).
- **script.js** está dividido em 6 seções comentadas (navegação entre
  telas, relógio/saudação, efeito do cartão de identificação, e os
  dados + renderização de horário, notas e disciplinas).
- **index.html** contém apenas a marcação das telas, sem nenhum CSS
  ou JS embutido — os `<link>` e `<script>` apontam para os arquivos
  externos no topo/rodapé do documento.

## Personalização rápida

- Cores e fontes: edite as variáveis no topo de `style.css` (bloco `:root`).
- Dados mockados (aluno, notas, horário, disciplinas): edite os arrays
  no início de cada seção de `script.js`.