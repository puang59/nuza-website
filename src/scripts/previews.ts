// Screenshot gallery — rows auto-scroll continuously via CSS (see
// global.css), so this only wires up the click-to-zoom lightbox. Each
// screenshot appears twice in the DOM (the marquee loop is the item list
// rendered back to back), so navigation is keyed off the shared
// `data-index` rather than DOM position or element count.

function initPreviews(): void {
  const lightbox = document.getElementById('pv-lightbox');
  const lightboxImg = document.getElementById('pv-lightbox-img') as HTMLImageElement | null;
  const lightboxPrev = document.getElementById('pv-lightbox-prev');
  const lightboxNext = document.getElementById('pv-lightbox-next');
  const lightboxCount = document.getElementById('pv-lightbox-count');

  if (!lightbox || !lightboxImg) return;

  const total = Number(lightbox.dataset.total) || 1;
  let currentIndex = 0;

  const showIndex = (index: number) => {
    currentIndex = ((index % total) + total) % total;
    const match = document.querySelector<HTMLElement>(`.pv-item[data-index="${currentIndex}"]`);
    const img = match?.querySelector('img');
    if (!img) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    if (lightboxCount) lightboxCount.textContent = `${currentIndex + 1}/${total}`;
  };

  const open = (index: number) => {
    showIndex(index);
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  };

  const close = () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  };

  const isOpen = () => !lightbox.classList.contains('hidden');

  document.querySelectorAll<HTMLButtonElement>('.pv-item').forEach((item) => {
    item.addEventListener('click', () => {
      const index = Number(item.dataset.index);
      if (!Number.isNaN(index)) open(index);
    });
  });

  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
    close();
  });

  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    showIndex(currentIndex - 1);
  });
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    showIndex(currentIndex + 1);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') showIndex(currentIndex - 1);
    else if (e.key === 'ArrowRight') showIndex(currentIndex + 1);
  });
}

document.addEventListener('DOMContentLoaded', initPreviews);
