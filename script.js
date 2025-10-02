// === Scroll to top button ===
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// === Tabs logic ===
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Retire "active" de tous
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => {
      content.classList.remove("active", "fade-in");
    });

    // Ajoute "active" au bouton cliqué
    button.classList.add("active");

    // Affiche le contenu associé
    const tabId = button.dataset.tab;
    const targetContent = document.getElementById(tabId);
    targetContent.classList.add("active");

    // Animation d'apparition
    setTimeout(() => {
      targetContent.classList.add("fade-in");
    }, 50);
  });
});

// === Petite animation fade-in CSS ===
const style = document.createElement("style");
style.innerHTML = `
  .tab-content {
    opacity: 0;
    transition: opacity 0.4s ease-in-out;
  }
  .tab-content.active.fade-in {
    opacity: 1;
  }
`;
document.head.appendChild(style);
