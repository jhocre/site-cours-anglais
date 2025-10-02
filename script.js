// --- Tutoring Services Tabs ---
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function showTab(tabId) {
  tabContents.forEach(content => content.classList.remove('active'));
  tabBtns.forEach(btn => btn.classList.remove('active'));

  const targetContent = document.getElementById(tabId);
  const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);

  if (targetContent) targetContent.classList.add('active');
  if (targetBtn) targetBtn.classList.add('active');
}

// Affiche le premier onglet par défaut
if(tabBtns.length > 0) showTab(tabBtns[0].dataset.tab);

// Ajout des événements click
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    showTab(btn.dataset.tab);
  });
});

// --- Scroll to top button ---
const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Calendly Badge ---
window.onload = function() {
  if(typeof Calendly !== 'undefined') {
    Calendly.initBadgeWidget({
      url: 'https://calendly.com/johann-creneguy/30min',
      text: 'Prendre rendez-vous',
      color: '#8BC34A',
      textColor: '#ffffff',
      branding: false
    });
  }
};
