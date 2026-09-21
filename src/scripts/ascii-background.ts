// Ambient ASCII texture behind the left panel. Renders a low-opacity,
// abstract flow field (layered sine interference — deliberately not a
// literal shape like rain or waves) using monospace glyphs on a canvas.

const CANVAS_ID = 'ascii-bg';
const GLYPHS = ['.', ':', '+', '*', 'x', '#'];
const GLYPH_COLOR = '255, 150, 150'; // accent #FF9696
const VISIBILITY_THRESHOLD = 0.34; // 0..1 field intensity below which nothing is drawn
const MOBILE_BREAKPOINT = 1024;
const TRIG_CACHE_SIZE = 720;
const TARGET_FPS = 30;
const RESIZE_DEBOUNCE_MS = 120;

function buildTrigCache(size: number) {
  const sin: number[] = [];
  const cos: number[] = [];
  for (let i = 0; i < size; i++) {
    const angle = (i / size) * Math.PI * 2;
    sin[i] = Math.sin(angle);
    cos[i] = Math.cos(angle);
  }

  const lookup = (table: number[], x: number) => {
    const i = Math.floor(((x % (Math.PI * 2)) / (Math.PI * 2)) * size);
    return table[((i % size) + size) % size];
  };

  return {
    fastSin: (x: number) => lookup(sin, x),
    fastCos: (x: number) => lookup(cos, x),
  };
}

function initAsciiBackground(): void {
  const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement | null;
  const container = canvas?.parentElement ?? null;
  const ctx = canvas?.getContext('2d') ?? null;
  if (!canvas || !container || !ctx) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;
  const { fastSin, fastCos } = buildTrigCache(TRIG_CACHE_SIZE);

  // Layered angular sine interference — an abstract, non-representational
  // flow field rather than literal shapes.
  const field = (x: number, y: number, t: number): number => {
    const a = fastSin(x * 0.09 + t * 0.4) * fastCos(y * 0.07 - t * 0.25);
    const b =
      fastCos((x - y) * 0.05 + t * 0.6) * fastSin((x + y) * 0.04 - t * 0.35);
    const c = fastSin(x * 0.03 - y * 0.05 + t * 0.5);
    return a * 0.45 + b * 0.4 + c * 0.3;
  };

  let cssWidth = 0;
  let cssHeight = 0;
  let cell = 0;
  let cols = 0;
  let rows = 0;
  let time = 0;
  let visible = true;
  let animationFrame: number | undefined;

  function resize(): void {
    cssWidth = container!.clientWidth;
    cssHeight = container!.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas!.width = Math.floor(cssWidth * dpr);
    canvas!.height = Math.floor(cssHeight * dpr);
    canvas!.style.width = `${cssWidth}px`;
    canvas!.style.height = `${cssHeight}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    cell = isMobile() ? 15 : 17;
    cols = Math.ceil(cssWidth / cell) + 1;
    rows = Math.ceil(cssHeight / cell) + 1;

    ctx!.font = `${Math.floor(cell * 0.62)}px var(--font-mono, monospace)`;
    ctx!.textBaseline = 'middle';
    ctx!.textAlign = 'center';
  }

  function draw(): void {
    ctx!.clearRect(0, 0, cssWidth, cssHeight);

    const step = isMobile() ? 2 : 1;
    const span = 1 - VISIBILITY_THRESHOLD;

    for (let j = 0; j < rows; j += step) {
      for (let i = 0; i < cols; i += step) {
        const intensity = (field(i, j, time) + 1) / 2; // 0..1
        if (intensity < VISIBILITY_THRESHOLD) continue;

        const above = intensity - VISIBILITY_THRESHOLD;
        const glyph = GLYPHS[Math.min(GLYPHS.length - 1, Math.floor((above / span) * GLYPHS.length))];
        const alpha = 0.09 + above * 0.4;

        ctx!.fillStyle = `rgba(${GLYPH_COLOR}, ${alpha})`;
        ctx!.fillText(glyph, i * cell, j * cell);
      }
    }
  }

  function animate(now: number, lastFrameTime: { value: number }): void {
    if (!visible) return;

    const frameInterval = 1000 / TARGET_FPS;
    const delta = now - lastFrameTime.value;
    if (delta >= frameInterval) {
      lastFrameTime.value = now - (delta % frameInterval);
      draw();
      time += 0.018;
    }
    animationFrame = requestAnimationFrame((t) => animate(t, lastFrameTime));
  }

  resize();
  draw();

  if (!prefersReducedMotion) {
    animationFrame = requestAnimationFrame((t) => animate(t, { value: 0 }));
  }

  let resizeTimeout: number | undefined;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      resize();
      draw();
    }, RESIZE_DEBOUNCE_MS);
  });

  document.addEventListener('visibilitychange', () => {
    visible = document.visibilityState === 'visible';
    if (visible && !prefersReducedMotion && animationFrame === undefined) {
      animationFrame = requestAnimationFrame((t) => animate(t, { value: 0 }));
    }
  });
}

initAsciiBackground();
