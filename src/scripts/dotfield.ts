// A field of dots that swell and fade in slow, drifting blobs, drawn on a
// canvas behind the contributors' page. Each dot's size comes from a few
// layers of sine noise over its grid position and the time, so the pattern
// flows without ever repeating exactly. The idea is borrowed from devdoq's
// pricing page, recoloured in nuza's coral.
//
// It only runs while the canvas is on screen, holds to 30 frames a second,
// and draws a single still frame when motion is reduced. The vignette is a
// CSS mask on the canvas (see the section), not painted here.

const COLOR = 'rgba(255, 150, 150, 0.85)';
const FPS = 30;

// Sine and cosine from a table: the field calls them some thousands of times
// a frame, and an exact value is not needed for a pattern of dots.
const TABLE = 360;
const TAU = Math.PI * 2;
const SIN = Array.from({ length: TABLE }, (_, i) => Math.sin((i / TABLE) * TAU));
const COS = Array.from({ length: TABLE }, (_, i) => Math.cos((i / TABLE) * TAU));
const index = (x: number) => Math.abs(Math.floor(((x % TAU) / TAU) * TABLE)) % TABLE;
const sin = (x: number) => SIN[index(x)];
const cos = (x: number) => COS[index(x)];

const noise = (x: number, y: number, t: number) =>
  sin(x * 0.05 + t * 0.5) * cos(y * 0.05 - t * 0.3) +
  sin((x + y) * 0.03 + t * 0.7) * cos((x - y) * 0.02 - t * 0.4) +
  sin(x * 0.02 + y * 0.02 + t) * sin(t * 0.6);

function start(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let small = false;
  let time = 0;
  let frame = 0;
  let last = 0;
  let visible = false;

  const resize = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    small = width < 768;
    canvas.width = width;
    canvas.height = height;
    draw();
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = COLOR;

    const spacing = small ? 9 : 10;
    const dot = small ? 2.8 : 3.6;
    const cols = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    ctx.beginPath();
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const n =
          noise(i, j, time) * 0.5 +
          noise(i * 0.5, j * 0.5, time * 1.5) * 0.3 +
          noise(i * 1.5, j * 1.5, time * 0.7) * 0.2 +
          sin(i * 0.08 + time * 0.8) * sin(j * 0.08 - time * 0.6) * 0.4;
        const size = dot * Math.pow(Math.abs(n) % 1, 0.6);
        if (size < 0.4) continue;
        ctx.rect(i * spacing - size / 2, j * spacing - size / 2, size, size);
      }
    }
    ctx.fill();
  };

  const loop = (now: number) => {
    frame = requestAnimationFrame(loop);
    if (now - last < 1000 / FPS) return;
    last = now;
    time += small ? 0.01 : 0.005;
    draw();
  };

  new ResizeObserver(resize).observe(canvas);
  if (still) return;

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting === visible) return;
    visible = entry.isIntersecting;
    if (visible) frame = requestAnimationFrame(loop);
    else cancelAnimationFrame(frame);
  }).observe(canvas);
}

document.querySelectorAll<HTMLCanvasElement>('canvas[data-dotfield]').forEach(start);
