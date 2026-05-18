# Sistema de Faltas — IFC

Plataforma web para monitoramento de faltas de alunos por gestores (coordenadores e professores) do curso de Ciência da Computação.

Trabalho desenvolvido para a disciplina de **Interação Humano-Dispositivo (IHD)**.

## 🎯 Objetivo

Suprir limitações do SIGAA na visualização e monitoramento de faltas, oferecendo:

- Dashboard com visão geral por perfil (coordenador / professor)
- Alertas de alunos próximos do limite de 25% de faltas (reprovação por falta)
- Gráficos por turma e por aluno
- Filtro e busca avançada


## 🔑 Contas demo

| Perfil | Email | Senha |
|--------|-------|-------|
| Coordenador | `coord@ifc.br` | `123` |
| Professor (João Silva) | `joao@ifc.br` | `123` |
| Professor (Maria Santos) | `maria@ifc.br` | `123` |
| Professor (Carlos Lima) | `carlos@ifc.br` | `123` |

## 🧪 Avaliação heurística

A plataforma foi desenvolvida em duas versões com avaliação heurística aplicando as **8 Regras de Ouro de Shneiderman**:

- **v1** (versão atual): contém fragilidades propositais para servir de base à avaliação
- **v2**: correções aplicadas após a avaliação

### Fragilidades propositais da v1 (uma por regra de Shneiderman)

| # | Regra | Fragilidade |
|---|---|---|
| 1 | Consistência | Vermelho usado em status "crítico" E em botão "Sair" |
| 2 | Usabilidade universal | Texto secundário com contraste fraco, sem tooltips, sem atalhos |
| 3 | Feedback informativo | Filtros não mostram quantos resultados foram encontrados |
| 4 | Diálogos com encerramento | Login bem-sucedido sem mensagem de boas-vindas |
| 5 | Prevenção de erros | Login aceita qualquer formato de email, sem validação |
| 6 | Reversão fácil | Sem botão "limpar filtros" e sem breadcrumb pra voltar |
| 7 | Controle do usuário | Filtros aplicam automaticamente, modal abre sozinho ao logar |
| 8 | Reduzir carga de memória | Sem breadcrumb, legenda do gráfico só aparece no hover |

## 📁 Estrutura

```
sistema-faltas/
├── index.html              # Login
├── coordenador.html        # Dashboard do coordenador
├── professor.html          # Dashboard do professor
├── disciplina.html         # Detalhe da disciplina
├── aluno.html              # Detalhe do aluno
├── alertas.html            # Painel de alertas
├── css/
│   ├── base.css            # Reset, variáveis, tipografia
│   └── components.css      # Cards, botões, tabelas, badges
├── js/
│   ├── data.js             # Dados fictícios
│   ├── auth.js             # Login fake (localStorage)
│   ├── utils.js            # Cálculos de % e status
│   ├── dashboard.js        # Lógica dos dashboards
│   ├── disciplina.js       # Lógica da tela de disciplina
│   ├── aluno.js            # Lógica da tela de aluno
│   └── alertas.js          # Lógica da tela de alertas
└── README.md
```

## 📊 Dados fictícios

- **25 alunos** de Ciência da Computação
- **7 disciplinas** (mesmas do print do SIGAA usado como inspiração)
- **~80 registros** de matrícula/frequência
- Distribuição planejada: ~15% críticos, ~25% em atenção, ~60% OK

## 🔁 Versão mesclada: Normal + Caótico

Esta versão junta os dois modelos no mesmo projeto:

- As páginas da raiz são o **modelo normal**.
- As páginas dentro da pasta `caotico/` são o **modelo caótico**.
- Um botão flutuante aparece em todas as telas para trocar entre os modelos.
- A troca mantém a mesma tela aberta e preserva parâmetros da URL, por exemplo:
  - `disciplina.html?codigo=ALG001` vira `caotico/disciplina.html?codigo=ALG001`
  - `aluno.html?matricula=2024001` vira `caotico/aluno.html?matricula=2024001`

### Como testar a troca

1. Abra `index.html`.
2. Faça login com uma conta demo.
3. Clique no botão **Modo caótico** no canto inferior direito.
4. Para voltar, clique no botão **Modo normal**.

### Nova estrutura da mescla

```text
sistema-faltas/
├── index.html              # Login normal
├── coordenador.html        # Painel normal
├── professor.html          # Painel normal
├── disciplina.html         # Disciplina normal
├── aluno.html              # Aluno normal
├── alertas.html            # Alertas normal
├── css/
├── js/
│   └── themeSwitch.js      # Troca entre normal e caótico
├── caotico/
│   ├── index.html          # Login caótico
│   ├── coordenador.html    # Painel caótico
│   ├── professor.html      # Painel caótico
│   ├── disciplina.html     # Disciplina caótica
│   ├── aluno.html          # Aluno caótico
│   ├── alertas.html        # Alertas caótico
│   ├── css/
│   └── js/
│       └── themeSwitch.js  # Troca entre caótico e normal
└── README.md
```

