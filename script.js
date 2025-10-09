// === Scroll to top button ===
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Tabs logic ===
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active", "fade-in"));

    button.classList.add("active");
    const tabId = button.dataset.tab;
    const targetContent = document.getElementById(tabId);
    targetContent.classList.add("active");
    setTimeout(() => targetContent.classList.add("fade-in"), 50);
  });
});

// === Tab fade-in CSS ===
const style = document.createElement("style");
style.innerHTML = `
.tab-content { opacity: 0; transition: opacity 0.4s ease-in-out; }
.tab-content.active.fade-in { opacity: 1; }
`;
document.head.appendChild(style);

// === Gestion multilingue consolidée ===
const translations = {
  fr: {
    home_title: "Libérez votre potentiel en anglais",
    home_text: "Chez ACE Education, nous aidons élèves et professionnels à atteindre la réussite grâce à un accompagnement expert en anglais.",
    book_button: "Réserver un cours",
    about_title: "À propos",
    about_text1: "[Nom] est professeure d’anglais diplômée, avec plus de 10 ans d’expérience en France et au Royaume-Uni.",
    about_text2: "Elle accompagne enfants, adolescents et adultes pour améliorer leur anglais, préparer des examens et réussir à l’international.",
    contact_title: "Contact",
    contact_button: "Envoyer",
    // Ajout futur : why, tutoring, testimonials...
  },
  en: {
    home_title: "Unlock Your Potential in English",
    home_text: "At ACE Education, we help students and professionals achieve success through expert English tutoring.",
    book_button: "Book a Lesson",
    about_title: "About",
    about_text1: "[Name] is a qualified English teacher with over 10 years of experience in France and the UK.",
    about_text2: "She supports children, teens, and adults in improving their English, preparing for exams, and succeeding internationally.",
    contact_title: "Contact",
    contact_button: "Send"
  },
  de: {
    home_title: "Entfalte dein Potenzial in Englisch",
    home_text: "Bei ACE Education helfen wir Schülern und Berufstätigen, durch professionellen Englischunterricht erfolgreich zu werden.",
    book_button: "Kurs buchen",
    about_title: "Über uns",
    about_text1: "[Name] ist eine qualifizierte Englischlehrerin mit über 10 Jahren Erfahrung in Frankreich und Großbritannien.",
    about_text2: "Sie unterstützt Kinder, Jugendliche und Erwachsene dabei, ihr Englisch zu verbessern, Prüfungen zu bestehen und international erfolgreich zu sein.",
    contact_title: "Kontakt",
    contact_button: "Senden"
  },
  es: {
    home_title: "Desbloquea tu potencial en inglés",
    home_text: "En ACE Education ayudamos a estudiantes y profesionales a alcanzar el éxito académico mediante tutorías expertas en inglés.",
    book_button: "Reservar clase",
    about_title: "Sobre nosotros",
    about_text1: "[Nombre] es profesora de inglés titulada con más de 10 años de experiencia en Francia y el Reino Unido.",
    about_text2: "Ayuda a niños, adolescentes y adultos a mejorar su inglés, preparar exámenes y triunfar internacionalmente.",
    contact_title: "Contacto",
    contact_button: "Enviar"
  },
  it: {
    home_title: "Libera il tuo potenziale in inglese",
    home_text: "Da ACE Education aiutiamo studenti e professionisti a raggiungere il successo con lezioni di inglese di alto livello.",
    book_button: "Prenota una lezione",
    about_title: "Chi siamo",
    about_text1: "[Nome] è un'insegnante di inglese qualificata con oltre 10 anni di esperienza in Francia e nel Regno Unito.",
    about_text2: "Supporta bambini, adolescenti e adulti per migliorare il loro inglese, prepararsi agli esami e avere successo internazionale.",
    contact_title: "Contatto",
    contact_button: "Invia"
  }
};

const flagURLs = {
  fr: "https://flagcdn.com/fr.svg",
  en: "https://flagcdn.com/gb.svg",
  de: "https://flagcdn.com/de.svg",
  es: "https://flagcdn.com/es.svg",
  it: "https://flagcdn.com/it.svg"
};

// Mise à jour des textes selon la langue
function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelector(".home-container h2").textContent = t.home_title;
  document.querySelector(".home-container p").textContent = t.home_text;
  document.querySelector(".home-container a.btn").textContent = t.book_button;
  document.querySelector(".about-text h2").textContent = t.about_title;
  const aboutParas = document.querySelectorAll(".about-text p");
  aboutParas[0].textContent = t.about_text1;
  aboutParas[1].textContent = t.about_text2;
  document.querySelector(".contact-container h2").textContent = t.contact_title;
  document.querySelector(".contact-container button").textContent = t.contact_button;

  // futur : ajouter pourquoi, tutoring, testimonials...
}

// === Sélecteur de langue ===
(function () {
  const selector = document.getElementById('language-selector');
  const btn = document.getElementById('lang-btn');
  const dropdown = document.getElementById('lang-dropdown');
  const currentFlag = document.getElementById('current-flag');

  // Toggle menu
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    selector.classList.toggle('open');
    const expanded = selector.classList.contains('open');
    btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    dropdown.setAttribute('aria-hidden', expanded ? 'false' : 'true');
  });

  // Click option
  dropdown.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      currentFlag.src = flagURLs[lang];
      currentFlag.alt = lang.toUpperCase();
      selector.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
      applyTranslations(lang);
    });
  });

  // Close menu si click ailleurs
  document.addEventListener('click', (e) => {
    if (!selector.contains(e.target)) {
      selector.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      selector.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
    }
  });
})();
