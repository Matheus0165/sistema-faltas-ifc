// Lógica da tela de alertas

function inicializarAlertas(user) {
  document.getElementById('nome-usuario').textContent = user.nome;

  // Ajusta link "Visão geral" conforme perfil
  const link = document.getElementById('link-voltar');
  link.href = user.perfil === 'coordenador' ? 'coordenador.html' : 'professor.html';

  let registros = alunosEmRisco();

  // Professor só vê alertas das suas disciplinas
  if (user.perfil === 'professor') {
    registros = registros.filter(r => user.disciplinas.includes(r.disciplina));
  }

  // Estatísticas
  const criticos = registros.filter(r => r.status === 'critico').length;
  const atencao = registros.filter(r => r.status === 'atencao').length;
  const alunosUnicos = new Set(registros.map(r => r.matricula)).size;

  renderizarCards([
    { valor: alunosUnicos, label: 'Alunos em risco' },
    { valor: criticos, label: 'Situações críticas (≥25%)', classe: 'critico' },
    { valor: atencao, label: 'Em atenção (15-25%)', classe: 'alerta' }
  ]);

  // FRAGILIDADE 7 (Controle): filtros aplicam automaticamente
  document.getElementById('filtro-nivel').addEventListener('change', () => renderizarTabela(registros));
  document.getElementById('filtro-busca-aluno').addEventListener('input', () => renderizarTabela(registros));

  renderizarTabela(registros);
}

function renderizarTabela(registros) {
  const tbody = document.getElementById('tbody-alertas');
  tbody.innerHTML = '';

  const nivel = document.getElementById('filtro-nivel').value;
  const busca = document.getElementById('filtro-busca-aluno').value.toLowerCase().trim();

  let filtrados = registros;
  if (nivel) filtrados = filtrados.filter(r => r.status === nivel);
  if (busca) {
    filtrados = filtrados.filter(r =>
      r.nome.toLowerCase().includes(busca) ||
      r.matricula.toLowerCase().includes(busca)
    );
  }

  if (filtrados.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="tabela-vazia">Nenhum aluno em risco.</td></tr>';
    return;
  }

  filtrados.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.nome}</td>
      <td><code style="font-family:'JetBrains Mono',monospace;font-size:12px;">${r.matricula}</code></td>
      <td>
        <a href="disciplina.html?codigo=${r.disciplina}">
          ${r.disciplina}
        </a>
        <div style="font-size:11px;color:var(--cor-texto-secundario);">${r.nome_disciplina}</div>
      </td>
      <td>${r.faltas} / ${r.total_aulas}</td>
      <td>${formatarPercentual(r.percentual)}</td>
      <td><span class="badge badge-${r.status}">${r.status === 'critico' ? 'Crítico' : 'Atenção'}</span></td>
      <td><a href="aluno.html?matricula=${r.matricula}">Ver aluno</a></td>
    `;
    tbody.appendChild(tr);
  });
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
