const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const video = document.getElementById("bgVideo");


let isPlaying = false;

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function playMusic() {
  isPlaying = true;
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  cover.classList.add("rotate");
  cover.classList.remove("rotate-pause");
  video.classList.add("active");
}

function pauseMusic() {
  isPlaying = false;
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  cover.classList.remove("rotate");
  cover.classList.add("rotate-pause");
  video.classList.remove("active");
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

audio.addEventListener("loadedmetadata", () => {
  progress.max = 100;
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration: dur } = audio;
  if (!isNaN(dur)) {
    progress.value = (currentTime / dur) * 100;
    current.textContent = formatTime(currentTime);
    duration.textContent = formatTime(dur);
  }
});

progress.addEventListener("input", () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

prevBtn.addEventListener("click", () => {
  audio.currentTime = 0;
});

nextBtn.addEventListener("click", () => {
  audio.currentTime = audio.duration;
});