// === Scroll to top button ===
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Tab fade-in CSS ===
const style = document.createElement("style");
style.innerHTML = `
.tab-content { opacity: 0; transition: opacity 0.4s ease-in-out; }
.tab-content.active.fade-in { opacity: 1; }
`;
document.head.appendChild(style);

// === Application des traductions ===
function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;

  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    const translation = dict[key];

    if (!translation) return;

    if (Array.isArray(translation)) {
      el.innerHTML = translation.map(item => `<li>${item}</li>`).join("");
    } else if (typeof translation === "string" && translation.includes("<")) {
      el.innerHTML = translation;
    } else {
      el.textContent = translation;
    }
  });

  // Témoignages dynamiques
  const testimonials = [
    { textKey: "testimonial_1_text", authorKey: "testimonial_1_author" },
    { textKey: "testimonial_2_text", authorKey: "testimonial_2_author" }
  ];
  testimonials.forEach((t, i) => {
    const testimonialEl = document.querySelectorAll(".testimonial")[i];
    if (testimonialEl) {
      testimonialEl.querySelector("p").textContent = dict[t.textKey] || "";
      testimonialEl.querySelector("span").textContent = dict[t.authorKey] || "";
    }
  });

  // Why choose us
  const whyCards = document.querySelectorAll(".why-card p");
  if (dict.why_cards) {
    whyCards.forEach((card, i) => {
      if (dict.why_cards[i]) card.textContent = dict.why_cards[i];
    });
  }
}

// === Sélecteur de langue ===
(function () {
  const selector = document.getElementById("language-selector");
  const btn = document.getElementById("lang-btn");
  const dropdown = document.getElementById("lang-dropdown");
  const currentFlag = document.getElementById("current-flag");

  const flagURLs = {
    fr: "https://flagcdn.com/fr.svg",
    en: "https://flagcdn.com/gb.svg",
    de: "https://flagcdn.com/de.svg",
    es: "https://flagcdn.com/es.svg",
    it: "https://flagcdn.com/it.svg",
  };

  let currentLang = localStorage.getItem("lang") || "fr";
  applyTranslations(currentLang);
  currentFlag.src = flagURLs[currentLang];
  currentFlag.alt = currentLang.toUpperCase();

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    selector.classList.toggle("open");
    const expanded = selector.classList.contains("open");
    btn.setAttribute("aria-expanded", expanded ? "true" : "false");
    dropdown.setAttribute("aria-hidden", expanded ? "false" : "true");
  });

  dropdown.querySelectorAll(".lang-option").forEach(opt => {
    opt.addEventListener("click", () => {
      const lang = opt.dataset.lang;
      localStorage.setItem("lang", lang);
      currentFlag.src = flagURLs[lang];
      currentFlag.alt = lang.toUpperCase();
      selector.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      dropdown.setAttribute("aria-hidden", "true");
      applyTranslations(lang);
    });
  });

  document.addEventListener("click", (e) => {
    if (!selector.contains(e.target)) {
      selector.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      dropdown.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      selector.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      dropdown.setAttribute("aria-hidden", "true");
    }
  });
})();

// === Gestion du formulaire ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form._gotcha.value) return false;

    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!email || !message) {
      status.textContent = "Merci de remplir tous les champs.";
      status.style.color = "red";
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status.textContent = "Merci ! Votre message a bien été envoyé.";
        status.style.color = "green";
        form.reset();
      } else {
        status.textContent = "Oups... une erreur s’est produite. Réessayez plus tard.";
        status.style.color = "red";
      }
    } catch {
      status.textContent = "Erreur de connexion. Merci de réessayer.";
      status.style.color = "red";
    }
  });

  // === Tabs logic avec ouverture par défaut ===
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  function openTab(tabName) {
    tabContents.forEach(content => content.classList.remove("active", "fade-in"));
    tabButtons.forEach(btn => btn.classList.remove("active"));

    const activeContent = document.getElementById(tabName);
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);

    if (activeContent && activeBtn) {
      activeContent.classList.add("active");
      activeBtn.classList.add("active");
      setTimeout(() => activeContent.classList.add("fade-in"), 50);
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => openTab(btn.dataset.tab));
  });

  // --- Bloc service ouvert par défaut ---
  openTab("secondary");
});
