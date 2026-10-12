// Hero video: the browser autoplays it muted and looping (see the video tag in index.html).
// The sound button unmutes it and starts it over, so the visitor hears the call from the beginning.
// Visitors who ask their device for reduced motion get a paused video with normal player controls instead.

function setUpHeroVideo() {
  const video = document.querySelector('.hero-video');
  const soundButton = document.querySelector('.hero-video-sound');
  if (!video || !soundButton) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    video.removeAttribute('autoplay');
    video.pause();
    video.controls = true;
    soundButton.hidden = true;
    return;
  }

  soundButton.addEventListener('click', () => {
    const turningSoundOn = video.muted;
    video.muted = !turningSoundOn;
    if (turningSoundOn) {
      video.currentTime = 0;
    }
    video.play();
    soundButton.setAttribute('aria-pressed', String(turningSoundOn));
    soundButton.setAttribute('aria-label', turningSoundOn ? 'Turn sound off' : 'Turn sound on');
  });
}

setUpHeroVideo();
