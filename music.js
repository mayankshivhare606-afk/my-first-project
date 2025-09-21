const { songs } = require("./songs.1");

let songtitle = document.getElementById('song-title');
let artistname = document.getElementById('artist-name');
let playpausebutton = document.getElementById('play-pause-button');
let previousbutton = document.getElementById('previous-button');
let nextbutton = document.getElementById('next-button');
let progressbar = document.getElementById('progress-bar');
let volumeControl = document.getElementById('volume-control');

let CurrentSongIndex = 0;
let audio = new Audio(songs[CurrentSongIndex].src);

function loadSong(index) {
  audio.src = songs[index].src;
  songtitle.innerText = songs[index].title;
  artistname.innerText = songs[index].artist;
  // No need for audio.load() here
}

loadSong(CurrentSongIndex);

playpausebutton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playpausebutton.innerText = 'Pause';
  } else {
    audio.pause();
    playpausebutton.innerText = 'Play';
  }
});

previousbutton.addEventListener('click', () => {
  CurrentSongIndex = (CurrentSongIndex - 1 + songs.length) % songs.length;
  loadSong(CurrentSongIndex);
  audio.play();
  playpausebutton.innerText = 'Pause';
});

nextbutton.addEventListener('click', () => {
  CurrentSongIndex = (CurrentSongIndex + 1) % songs.length;
  loadSong(CurrentSongIndex);
  audio.play();
  playpausebutton.innerText = 'Pause';
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    progressbar.value = (audio.currentTime / audio.duration) * 100;
  }
});

volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

