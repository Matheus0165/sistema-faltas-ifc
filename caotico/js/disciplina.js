// Lógica da tela de detalhe da disciplina

function inicializarDisciplina(user) {
  document.getElementById('nome-usuario').textContent = user.nome;

  // Helper: volta pra dashboard certa conforme perfil
  const voltarDashboard = () => {
    window.location.href = user.perfil === 'coordenador' ? 'coordenador.html' : 'professor.html';
  };

  const params = new URLSearchParams(window.location.search);
  let codigo = params.get('codigo');

  // Sem codigo → usa a primeira disciplina disponível pro perfil
  // (assim a página abre direto com gráficos quando acessada sem ?codigo=XXX)
  if (!codigo) {
    const disponiveis = user.perfil === 'coordenador'
      ? DISCIPLINAS
      : DISCIPLINAS.filter(d => user.disciplinas.includes(d.codigo));
    if (disponiveis.length === 0) { voltarDashboard(); return; }
    codigo = disponiveis[0].codigo;
  }

  const disc = buscarDisciplina(codigo);
  if (!disc) {
    voltarDashboard();
    return;
  }

  // Controle de acesso: professor só vê suas disciplinas
  if (!professorTemAcesso(codigo)) {
    voltarDashboard();
    return;
  }

  // Cabeçalho
  document.getElementById('titulo-disciplina').textContent = disc.nome;
  document.getElementById('subtitulo-disciplina').textContent =
    `${disc.codigo} · Prof. ${disc.professor} · ${disc.aulas_dadas} de ${disc.total_aulas} aulas dadas`;

  // Estatísticas
  const stats = estatisticasDisciplina(codigo);
  renderizarCards([
    { valor: stats.total_matriculados, label: 'Matriculados' },
    { valor: formatarPercentual(stats.media_percentual), label: 'Média de falta', classe: stats.media_percentual > 15 ? 'alerta' : '' },
    { valor: stats.atencao, label: 'Em atenção', classe: 'alerta' },
    { valor: stats.criticos, label: 'Críticos', classe: 'critico' }
  ]);

  // Gráfico de distribuição
  desenharGraficoDistribuicao(codigo);

  // Filtros automáticos
  // FRAGILIDADE 7 (Controle): aplicação automática nos filtros
  document.getElementById('filtro-aluno').addEventListener('input', () => renderizarTabela(codigo));
  document.getElementById('filtro-status').addEventListener('change', () => renderizarTabela(codigo));

  renderizarTabela(codigo);
}

function desenharGraficoDistribuicao(codigo) {
  const buckets = distribuicaoFaltas(codigo);
  const ctx = document.getElementById('grafico-distribuicao').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(buckets),
      datasets: [{
        label: 'Alunos',
        data: Object.values(buckets),
        backgroundColor: [
          '#00ff00', '#00ff00', '#00ff00',
          '#ffff00', '#ffff00',
          '#ff0000'
        ],
        borderColor: '#000',
        borderWidth: 3,
        borderRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
          title: { display: true, text: 'Nº de alunos' }
        },
        x: {
          title: { display: true, text: 'Faixa de faltas (%)' }
        }
      }
    }
  });
}

function renderizarTabela(codigo) {
  const tbody = document.getElementById('tbody-alunos');
  tbody.innerHTML = '';

  const busca = document.getElementById('filtro-aluno').value.toLowerCase().trim();
  const statusFiltro = document.getElementById('filtro-status').value;

  let freqs = frequenciasDaDisciplina(codigo);

  if (busca) {
    freqs = freqs.filter(f =>
      f.nome.toLowerCase().includes(busca) ||
      f.matricula.toLowerCase().includes(busca)
    );
  }
  if (statusFiltro) {
    freqs = freqs.filter(f => f.status === statusFiltro);
  }

  // Ordena por % decrescente (críticos primeiro)
  freqs.sort((a, b) => b.percentual - a.percentual);

  if (freqs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="tabela-vazia">Nenhum aluno encontrado.</td></tr>';
    return;
  }

  freqs.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code style="font-family:'JetBrains Mono',monospace;font-size:12px;">${f.matricula}</code></td>
      <td>${f.nome}</td>
      <td>${f.faltas}</td>
      <td>${formatarPercentual(f.percentual)}</td>
      <td><span class="badge badge-${f.status}">${nomeStatus(f.status)}</span></td>
      <td><a href="aluno.html?matricula=${f.matricula}">Ver histórico</a></td>
    `;
    tbody.appendChild(tr);
  });
}

function nomeStatus(s) {
  if (s === 'critico') return 'Crítico';
  if (s === 'atencao') return 'Atenção';
  return 'OK';
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
