// Fades each `[data-reveal]` element up the first time it scrolls into view
// (the styles are in global.css). Once shown it stays shown: replaying the
// motion on every pass would make a quiet effect a noisy one.

function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (targets.length === 0) return;

  const showAll = () => targets.forEach((el) => el.classList.add('is-visible'));

  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');
        observer.unobserve(el);

        // Once it has arrived, hand the element back to its own styles: the
        // reveal's transition would otherwise also slow down and delay
        // whatever hover transition the element has of its own.
        el.addEventListener('transitionend', function done(e) {
          if (e.target !== el || e.propertyName !== 'opacity') return;
          el.removeEventListener('transitionend', done);
          el.removeAttribute('data-reveal');
        });
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
  );

  targets.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initReveal);
