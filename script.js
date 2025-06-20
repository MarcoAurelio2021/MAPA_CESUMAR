
// alert('Seja bem vindo!');

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.menu-navigation a');
  const sections = document.querySelectorAll('main section');

  // Remove todas as classes active dos links e títulos
  function removeActiveClasses() {
    links.forEach(link => link.classList.remove('active'));
    sections.forEach(section => {
      const h2 = section.querySelector('h2');
      if (h2) h2.classList.remove('active');
    });
  }

  const carrossel = document.querySelector('#projetos .carrossel');

carrossel.addEventListener('wheel', function(e) {
  e.preventDefault(); // evita scroll vertical da página
  carrossel.scrollLeft += e.deltaY; // transforma movimento vertical em horizontal
});

  // Ativa o link e título da seção
  function setActive(link) {
    link.classList.add('active');
    const href = link.getAttribute('href'); // Exemplo: "#sobre"
    const section = document.querySelector(href);
    if (section) {
      const h2 = section.querySelector('h2');
      if (h2) h2.classList.add('active');
    }
  }

  // Ativa o menu e título correspondente à seção visível na tela
  function activateOnScroll() {
    let index = sections.length - 1;

    for (let i = 0; i < sections.length; i++) {
      const sectionTop = sections[i].getBoundingClientRect().top;
      if (sectionTop > 300) { // 100px do topo
        index = i - 1;
        break;
      }
    }

    if (index < 0) index = 0;

    removeActiveClasses();
    setActive(links[index]);
  }

  // Evento de clique nos links do menu
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      removeActiveClasses();
      setActive(e.currentTarget);

      const href = e.currentTarget.getAttribute('href');
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Detecta a seção ativa ao rolar a página
  window.addEventListener('scroll', activateOnScroll);

  // Inicializa o primeiro link ativo ao carregar a página
  setActive(links[0]);
});
