// Lógica compartilhada dos dashboards

function inicializarDashboardCoordenador(user) {
  document.getElementById('nome-usuario').textContent = user.nome;

  // Calcula estatísticas globais
  const totalAlunos = ALUNOS.length;
  const totalDisciplinas = DISCIPLINAS.length;
  const todasFreqs = FREQUENCIA.map(f => ({
    ...f,
    status: classificarStatus(f.faltas, buscarDisciplina(f.disciplina).total_aulas)
  }));
  const criticos = todasFreqs.filter(f => f.status === 'critico').length;
  const atencao = todasFreqs.filter(f => f.status === 'atencao').length;

  renderizarCards([
    { valor: totalDisciplinas, label: 'Disciplinas' },
    { valor: totalAlunos, label: 'Alunos matriculados' },
    { valor: atencao, label: 'Em atenção (15-25%)', classe: 'alerta' },
    { valor: criticos, label: 'Críticos (>25%)', classe: 'critico' }
  ]);

  // FRAGILIDADE 7 (Controle): modal abre sozinho assim que carrega
  if (criticos > 0) {
    document.getElementById('modal-count').textContent = criticos;
    setTimeout(() => {
      document.getElementById('modal-boas-vindas').classList.add('aberto');
    }, 400);
  }

  // Preenche dropdown de professores
  const profs = [...new Set(DISCIPLINAS.map(d => d.professor))];
  const selectProf = document.getElementById('filtro-professor');
  profs.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    selectProf.appendChild(opt);
  });

  // FRAGILIDADE 7 (Controle): filtros aplicam automaticamente sem botão "aplicar"
  document.getElementById('filtro-busca').addEventListener('input', () => renderizarDisciplinas(DISCIPLINAS));
  document.getElementById('filtro-professor').addEventListener('change', () => renderizarDisciplinas(DISCIPLINAS));

  renderizarDisciplinas(DISCIPLINAS);
}

function inicializarDashboardProfessor(user) {
  document.getElementById('nome-usuario').textContent = user.nome;

  const minhasDisciplinas = DISCIPLINAS.filter(d => user.disciplinas.includes(d.codigo));
  document.getElementById('subtitulo-prof').textContent =
    `${minhasDisciplinas.length} disciplinas · 2026.1`;

  // Estatísticas só das suas disciplinas
  const minhasFreqs = FREQUENCIA
    .filter(f => user.disciplinas.includes(f.disciplina))
    .map(f => ({
      ...f,
      status: classificarStatus(f.faltas, buscarDisciplina(f.disciplina).total_aulas)
    }));
  const totalAlunos = new Set(minhasFreqs.map(f => f.matricula)).size;
  const criticos = minhasFreqs.filter(f => f.status === 'critico').length;
  const atencao = minhasFreqs.filter(f => f.status === 'atencao').length;

  renderizarCards([
    { valor: minhasDisciplinas.length, label: 'Suas disciplinas' },
    { valor: totalAlunos, label: 'Alunos matriculados' },
    { valor: atencao, label: 'Em atenção (15-25%)', classe: 'alerta' },
    { valor: criticos, label: 'Críticos (>25%)', classe: 'critico' }
  ]);

  document.getElementById('filtro-busca').addEventListener('input', () => renderizarDisciplinas(minhasDisciplinas));
  renderizarDisciplinas(minhasDisciplinas);
}

function renderizarCards(cards) {
  const cont = document.getElementById('cards-stats');
  cont.innerHTML = '';
  cards.forEach(c => {
    const div = document.createElement('div');
    div.className = 'card stat-card ' + (c.classe || '');
    div.innerHTML = `<div class="valor">${c.valor}</div><div class="label">${c.label}</div>`;
    cont.appendChild(div);
  });
}

function renderizarDisciplinas(base) {
  const lista = document.getElementById('lista-disciplinas');
  lista.innerHTML = '';

  const busca = (document.getElementById('filtro-busca').value || '').toLowerCase().trim();
  const profSelect = document.getElementById('filtro-professor');
  const profFiltro = profSelect ? profSelect.value : '';

  let filtradas = base;
  if (busca) {
    filtradas = filtradas.filter(d =>
      d.nome.toLowerCase().includes(busca) ||
      d.codigo.toLowerCase().includes(busca)
    );
  }
  if (profFiltro) {
    filtradas = filtradas.filter(d => d.professor === profFiltro);
  }

  // FRAGILIDADE 3 (Feedback): aqui poderíamos mostrar "X de Y disciplinas" — mas não mostramos
  if (filtradas.length === 0) {
    lista.innerHTML = '<div class="tabela-vazia">Nenhuma disciplina encontrada.</div>';
    return;
  }

  filtradas.forEach(d => {
    const stats = estatisticasDisciplina(d.codigo);
    const card = document.createElement('a');
    card.className = 'disciplina-card';
    card.href = `disciplina.html?codigo=${d.codigo}`;
    card.innerHTML = `
      <div class="codigo">${d.codigo}</div>
      <div class="nome">${d.nome}</div>
      <div class="professor">Prof. ${d.professor}</div>
      <div class="indicadores">
        <div class="indicador ok"><span class="num">${stats.ok}</span><span>OK</span></div>
        <div class="indicador atencao"><span class="num">${stats.atencao}</span><span>Atenção</span></div>
        <div class="indicador critico"><span class="num">${stats.criticos}</span><span>Crítico</span></div>
      </div>
    `;
    lista.appendChild(card);
  });
}

function fecharModal() {
  document.getElementById('modal-boas-vindas').classList.remove('aberto');
}
