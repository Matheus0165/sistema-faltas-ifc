// Lógica da tela de detalhe do aluno

function inicializarAluno(user) {
  document.getElementById('nome-usuario').textContent = user.nome;

  // Helper: volta pra dashboard certa conforme perfil
  const voltarDashboard = () => {
    window.location.href = user.perfil === 'coordenador' ? 'coordenador.html' : 'professor.html';
  };

  const params = new URLSearchParams(window.location.search);
  let matricula = params.get('matricula');

  // Sem matrícula → usa o primeiro aluno disponível pro perfil
  // (assim a página abre direto com gráficos quando acessada sem ?matricula=XXX)
  if (!matricula) {
    if (user.perfil === 'coordenador') {
      matricula = ALUNOS[0].matricula;
    } else {
      // Professor: primeiro aluno que cursa alguma disciplina dele
      const aluno = ALUNOS.find(a =>
        FREQUENCIA.some(f => f.matricula === a.matricula && user.disciplinas.includes(f.disciplina))
      );
      if (!aluno) { voltarDashboard(); return; }
      matricula = aluno.matricula;
    }
  }

  const aluno = buscarAluno(matricula);
  if (!aluno) {
    voltarDashboard();
    return;
  }

  let freqs = frequenciasDoAluno(matricula);

  // Se for professor, só mostra as disciplinas dele
  if (user.perfil === 'professor') {
    freqs = freqs.filter(f => user.disciplinas.includes(f.disciplina));
    if (freqs.length === 0) {
      voltarDashboard();
      return;
    }
  }

  // Cabeçalho
  document.getElementById('titulo-aluno').textContent = aluno.nome;
  document.getElementById('subtitulo-aluno').textContent =
    `Matrícula ${aluno.matricula} · ${aluno.curso}`;

  // Estatísticas
  const totalDisc = freqs.length;
  const criticos = freqs.filter(f => f.status === 'critico').length;
  const atencao = freqs.filter(f => f.status === 'atencao').length;
  const totalFaltas = freqs.reduce((s, f) => s + f.faltas, 0);

  renderizarCards([
    { valor: totalDisc, label: 'Disciplinas cursadas' },
    { valor: totalFaltas, label: 'Total de faltas' },
    { valor: atencao, label: 'Em atenção', classe: 'alerta' },
    { valor: criticos, label: 'Críticas', classe: 'critico' }
  ]);

  // Gráfico
  desenharGrafico(freqs);

  // Tabela
  renderizarTabela(freqs);
}

function desenharGrafico(freqs) {
  const ctx = document.getElementById('grafico-aluno').getContext('2d');
  const labels = freqs.map(f => f.disciplina);
  const dados = freqs.map(f => f.percentual);
  const cores = freqs.map(f =>
    f.status === 'critico' ? '#ff0000' :
    f.status === 'atencao' ? '#ffff00' : '#00ff00'
  );

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '% de faltas',
        data: dados,
        backgroundColor: cores,
        borderColor: '#000',
        borderWidth: 3,
        borderRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          max: 30,
          title: { display: true, text: '% de faltas' },
          ticks: { callback: v => v + '%' }
        }
      }
    }
  });
}

function renderizarTabela(freqs) {
  const tbody = document.getElementById('tbody-disciplinas');
  tbody.innerHTML = '';

  // Ordena por % decrescente
  freqs.sort((a, b) => b.percentual - a.percentual);

  freqs.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code style="font-family:'JetBrains Mono',monospace;font-size:12px;">${f.disciplina}</code></td>
      <td><a href="disciplina.html?codigo=${f.disciplina}">${f.nome_disciplina}</a></td>
      <td>${f.professor}</td>
      <td>${f.faltas} / ${f.total_aulas}</td>
      <td>${formatarPercentual(f.percentual)}</td>
      <td><span class="badge badge-${f.status}">${nomeStatus(f.status)}</span></td>
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
