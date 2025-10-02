// Scroll to top
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.onscroll = () => {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
};
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mode toggle
const modeSwitch = document.getElementById('mode-switch');
const modeAnimasi = document.getElementById('mode-animasi');
const profileImg = document.querySelector('.profile-img');
const music = document.getElementById('bg-music');
const rainContainer = document.getElementById('rain');

function showModeAnimasi(type) {
  modeAnimasi.innerHTML = "";
  const elem = document.createElement('div');
  elem.className = type === "sun" ? "sun" : "moon";
  elem.style.animation = "move-across 4s linear";
  modeAnimasi.appendChild(elem);
  setTimeout(() => { modeAnimasi.innerHTML = ""; }, 4000);
}

// Rain + Splash
function createRain() {
  rainContainer.innerHTML = "";
  for (let i = 0; i < 60; i++) {
    const drop = document.createElement('div');
    drop.className = 'rain-drop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDelay = (Math.random() * 0.8) + 's';
    drop.style.height = (12 + Math.random() * 18) + 'px';
    drop.style.opacity = 0.5 + Math.random() * 0.5;
    rainContainer.appendChild(drop);

    // Percikan saat jatuh
    drop.addEventListener('animationend', () => {
      const splash = document.createElement('div');
      splash.className = 'splash';
      splash.style.left = drop.style.left;
      rainContainer.appendChild(splash);
      setTimeout(() => splash.remove(), 500);
    });
  }
}
function showRain(show) {
  if (show) {
    rainContainer.style.display = 'block';
    createRain();
  } else {
    rainContainer.style.display = 'none';
    rainContainer.innerHTML = "";
  }
}

modeSwitch.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  modeSwitch.textContent = isLight ? "🌞 Mode Gelap" : "🌙 Mode Terang";
  showModeAnimasi(isLight ? "sun" : "moon");

  if (!isLight) {
    music.play();
    if (profileImg) profileImg.src = "profil2.jpg";
  } else {
    music.pause(); music.currentTime = 0;
    if (profileImg) profileImg.src = "profil.jpg";
  }

  showRain(!isLight); // hanya dark mode
});

// Quotes
const quotes = [
  "Belajar hari ini adalah investasi untuk masa depan.",
  "Jangan takut gagal, karena kegagalan adalah awal dari kesuksesan.",
  "Setiap baris kode adalah langkah menuju impian.",
  "Teknologi diciptakan untuk memudahkan hidup manusia.",
  "Teruslah mencoba, jangan pernah menyerah!",
  "jison oed angkatan berapa sekarang?"
];
let quoteIndex = 0;
const quoteText = document.getElementById('quote-text');
const nextQuoteBtn = document.getElementById('next-quote-btn');
nextQuoteBtn.addEventListener('click', () => {
  quoteText.classList.add('animate');
  setTimeout(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    quoteText.textContent = quotes[quoteIndex];
    quoteText.classList.remove('animate');
  }, 400);
});

// On load
window.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('light-mode')) {
    music.play();
    showRain(true);
  }
});

// Parallax
const parallax = document.querySelector('.parallax');
window.addEventListener('scroll', () => {
  if (parallax) {
    let offset = window.scrollY * 0.5;
    parallax.style.backgroundPositionY = offset + "px";
  }
});

// Stars
const stars = document.querySelectorAll('.star');
window.addEventListener('scroll', () => {
  let scrollY = window.scrollY;
  stars.forEach((star, i) => {
    star.style.transform = `translateY(${scrollY * (0.05 + i*0.01)}px) scale(1)`;
  });
});
