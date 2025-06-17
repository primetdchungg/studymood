const musicList = [
  {
    title: "Muộn rồi mà sao còn",
    artist: "Sơn Tùng MTP",
    src: "music/mrmsc.mp3",
  },
  {
    title: "TRÌNH",
    artist: "HIEUTHUHAI",
    src: "music/rinhaitam.mp3",
  },
];

const audio = document.getElementById("music-player-audio");
const titleElement = document.querySelector(".music-player-title");
const playBtn = document.getElementById("music-player-play-btn");
const prevBtn = document.getElementById("music-player-prev-btn");
const nextBtn = document.getElementById("music-player-next-btn");
const progressBar = document.getElementById("music-player-progress-bar");

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(index) {
  const song = musicList[index];
  titleElement.textContent = `${song.title} - ${song.artist}`;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶";
}

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex - 1 + musicList.length) % musicList.length;
  loadSong(currentSongIndex);
  playSong();
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % musicList.length;
  loadSong(currentSongIndex);
  playSong();
});

audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;
});

// Tự động chuyển bài khi bài hiện tại kết thúc
audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Load bài đầu tiên
loadSong(currentSongIndex);
