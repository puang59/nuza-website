// Eased, JS-driven scroll snapping for the right column's sections.
// Native CSS scroll-snap was dropped in favor of this: browsers wait for
// scrolling to fully settle before snapping, which reads as a laggy pause
// on trackpads. Owning the whole gesture (wheel -> section) removes that.

const RIGHT_COL_ID = 'right-col';
const SNAP_DURATION_MS = 600;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateScrollTop(
  container: HTMLElement,
  toOffset: number,
  duration: number,
  onDone?: () => void
): void {
  const start = container.scrollTop;
  const distance = toOffset - start;
  if (Math.abs(distance) < 1) {
    onDone?.();
    return;
  }

  const startTime = performance.now();

  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration);
    container.scrollTop = start + distance * easeInOutCubic(t);
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      onDone?.();
    }
  };

  requestAnimationFrame(step);
}

export function smoothScrollTo(target: HTMLElement | null): void {
  const container = document.getElementById(RIGHT_COL_ID);
  if (!target || !container) return;
  animateScrollTop(container, target.offsetTop, SNAP_DURATION_MS);
}

function initWheelSnap(): void {
  const container = document.getElementById(RIGHT_COL_ID);
  if (!container) return;

  const sections = Array.from(container.querySelectorAll<HTMLElement>('section'));
  if (sections.length === 0) return;

  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  let isAnimating = false;

  const nearestSectionIndex = (): number => {
    let closest = 0;
    let minDistance = Infinity;
    sections.forEach((section, i) => {
      const distance = Math.abs(section.offsetTop - container.scrollTop);
      if (distance < minDistance) {
        minDistance = distance;
        closest = i;
      }
    });
    return closest;
  };

  container.addEventListener(
    'wheel',
    (e: WheelEvent) => {
      if (!isDesktop() || prefersReducedMotion) return;

      if (isAnimating) {
        e.preventDefault();
        return;
      }

      const currentIndex = nearestSectionIndex();
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        sections.length - 1,
        Math.max(0, currentIndex + direction)
      );
      if (nextIndex === currentIndex) return;

      e.preventDefault();
      isAnimating = true;
      animateScrollTop(container, sections[nextIndex].offsetTop, SNAP_DURATION_MS, () => {
        isAnimating = false;
      });
    },
    { passive: false }
  );
}

function initScrollToChangelogButton(): void {
  document.getElementById('scroll-to-changelog')?.addEventListener('click', () => {
    smoothScrollTo(document.getElementById('changelog-section'));
  });
}

initWheelSnap();
document.addEventListener('DOMContentLoaded', initScrollToChangelogButton);
