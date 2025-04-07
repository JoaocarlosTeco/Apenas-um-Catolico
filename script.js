function toggleMenu() {
  const menu = document.querySelector(".menu");
  const menuToggle = document.querySelector(".menu-toggle");
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

  menu.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", !isExpanded);

  // Desativa scroll do body apenas no mobile
  if (window.innerWidth <= 768) {
    document.body.style.overflow = isExpanded ? "auto" : "hidden";
  }
}

// Evento do botão para abrir/fechar menu no mobile
document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);

// Fecha o menu ao clicar em um link no mobile
document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});

// Garante que o menu sempre fique visível no desktop ao redimensionar
window.addEventListener("resize", () => {
  const menu = document.querySelector(".menu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (window.innerWidth > 768) {
    menu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "auto"; // Libera scroll no desktop
  }
});
