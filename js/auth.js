// Autenticação fake: valida contra USUARIOS e salva sessão no localStorage.
// FRAGILIDADE PROPOSITAL (v1): aceita qualquer email mal formatado, sem feedback claro de erro.

const SESSION_KEY = 'sistema_faltas_sessao';

function fazerLogin(email, senha) {
  // FRAGILIDADE: sem trim, sem validação de formato de email, sem mensagem de erro específica
  const user = USUARIOS.find(u => u.email === email && u.senha === senha);
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'index.html';
}

function usuarioLogado() {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Protege uma página: se não houver login, manda pro index.
// Se requirePerfil for definido, exige aquele perfil.
function exigirLogin(requirePerfil) {
  const user = usuarioLogado();
  if (!user) {
    window.location.href = 'index.html';
    return null;
  }
  if (requirePerfil && user.perfil !== requirePerfil) {
    // Redireciona pra dashboard correto
    window.location.href = user.perfil === 'coordenador' ? 'coordenador.html' : 'professor.html';
    return null;
  }
  return user;
}

// Verifica se o professor logado tem acesso a uma disciplina
function professorTemAcesso(codigoDisciplina) {
  const user = usuarioLogado();
  if (!user) return false;
  if (user.perfil === 'coordenador') return true;
  return user.disciplinas && user.disciplinas.includes(codigoDisciplina);
}


// Leva o usuário para a tela inicial do modelo normal, sem voltar para o login.
function irParaTelaInicial() {
  const user = usuarioLogado();
  if (!user) {
    window.location.href = 'index.html';
    return;
  }
  window.location.href = user.perfil === 'coordenador' ? 'coordenador.html' : 'professor.html';
}

// No modelo normal, o título/logo do topo vira um atalho para a tela inicial.
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.top-bar .logo');
  if (!logo) return;
  logo.classList.add('logo-link');
  logo.setAttribute('role', 'button');
  logo.setAttribute('tabindex', '0');
  logo.setAttribute('title', 'Voltar para a tela inicial');
  logo.addEventListener('click', irParaTelaInicial);
  logo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      irParaTelaInicial();
    }
  });
});
