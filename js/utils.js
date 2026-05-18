// Funções utilitárias compartilhadas

// Limite de reprovação por falta (LDB): 25% das aulas totais
const LIMITE_REPROVACAO = 0.25;
const LIMITE_ATENCAO = 0.15;

// Retorna % atual de falta do aluno na disciplina.
// Usa aulas_dadas (e não total_aulas) para indicar o RITMO atual:
// se a taxa atual >= 25%, o aluno está no caminho da reprovação por falta.
function percentualFalta(faltas, aulasDadas) {
  if (!aulasDadas) return 0;
  return (faltas / aulasDadas) * 100;
}

// Classifica status com base no % atual de falta (sobre aulas dadas)
// "critico" = >= 25%  | "atencao" = 15-25%  | "ok" = < 15%
function classificarStatus(faltas, aulasDadas) {
  const pct = percentualFalta(faltas, aulasDadas);
  if (pct >= 25) return 'critico';
  if (pct >= 15) return 'atencao';
  return 'ok';
}

// Busca uma disciplina pelo código
function buscarDisciplina(codigo) {
  return DISCIPLINAS.find(d => d.codigo === codigo);
}

// Busca um aluno pela matrícula
function buscarAluno(matricula) {
  return ALUNOS.find(a => a.matricula === matricula);
}

// Retorna todas as frequências de uma disciplina, com dados do aluno enriquecidos
function frequenciasDaDisciplina(codigoDisciplina) {
  return FREQUENCIA
    .filter(f => f.disciplina === codigoDisciplina)
    .map(f => {
      const aluno = buscarAluno(f.matricula);
      const disc = buscarDisciplina(f.disciplina);
      return {
        ...f,
        nome: aluno ? aluno.nome : '???',
        curso: aluno ? aluno.curso : '',
        percentual: percentualFalta(f.faltas, disc.total_aulas),
        status: classificarStatus(f.faltas, disc.total_aulas)
      };
    });
}

// Retorna todas as frequências de um aluno em todas as disciplinas
function frequenciasDoAluno(matricula) {
  return FREQUENCIA
    .filter(f => f.matricula === matricula)
    .map(f => {
      const disc = buscarDisciplina(f.disciplina);
      return {
        ...f,
        nome_disciplina: disc.nome,
        total_aulas: disc.total_aulas,
        aulas_dadas: disc.aulas_dadas,
        professor: disc.professor,
        percentual: percentualFalta(f.faltas, disc.total_aulas),
        status: classificarStatus(f.faltas, disc.total_aulas)
      };
    });
}

// Lista alunos em risco (atenção + crítico) ordenado por gravidade
function alunosEmRisco(disciplinasFiltro) {
  let registros = FREQUENCIA;
  if (disciplinasFiltro && disciplinasFiltro.length > 0) {
    registros = registros.filter(f => disciplinasFiltro.includes(f.disciplina));
  }
  return registros
    .map(f => {
      const aluno = buscarAluno(f.matricula);
      const disc = buscarDisciplina(f.disciplina);
      return {
        ...f,
        nome: aluno ? aluno.nome : '???',
        nome_disciplina: disc.nome,
        total_aulas: disc.total_aulas,
        percentual: percentualFalta(f.faltas, disc.total_aulas),
        status: classificarStatus(f.faltas, disc.total_aulas)
      };
    })
    .filter(r => r.status !== 'ok')
    .sort((a, b) => b.percentual - a.percentual);
}

// Calcula estatísticas agregadas de uma disciplina
function estatisticasDisciplina(codigo) {
  const freqs = frequenciasDaDisciplina(codigo);
  const total = freqs.length;
  const criticos = freqs.filter(f => f.status === 'critico').length;
  const atencao = freqs.filter(f => f.status === 'atencao').length;
  const ok = freqs.filter(f => f.status === 'ok').length;
  const mediaFaltas = total > 0
    ? freqs.reduce((s, f) => s + f.faltas, 0) / total
    : 0;
  const disc = buscarDisciplina(codigo);
  return {
    total_matriculados: total,
    criticos,
    atencao,
    ok,
    media_faltas: mediaFaltas,
    media_percentual: disc ? (mediaFaltas / disc.total_aulas) * 100 : 0
  };
}

// Gera distribuição de faltas para gráfico (buckets de 5%)
function distribuicaoFaltas(codigoDisciplina) {
  const freqs = frequenciasDaDisciplina(codigoDisciplina);
  const buckets = { '0-5%': 0, '5-10%': 0, '10-15%': 0, '15-20%': 0, '20-25%': 0, '>25%': 0 };
  freqs.forEach(f => {
    const p = f.percentual;
    if (p < 5) buckets['0-5%']++;
    else if (p < 10) buckets['5-10%']++;
    else if (p < 15) buckets['10-15%']++;
    else if (p < 20) buckets['15-20%']++;
    else if (p < 25) buckets['20-25%']++;
    else buckets['>25%']++;
  });
  return buckets;
}

// Formata percentual para exibição
function formatarPercentual(p) {
  return p.toFixed(1).replace('.', ',') + '%';
}
