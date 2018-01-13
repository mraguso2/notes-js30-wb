/* Get our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');


/* Build our functions */

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

/**
 * separate function to update play/pause button bc don't want the
 * button update just linked to click event
 */
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function rangeChange() {
  video[this.name] = this.value;
}

function handleSkip() {
  video.currentTime += video.currentTime + parseInt(this.dataset.skip, 10);
}

function handleProgessBar() {
  const percent = (100 * video.currentTime) / video.duration;
  progressBar.style = `flex-basis: ${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleFullscreen() {
  video.webkitRequestFullScreen();
}

/* Hook up the event listeners */

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgessBar);

toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', handleFullscreen);

skipButtons.forEach(button => button.addEventListener('click', handleSkip));
ranges.forEach(range => range.addEventListener('input', rangeChange));


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // instead of input event
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
