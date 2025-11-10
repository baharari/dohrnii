// Renk tonlarını üretmek için ortak util

// Hex'i RGB'ye çevir
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

// RGB'yi Hex'e çevir
const rgbToHex = (r, g, b) => {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
};

const lighten = (rgb, factor) => ({
  r: rgb.r + (255 - rgb.r) * factor,
  g: rgb.g + (255 - rgb.g) * factor,
  b: rgb.b + (255 - rgb.b) * factor,
});

const darken = (rgb, factor) => ({
  r: rgb.r * (1 - factor),
  g: rgb.g * (1 - factor),
  b: rgb.b * (1 - factor),
});

// mode: 'light' veya 'dark'
export const generateColorShades = (baseColor, mode = 'light') => {
  const rgb = hexToRgb(baseColor);
  const shades = {};

  if (mode === 'dark') {
    // 1 en koyu -> 9 en açık, 5 base
    shades[1] = rgbToHex(...Object.values(darken(rgb, 0.82)));
    shades[2] = rgbToHex(...Object.values(darken(rgb, 0.65)));
    shades[3] = rgbToHex(...Object.values(darken(rgb, 0.35)));
    shades[4] = rgbToHex(...Object.values(darken(rgb, 0.25)));
    shades[5] = baseColor;
    shades[6] = rgbToHex(...Object.values(lighten(rgb, 0.2)));
    shades[7] = rgbToHex(...Object.values(lighten(rgb, 0.4)));
    shades[8] = rgbToHex(...Object.values(lighten(rgb, 0.6)));
    shades[9] = rgbToHex(...Object.values(lighten(rgb, 0.9)));
  } else {
    // light moddaki mevcut algoritmayla uyumlu:
    // 9 daha koyu -> 1 en açık, 5 base
    shades[9] = rgbToHex(...Object.values(darken(rgb, 0.6)));
    shades[8] = rgbToHex(...Object.values(darken(rgb, 0.45)));
    shades[7] = rgbToHex(...Object.values(darken(rgb, 0.3)));
    shades[6] = rgbToHex(...Object.values(darken(rgb, 0.15)));
    shades[5] = baseColor;
    shades[4] = rgbToHex(...Object.values(lighten(rgb, 0.2)));
    shades[3] = rgbToHex(...Object.values(lighten(rgb, 0.4)));
    shades[2] = rgbToHex(...Object.values(lighten(rgb, 0.6)));
    shades[1] = rgbToHex(...Object.values(lighten(rgb, 0.9)));
  }

  return shades;
};

export const buildPaletteFromBaseColors = (baseColors = {}, mode = 'light') => {
  return Object.fromEntries(
    Object.entries(baseColors).map(([name, base]) => [name, generateColorShades(base, mode)])
  );
};