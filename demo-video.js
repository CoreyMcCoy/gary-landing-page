// Demo video: the poster frame shows until the visitor presses play.
// Only then is the player created, so no video or third-party script loads up front.
// Set data-video-src on .video-frame to a YouTube, Vimeo or .mp4 URL.

function getEmbedUrl(videoUrl) {
  if (!videoUrl.trim()) {
    return null;
  }

  let url;
  try {
    url = new URL(videoUrl, window.location.href);
  } catch (error) {
    return null;
  }

  const host = url.hostname.replace(/^www\./, '');
  const pathParts = url.pathname.split('/').filter(Boolean);

  if (host === 'youtu.be' || host.endsWith('youtube.com') || host === 'youtube-nocookie.com') {
    let videoId = url.searchParams.get('v');
    if (host === 'youtu.be') {
      videoId = pathParts[0];
    } else if (['embed', 'shorts', 'live'].includes(pathParts[0])) {
      videoId = pathParts[1];
    }
    if (!videoId) {
      return null;
    }
    return { type: 'iframe', src: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0` };
  }

  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const videoId = pathParts.find((part) => /^\d+$/.test(part));
    if (!videoId) {
      return null;
    }
    // Unlisted Vimeo links carry a privacy hash after the id (vimeo.com/123/abc or ?h=abc)
    const idIndex = pathParts.indexOf(videoId);
    const privacyHash = url.searchParams.get('h') || pathParts[idIndex + 1];
    const hashParam = privacyHash ? `&h=${privacyHash}` : '';
    return { type: 'iframe', src: `https://player.vimeo.com/video/${videoId}?autoplay=1${hashParam}` };
  }

  // Cloudinary's hosted player page (player.cloudinary.com/embed/?cloud_name=...&public_id=...)
  if (host === 'player.cloudinary.com') {
    url.searchParams.set('autoplay', 'true');
    return { type: 'iframe', src: url.href };
  }

  // Anything else is treated as a direct video file, including Cloudinary delivery
  // links (res.cloudinary.com/.../video/upload/...) and .mp4 files
  return { type: 'video', src: url.href };
}

function playDemoVideo(frame) {
  const embed = getEmbedUrl(frame.dataset.videoSrc || '');
  if (!embed) {
    console.info('Demo video: no video yet. Set data-video-src on .video-frame.');
    return;
  }

  let player;
  if (embed.type === 'iframe') {
    player = document.createElement('iframe');
    player.src = embed.src;
    player.title = frame.dataset.videoTitle || 'Demo video';
    player.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    player.allowFullscreen = true;
  } else {
    player = document.createElement('video');
    player.src = embed.src;
    player.controls = true;
    player.autoplay = true;
    player.playsInline = true;
    player.setAttribute('aria-label', frame.dataset.videoTitle || 'Demo video');
  }
  player.className = 'video-player';

  frame.replaceChildren(player);
  player.focus();
}

document.querySelectorAll('.video-frame').forEach((frame) => {
  const playButton = frame.querySelector('.video-play');
  if (playButton) {
    playButton.addEventListener('click', () => playDemoVideo(frame));
  }
});
