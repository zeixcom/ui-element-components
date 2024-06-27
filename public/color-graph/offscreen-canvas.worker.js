importScripts('https://unpkg.com/culori@^3.0.0/dist/culori.esm.js');

const { inGamut, formatCss } = culori;

let canvas;
let canvasSize;
let ctx;
let h;

self.onmessage = e => {
  console.log('message from main received in worker:', e);
  !canvas && (canvas = e.data.canvas);
  !ctx && (ctx = canvas.getContext('2d', config = { colorSpace: 'display-p3' }));
  e.data.canvasSize && (canvasSize = e.data.canvasSize);
  e.data.h && (h = e.data.h);

  const inP3Gamut = inGamut('p3');
  const inRGBGamut = inGamut('rgb');
  const getColorFromPosition = (x, y) => {
    const l = 1 - (y / canvasSize);
    const c = x / (2.5 * canvasSize);
    const color = { mode: 'oklch', l, c, h };
    if (inRGBGamut(color)) return color;
    if (inP3Gamut(color)) {
      color.alpha = 0.5;
      return color;
    }
    return;
  };

  ctx.clearRect(0, 0, canvasSize, canvasSize);
  for (let y = 0; y < canvasSize; y++) {
    for (let x = 0; x < canvasSize; x++) {
      const bgColor = getColorFromPosition(x, y);
      if (bgColor) {
        ctx.fillStyle = formatCss(bgColor);
        ctx.fillRect(x, y, 1, 1);
      } else {
        x = canvasSize;
      }
    }
  }
  console.log('message from worker sent back to main:', canvas);
  self.postMessage(canvas, [canvas]);
};