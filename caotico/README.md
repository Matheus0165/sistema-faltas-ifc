# Sistema de Faltas — IFC

Plataforma web para monitoramento de faltas de alunos por gestores (coordenadores e professores) do curso de Ciência da Computação.

Trabalho desenvolvido para a disciplina de **Interação Humano-Computador (IHC)** — Aula 10, Trabalho 01.

## 🎯 Objetivo

Suprir limitações do SIGAA na visualização e monitoramento de faltas, oferecendo:

- Dashboard com visão geral por perfil (coordenador / professor)
- Alertas de alunos próximos do limite de 25% de faltas (reprovação por falta)
- Gráficos por turma e por aluno
- Filtro e busca avançada

## 🚀 Como rodar

A aplicação é 100% estática (HTML + CSS + JavaScript) e roda no GitHub Pages.

```
1. Clone o repositório
2. Sirva localmente:  python3 -m http.server 8000  (ou abrir index.html)
3. Acesse http://localhost:8000  OU  a URL do GitHub Pages
```

## 🔑 Contas demo

| Perfil | Email | Senha |
|--------|-------|-------|
| Coordenador | `coord@ifc.br` | `123` |
| Professor (João Silva) | `joao@ifc.br` | `123` |
| Professor (Maria Santos) | `maria@ifc.br` | `123` |
| Professor (Carlos Lima) | `carlos@ifc.br` | `123` |

## 🧪 Estratégia de Avaliação Heurística

A plataforma foi desenvolvida em duas versões aplicando as **8 Regras de Ouro de Shneiderman**:

- **v1 (versão atual)**: estética e interações **propositalmente caóticas** — Comic Sans, fundos
  variados em cada tela (parede de tijolo, listras de tigre, glitter, zebra, estrelas),
  banners "ATENÇÃO!!!" piscando, sidebar arco-íris, data inválida (32/13/2024 às 25:61:61),
  contador de visitas estilo Geocities, modal que abre sozinho, e por aí vai.
  O objetivo é dar **material abundante** para a avaliação heurística.
- **v2**: correções aplicadas após a avaliação, com estética sóbria e respeito às 8 regras.

### Fragilidades intencionais da v1 (mapeadas às regras de Shneiderman)

| # | Regra | Fragilidades implementadas |
|---|---|---|
| 1 | **Consistência** | Cada tela com fundo/tipografia diferente · Vermelho usado em status crítico, botão "Sair" e "ATENÇÃO" · Sidebar arco-íris com cada item de uma cor sem motivo · Botões com estilos variados |
| 2 | **Usabilidade universal** | Comic Sans em tudo (baixa legibilidade) · Contraste péssimo (texto escuro sobre fundos caóticos) · Sem tooltips, sem atalhos, sem foco visível adequado |
| 3 | **Feedback informativo** | Filtros não mostram quantos resultados foram encontrados · Mensagens de erro genéricas ("FALHA AO ENTRAR!!!") |
| 4 | **Diálogos com encerramento** | Login bem-sucedido redireciona sem mensagem de boas-vindas · Filtros aplicam sem confirmação |
| 5 | **Prevenção de erros** | Login aceita qualquer formato de email (sem `type=email`, sem validação) · Datas inválidas exibidas no sistema (32/13/2024 - 25:61:61) · Links "Esqueceu sua senha? Clique Aqui!!!" que não fazem nada |
| 6 | **Reversão fácil** | Sem botão "limpar filtros" em nenhuma tela · Sem breadcrumb pra voltar · Modal sem botão de fechar com X · "Esqueci a senha" é placebo |
| 7 | **Controle do usuário** | Filtros aplicam automaticamente no input/change · Modal de alertas abre sozinho ao logar · Animações de piscar/pulsar roubam atenção · "ATENÇÃO" piscando em todas as telas |
| 8 | **Reduzir carga de memória** | Sem breadcrumb · Cada tela com layout totalmente diferente (impossível prever) · Legenda do gráfico só aparece no hover · Caos visual sobrecarrega memória de trabalho |

## 📁 Estrutura

```
sistema-faltas/
├── index.html              # Login (tema: parede de tijolos)
├── coordenador.html        # Dashboard admin (tema: gradiente roxo)
├── professor.html          # Dashboard professor (tema: noite estrelada)
├── disciplina.html         # Detalhe da disciplina (tema: ciano)
├── aluno.html              # Detalhe do aluno (tema: listras de tigre)
├── alertas.html            # Dashboard "INSANO" (tema: noite cósmica)
├── css/
│   ├── base.css            # Variáveis caóticas, fundos por página
│   └── components.css      # Sidebar arco-íris, banners piscantes, cards
├── js/
│   ├── data.js             # 4 usuários, 7 disciplinas, 25 alunos, 98 registros
│   ├── auth.js             # Login fake (localStorage)
│   ├── utils.js            # Cálculos de % e classificação de status
│   ├── dashboard.js        # Lógica dos dashboards
│   ├── disciplina.js       # Detalhe da disciplina + gráfico
│   ├── aluno.js            # Detalhe do aluno + gráfico
│   └── alertas.js          # Painel de alertas
└── README.md
```

## 📊 Dados fictícios

- **25 alunos** de Ciência da Computação
- **7 disciplinas** (mesmas do print do SIGAA usado como inspiração)
- **98 registros** de matrícula/frequência
- Distribuição: ~50% OK · ~30% Atenção · ~20% Crítico

## 📝 Próximos passos

1. Testar a v1 e documentar com prints cada uma das fragilidades
2. Aplicar a avaliação heurística completa (8 regras × evidências)
3. Implementar a v2 com correções
4. Escrever o artigo SBC (até 5 páginas) com antes/depois
5. Enviar via SIGAA até 18/05/2026 às 23h59
