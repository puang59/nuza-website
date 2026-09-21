// Smart download button — detects the visitor's OS and wires up the
// platform dropdown next to it.

const VERSION = '0.1.0';

const DOWNLOAD_URLS: Record<string, string> = {
  'mac-arm': `https://github.com/puang59/nuza/releases/latest/download/nuza_${VERSION}_aarch64.dmg`,
  'mac-intel': `https://github.com/puang59/nuza/releases/latest/download/nuza_${VERSION}_x64.dmg`,
  win: `https://github.com/puang59/nuza/releases/latest/download/nuza_${VERSION}_x64-setup.exe`,
  'linux-deb': `https://github.com/puang59/nuza/releases/latest/download/nuza_${VERSION}_amd64.deb`,
  'linux-rpm': `https://github.com/puang59/nuza/releases/latest/download/nuza_${VERSION}-1.x86_64.rpm`,
  'linux-appimage': `https://github.com/puang59/nuza/releases/latest/download/nuza_${VERSION}_amd64.AppImage`,
};

const PLATFORM_ICONS: Record<'apple' | 'windows' | 'linux', string> = {
  apple: `<svg width="13" height="13" viewBox="0 0 814 1000" fill="currentColor"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>`,
  windows: `<svg width="13" height="13" viewBox="0 0 88 88" fill="currentColor"><path d="M0 12.402l35.687-4.86.016 34.423-35.67.202zm35.67 33.529l.028 34.453L.028 75.48l-.026-29.48zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.318 42.24L87.314 88 40.022 81.694l-.066-33.709z"/></svg>`,
  linux: `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021C7.928.334 5.26 2.69 5.26 5.498c0 .157.007.315.02.475.18 2.395 1.784 4.348 4.018 5.26.31.125.636.2.97.218.196.01.384.01.577-.004.09-.007.178-.016.265-.028 2.61-.388 4.575-2.627 4.575-5.199 0-.143-.007-.286-.021-.43C15.5 2.41 14.18.56 12.504 0zm-.078 1.5c.938.002 1.64.596 1.794 1.514.082.48.02.96-.18 1.38-.31.657-.918 1.1-1.614 1.1-.695 0-1.302-.443-1.614-1.1-.2-.42-.261-.9-.18-1.38C10.786 2.096 11.488 1.5 12.426 1.5zm-2.95 7.596c1.61 1.3 3.754 1.62 5.7.85.34-.135.66-.31.96-.51.68.988 1.116 2.264.97 3.56-.22 1.96-1.49 3.654-3.26 4.394-.3.12-.614.196-.933.228-.168.016-.338.018-.508.006-.177-.013-.352-.042-.523-.087-1.74-.46-3.004-1.988-3.178-3.765-.108-1.08.168-2.12.772-2.976zm-1.01 1.9c-.54.77-.832 1.7-.75 2.65.122 1.43 1.09 2.654 2.445 3.01.197.053.4.08.606.09.155.007.312.005.467-.005.25-.02.494-.074.725-.162 1.318-.53 2.248-1.798 2.4-3.222.117-1.01-.14-1.99-.682-2.78-.14.07-.284.13-.43.18-2.158.82-4.52.49-6.234-.95zm-3.48 2.5c.1.01.198.02.297.036.86.128 1.527.85 1.527 1.714 0 .96-.778 1.738-1.738 1.738-.96 0-1.738-.778-1.738-1.738 0-.96.778-1.738 1.738-1.738.062 0 .124.002.186.007zm9.968 0c.062-.005.124-.007.186-.007.96 0 1.738.778 1.738 1.738 0 .96-.778 1.738-1.738 1.738-.96 0-1.738-.778-1.738-1.738 0-.864.667-1.586 1.527-1.714.099-.016.197-.026.297-.036zM9.97 18.5c.69 1.02 1.804 1.706 3.072 1.78.162.01.325.01.488 0 1.268-.074 2.382-.76 3.072-1.78a5.32 5.32 0 0 1-3.6.87 5.32 5.32 0 0 1-3.033-1.618zm5.7 2.49c-.44.11-.9.17-1.37.18-.47.01-.93-.04-1.37-.14.25.46.66.81 1.16.96.13.04.27.06.41.06.14 0 .28-.02.41-.06.5-.15.91-.5 1.16-.96z"/></svg>`,
};

function detectOS(): keyof typeof DOWNLOAD_URLS {
  const ua = navigator.userAgent;
  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(ua)) return 'mac-arm';
  if (/Win32|Win64|Windows|WinCE/.test(ua)) return 'win';
  return 'linux-deb';
}

function iconFor(os: string): string {
  if (os.startsWith('mac')) return PLATFORM_ICONS.apple;
  if (os === 'win') return PLATFORM_ICONS.windows;
  return PLATFORM_ICONS.linux;
}

function triggerDownload(os: string): void {
  const url = DOWNLOAD_URLS[os];
  if (!url) return;

  const link = document.createElement('a');
  link.href = url;
  link.download = '';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function initDownloadButton(): void {
  const detectedOS = detectOS();
  const osIcon = document.getElementById('dl-os-icon');
  const mainBtn = document.getElementById('cta-download');
  const chevron = document.getElementById('dl-chevron');
  const dropdown = document.getElementById('dl-dropdown');

  if (osIcon) osIcon.innerHTML = iconFor(detectedOS);

  document.querySelectorAll<HTMLElement>('.dl-icon-apple').forEach((el) => {
    el.innerHTML = PLATFORM_ICONS.apple;
  });
  document.querySelectorAll<HTMLElement>('.dl-icon-win').forEach((el) => {
    el.innerHTML = PLATFORM_ICONS.windows;
  });
  document.querySelectorAll<HTMLElement>('.dl-icon-linux').forEach((el) => {
    el.innerHTML = PLATFORM_ICONS.linux;
  });

  mainBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    triggerDownload(detectedOS);
  });

  chevron?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !dropdown?.classList.contains('hidden');
    dropdown?.classList.toggle('hidden', isOpen);
    chevron.setAttribute('aria-expanded', String(!isOpen));
  });

  document.querySelectorAll<HTMLButtonElement>('.dl-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const os = btn.dataset.os;
      if (os) triggerDownload(os);
      dropdown?.classList.add('hidden');
      chevron?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', () => {
    dropdown?.classList.add('hidden');
    chevron?.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('DOMContentLoaded', initDownloadButton);
