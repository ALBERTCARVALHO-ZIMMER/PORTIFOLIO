// Modo escuro/claro com persistência no localStorage e troca de ícone do botão
const modoDarkBtn = document.getElementById("modo-dark");

modoDarkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem('modoEscuro', document.body.classList.contains("dark-mode"));
  updateModoDarkBtnIcon();
});

// Aplica modo salvo no carregamento
if (localStorage.getItem('modoEscuro') === 'true') {
  document.body.classList.add("dark-mode");
}
updateModoDarkBtnIcon();

function updateModoDarkBtnIcon() {
  modoDarkBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
}

// Scroll suave e destaque do menu ativo
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  navLinks.forEach(link => {
    const section = document.getElementById(link.getAttribute('href').slice(1));
    if (section && section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Modal de projetos
const modalButtons = document.querySelectorAll('.modal-btn');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-btn');

modalButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const modalId = e.target.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'flex';
      modal.querySelector('.close-btn').focus();
    }
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.modal').style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.style.display = 'none';
  }
});

// Fechar modal com tecla ESC
window.addEventListener('keydown', e => {
  if (e.key === "Escape") {
    modals.forEach(modal => {
      if (modal.style.display === 'flex') {
        modal.style.display = 'none';
      }
    });
  }
});

// Animação dos círculos de skills conforme o percentual CSS custom property --percent
function animateCircles() {
  const circles = document.querySelectorAll('.skill-circle .circle');
  circles.forEach(circle => {
    const parent = circle.closest('.skill-circle');
    const percentStr = parent.style.getPropertyValue('--percent').trim().replace('%','');
    const percent = Number(percentStr) || 0;
    const dashArray = (percent / 100) * 100;
    circle.style.strokeDasharray = `${dashArray}, 100`;
  });
}
window.addEventListener('DOMContentLoaded', animateCircles);
document.querySelectorAll('.certificado[target="_blank"]').forEach(link => {
  link.removeAttribute('target');
});


// Troca de cor primária/secundária via inputs color
const corPrimariaInput = document.getElementById('corPrimaria');
const corSecundariaInput = document.getElementById('corSecundaria');

if (corPrimariaInput) {
  corPrimariaInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--cor-primaria', e.target.value);
  });
}
if (corSecundariaInput) {
  corSecundariaInput.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--cor-secundaria', e.target.value);
  });
}

// Formulário de contato simulado com feedback
const formContato = document.getElementById('formContato');
if (formContato) {
  formContato.addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = this.querySelector('.form-feedback');
    feedback.textContent = "Mensagem enviada! Obrigado pelo contato 🙌";
    this.reset();
    setTimeout(() => feedback.textContent = "", 3500);
  });
}

// Inicializa AOS (Animate On Scroll)
if (window.AOS) {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 120
  });
}

