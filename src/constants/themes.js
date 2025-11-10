import colors from './colors';
import spacing from './spacing';
import typography from './typography';
import lightColors from '../theme/lightColors';
import darkColors from '../theme/darkColors';
import { buildPaletteFromBaseColors } from '../theme/colorUtils';
import { extendThemeColorConstants } from './colors';

// Basit derin birleşim yardımcıları
const isPlainObject = (val) => val && typeof val === 'object' && !Array.isArray(val);
const deepMerge = (target, source) => {
  const out = { ...target };
  Object.keys(source || {}).forEach((key) => {
    const sVal = source[key];
    const tVal = out[key];
    if (isPlainObject(sVal) && isPlainObject(tVal)) {
      out[key] = deepMerge(tVal, sVal);
    } else {
      out[key] = sVal;
    }
  });
  return out;
};
const deepMergeMany = (...objs) => objs.reduce((acc, cur) => deepMerge(acc, cur || {}), {});

// Mod bazlı tema üretim fonksiyonu
const buildModeTheme = (mode, cfg = {}) => {
  const basePalette = mode === 'dark' ? darkColors : lightColors;
  extendThemeColorConstants(cfg.themeColors || {});
  // Kullanıcının themeColors'ı için dinamik tonlar üret
  const dynamicShades = buildPaletteFromBaseColors(cfg.themeColors || {}, mode);

  // Renkleri birleşir: defaults -> dinamik tonlar -> kullanıcı colors override
  const mergedColors = deepMergeMany(
    { ...colors, ...basePalette },   // varsayılanlar
    dynamicShades,                   // kullanıcı base renkleri ve yeni renkler (brand, teal vb.)
    cfg.colors || {}                 // komponent bazlı override'lar
  );

  return {
    name: mode,
    colors: mergedColors,
    spacing,
    typography,
  };
};

// İstenen dış API: CreateTheme({ light: {...}, dark: {...} })
export const CreateTheme = (config = {}) => {
  const light = buildModeTheme('light', config.light || {});
  const dark = buildModeTheme('dark', config.dark || {});
  return { light, dark };
};

/**
 * Varsayılan tema
 */
export const lightTheme = {
  name: 'light',
  colors: {
    ...lightColors, // 9 tonlu renk sistemini ekliyoruz
  },
  spacing,
  typography,
};

/**
 * Koyu tema
 */
export const darkTheme = {
  name: 'dark',
  colors: {
    ...darkColors, // 9 tonlu renk sistemini ekliyoruz
  },
  spacing,
  typography,
};

export default {
  light: lightTheme,
  dark: darkTheme,
  CreateTheme,
};