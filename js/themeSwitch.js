// Botão de troca entre os dois modelos do sistema.
// Mantém a mesma página e preserva query string/hash (?codigo=..., ?matricula=...).
(function () {
  const PAGINAS = [
    'index.html',
    'coordenador.html',
    'professor.html',
    'disciplina.html',
    'aluno.html',
    'alertas.html'
  ];

  function paginaAtual() {
    const arquivo = window.location.pathname.split('/').pop();
    return arquivo || 'index.html';
  }

  function estaNoModoCaotico() {
    return /\/caotico(?:\/|$)/.test(window.location.pathname);
  }

  function montarDestino() {
    const pagina = paginaAtual();
    const caotico = estaNoModoCaotico();
    const relativo = caotico ? `../${pagina}` : `caotico/${pagina}`;
    const destino = new URL(relativo, window.location.href);
    destino.search = window.location.search;
    destino.hash = window.location.hash;
    return destino.href;
  }

  function criarBotao() {
    const pagina = paginaAtual();
    if (!PAGINAS.includes(pagina)) return;
    if (document.querySelector('.modelo-switch')) return;

    const caotico = estaNoModoCaotico();
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = `modelo-switch ${caotico ? 'modelo-switch-normal' : 'modelo-switch-caotico'}`;
    botao.setAttribute('aria-label', caotico ? 'Trocar para modelo normal' : 'Trocar para modelo caótico');
    botao.title = caotico ? 'Trocar para modelo normal' : 'Trocar para modelo caótico';
    botao.innerHTML = caotico
      ? '<span class="modelo-switch-icon">↩</span><span>Modo normal</span>'
      : '<span class="modelo-switch-icon">☢</span><span>Modo caótico</span>';

    botao.addEventListener('click', function () {
      localStorage.setItem('sistema_faltas_modelo', caotico ? 'normal' : 'caotico');
      window.location.href = montarDestino();
    });

    document.body.appendChild(botao);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', criarBotao);
  } else {
    criarBotao();
  }
})();
