// Demo video: muted by default with a manual mute/unmute toggle, and a
// click-to-expand lightbox. There are no native controls at any size, so
// visitors can mute and expand the video but never pause, scrub, or change
// its playback speed; the listeners below close the few remaining paths to
// those actions (keyboard shortcuts, context menu, programmatic pauses).
//
// The file is only requested once the video is close to the viewport. Until
// then the element shows its poster and has no `src` at all.

function initDemoVideo(): void {
  const slot = document.getElementById('demo-video-slot');
  const stage = document.getElementById('demo-video-stage');
  const overlay = document.getElementById('demo-video-overlay');
  const video = document.getElementById('demo-video') as HTMLVideoElement | null;
  const muteBtn = document.getElementById('demo-video-mute');

  if (!slot || !stage || !overlay || !video || !muteBtn) return;

  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    const src = video.dataset.src;
    if (src) video.src = src;
    video.play().catch(() => {});
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(slot);
  } else {
    start();
  }

  const iconMuted = muteBtn.querySelector<SVGElement>('[data-icon="muted"]');
  const iconUnmuted = muteBtn.querySelector<SVGElement>('[data-icon="unmuted"]');

  const updateMuteIcon = () => {
    iconMuted?.classList.toggle('hidden', !video.muted);
    iconUnmuted?.classList.toggle('hidden', video.muted);
    muteBtn.setAttribute('aria-pressed', String(!video.muted));
    muteBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
  };

  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    start();
    video.muted = !video.muted;
    updateMuteIcon();
  });

  // No controls are ever rendered, but close the remaining paths to
  // pausing, scrubbing, or changing speed (keyboard, context menu, API).
  video.addEventListener('keydown', (e) => {
    if ([' ', 'k', 'K', 'ArrowLeft', 'ArrowRight', ',', '.', '<', '>'].includes(e.key)) {
      e.preventDefault();
    }
  });
  video.addEventListener('contextmenu', (e) => e.preventDefault());
  video.addEventListener('pause', () => {
    if (started && !video.ended) video.play().catch(() => {});
  });
  video.addEventListener('ratechange', () => {
    if (video.playbackRate !== 1) video.playbackRate = 1;
  });

  let expanded = false;

  const expand = () => {
    if (expanded) return;
    expanded = true;
    start();
    overlay.appendChild(stage);
    stage.classList.add('max-w-6xl', 'mx-auto');
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  };

  const collapse = () => {
    if (!expanded) return;
    expanded = false;
    slot.appendChild(stage);
    stage.classList.remove('max-w-6xl', 'mx-auto');
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  };

  video.addEventListener('click', (e) => {
    e.stopPropagation();
    if (expanded) collapse();
    else expand();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) collapse();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expanded) collapse();
  });
}

document.addEventListener('DOMContentLoaded', initDemoVideo);
