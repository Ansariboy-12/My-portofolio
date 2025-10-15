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

// KONTROL VIDEO
const headerVideo = document.getElementById('header-video');
const videoOverlay = document.querySelector('.video-overlay');
// ELEMEN HERO UNTUK EFEK MOUSE FOLLOW
const heroSection = document.getElementById('home');
const heroContent = document.querySelector('.hero-content');


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

// ===========================================
// FUNGSI UTAMA: EFEK FOLLOW MOUSE / KURSOR
// ===========================================
function handleMouseMove(e) {
    const strength = 0.05; // Kekuatan pergerakan
    const heroRect = heroSection.getBoundingClientRect();
    
    // Posisi X dan Y kursor relatif terhadap tengah hero section
    const centerX = heroRect.left + heroRect.width / 2;
    const centerY = heroRect.top + heroRect.height / 2;
    
    const moveX = (e.clientX - centerX) * strength;
    const moveY = (e.clientY - centerY) * strength;

    // Terapkan translasi pada konten hero
    if (heroContent) {
        heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
}

// Tambahkan Event Listener ke Hero Section
if (heroSection) {
    heroSection.addEventListener('mousemove', handleMouseMove);
}
// ===========================================
// END EFEK FOLLOW MOUSE
// ===========================================


// LOGIKA UTAMA MODE SWITCH
modeSwitch.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-mode');
  modeSwitch.textContent = isLight ? "🌞 Mode Gelap" : "🌙 Mode Terang";
  showModeAnimasi(isLight ? "sun" : "moon");
  
  // KONTROL VIDEO (MODIFIKASI)
  if (headerVideo && videoOverlay) {
    if (!isLight) { 
        // BERALIH ke Dark Mode
        headerVideo.play().catch(e => console.log("Video play blocked:", e));
        headerVideo.style.opacity = "0.25"; 
        videoOverlay.style.opacity = "1";
    } else {
        // BERALIH ke Light Mode
        headerVideo.pause();
        headerVideo.style.opacity = "0"; 
        videoOverlay.style.opacity = "0";
    }
  }
  // END KONTROL VIDEO

  if (!isLight) {
    music.play();
    if (profileImg) profileImg.src = "profil2.jpg";
  } else {
    music.pause(); music.currentTime = 0;
    if (profileImg) profileImg.src = "profil.jpg";
  }

  showRain(!isLight); // hanya dark mode
});

// ==========================
// RANDOM QUOTES GENERATOR
// ==========================
const quotes = [
  "“Kode bukan hanya logika, tapi juga seni.”",
  "“Setiap error adalah guru terbaik.”",
  "“Membangun masa depan dimulai dari satu baris kode.”",
  "“Belajar hari ini adalah investasi untuk masa depan.”",
  "“Ngoding itu sabar, bukan cepat.”",
  "“Ciptakan, jangan hanya konsumsi teknologi.”",
  "“Tidak ada kode sempurna, hanya kode yang terus disempurnakan.”"
];

function generateQuote() {
  const quoteElement = document.getElementById("quote-text");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[randomIndex];
  quoteElement.style.animation = 'none';
  quoteElement.offsetHeight; // reset animasi
  quoteElement.style.animation = 'fadeQuote 0.6s ease';
}

// On load
window.addEventListener('DOMContentLoaded', () => {
  generateQuote();
  if (!document.body.classList.contains('light-mode')) {
    music.play().catch(e => console.log("Music play blocked:", e));
    showRain(true);
    // PASTIKAN VIDEO JUGA MUNCUL SAAT LOAD DALAM DARK MODE
    if (headerVideo) headerVideo.style.opacity = "0.25";
    if (videoOverlay) videoOverlay.style.opacity = "1";
    if (modeSwitch) modeSwitch.textContent = "🌞 Mode Terang";
  }
});

// Parallax (ASLI) - Untuk elemen Bintang saat SCROLL
const stars = document.querySelectorAll('.star');
window.addEventListener('scroll', () => {
  let scrollY = window.scrollY;
  stars.forEach((star, i) => {
    // Parallax saat scroll, dengan kecepatan berbeda (i*0.01)
    star.style.transform = `translateY(${scrollY * (0.05 + i*0.01)}px) scale(1)`;
  });
});

// Navbar Scroll Effect & Toggle (ASLI)
const navbar = document.querySelector('.main-navbar');
const navLinks = document.querySelector('.nav-links'); // Harus dideklarasikan
const toggleBtn = document.querySelector('.menu-toggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Neon Loading Screen
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 5200); 
});

// Particles.js Configuration (ASLI)
document.addEventListener('DOMContentLoaded', () => {
  const particlesContainer = document.getElementById('particles-js');
  if (!particlesContainer) return;

  particlesJS("particles-js", {
    "particles": {
      "number": { "value": 85 },
      "color": { "value": "#6decb9" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.6, "random": true },
      "size": { "value": 3, "random": true },
      "line_linked": {
        "enable": true,
        "distance": 130,
        "color": "#6decb9",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "out_mode": "bounce"
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "repulse" },
        "onclick": { "enable": true, "mode": "push" }
      },
      "modes": {
        "repulse": { "distance": 100 },
        "push": { "particles_nb": 4 }
      }
    },
    "retina_detect": true
  });
});
// =======================================
// Animasi Latar Belakang Tutorial (Code Flow)
// =======================================
function createCodeFlow() {
    const terminalContainer = document.querySelector('.tutorial-bg-terminal');
    if (!terminalContainer) return;

    const dummyCodeLines = [
        "const setup = (el) => { // Buat fungsi setup...",
        "fetch('./style.css').then(res => res.text())...",
        "let i = 0; while (i < 10) { console.log('loop'); i++; }",
        "class Component extends React.PureComponent { ... }",
        "$('#myModal').modal('show'); // JQuery",
        "/* Inisialisasi variabel dan fungsi */",
        "function handleInput(e) { e.preventDefault(); }",
        "/* --- Media Query untuk Responsif --- */",
        "return (<div>Halo Web!</div>);",
        "body { background: var(--bg-color); }",
        "<a href='#kontak'>Hubungi Saya</a>",
        "let data = []; data.push('new item');"
    ];
    
    const numberOfLines = 50; 

    for (let i = 0; i < numberOfLines; i++) {
        const line = document.createElement('span');
        line.className = 'code-line';
        
        // Isi dengan baris kode acak
        line.textContent = dummyCodeLines[Math.floor(Math.random() * dummyCodeLines.length)];
        
        // Posisi dan waktu acak
        line.style.left = Math.random() * 100 + '%';
        line.style.top = Math.random() * 100 + 'vh';
        line.style.animationDelay = Math.random() * -20 + 's'; // Membuat beberapa sudah mulai berjalan
        
        terminalContainer.appendChild(line);
    }
}

// Panggil fungsi ini saat dokumen selesai dimuat (Anda bisa menempatkannya bersama panggilan fungsi lain di bawah)
document.addEventListener('DOMContentLoaded', () => {
    // ... panggil fungsi lain di sini jika ada
    createCodeFlow(); // Tambahkan baris ini
});
