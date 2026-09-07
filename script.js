const sparkleContainer = document.getElementById('sparkles');
const photoCounter = document.getElementById('photoCounter');
const birthdayAudio = document.getElementById('birthdayAudio');
const trackTitle = document.getElementById('trackTitle');
const songOptions = Array.from(document.querySelectorAll('.song-option'));
const volumeDown = document.getElementById('volumeDown');
const volumeUp = document.getElementById('volumeUp');
const volumeSlider = document.getElementById('volumeSlider');
const volumeLabel = document.getElementById('volumeLabel');

let activeSlide = 0;

function updateCounter() {
  if (!photoCounter || !slides.length) return;
  photoCounter.textContent = `${activeSlide + 1} / ${slides.length}`;
}

function spawnSparkles() {
  if (!sparkleContainer) return;

  const count = 20;

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';

    const left = Math.random() * 100;
    const size = Math.random() * 10 + 6;
    const duration = Math.random() * 10 + 12;
    const delay = Math.random() * 6;
    const hue = 300 + Math.random() * 80;

    sparkle.style.left = `${left}%`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.background = `hsla(${hue}, 100%, 85%, 0.9)`;
    sparkle.style.animationDuration = `${duration}s`;
    sparkle.style.animationDelay = `${delay}s`;

    sparkleContainer.appendChild(sparkle);
  }
}

const slides = Array.from(document.querySelectorAll('.slide'));

function showSlide(index) {
  if (!slides.length) return;

  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === activeSlide);
  });

  updateCounter();
}

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (prevBtn) {
  prevBtn.addEventListener('click', () => showSlide(activeSlide - 1));
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => showSlide(activeSlide + 1));
}

function selectTrack(button) {
  const source = button.dataset.track;
  const title = button.dataset.title;

  if (!birthdayAudio || !source) return;

  birthdayAudio.src = source;
  birthdayAudio.load();
  birthdayAudio.play();

  songOptions.forEach((option) => option.classList.toggle('active', option === button));

  if (trackTitle) {
    trackTitle.textContent = title;
  }
}

function setVolume(value) {
  if (!birthdayAudio) return;

  const volume = Math.min(1, Math.max(0, Number(value)));
  birthdayAudio.volume = volume;

  if (volumeSlider) volumeSlider.value = volume;
  if (volumeLabel) volumeLabel.textContent = `${Math.round(volume * 100)}%`;
}

if (birthdayAudio) setVolume(birthdayAudio.volume);

if (volumeDown) {
  volumeDown.addEventListener('click', () => setVolume((birthdayAudio?.volume ?? 1) - 0.1));
}

if (volumeUp) {
  volumeUp.addEventListener('click', () => setVolume((birthdayAudio?.volume ?? 1) + 0.1));
}

if (volumeSlider) {
  volumeSlider.addEventListener('input', (event) => setVolume(event.target.value));
}

songOptions.forEach((button) => {
  button.addEventListener('click', () => selectTrack(button));
  button.addEventListener('pointerdown', () => selectTrack(button));
  button.addEventListener('touchstart', () => selectTrack(button), { passive: true });
});

setInterval(() => showSlide(activeSlide + 1), 4000);

spawnSparkles();
showSlide(0);
