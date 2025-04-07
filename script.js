function toggleMenu() {
  const menu = document.querySelector(".menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

  // Alternar estado do menu
  menu.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", !isExpanded);

  // Prevenir scroll do corpo quando menu está aberto
  document.body.style.overflow = isExpanded ? "auto" : "hidden";
}

// Adicionar evento ao botão
document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);

// Fechar menu ao clicar em um link (opcional)
document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});
