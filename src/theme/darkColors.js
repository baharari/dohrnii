/**
 * Tema renk sistemi
 * Her renk için 9 farklı ton (1-9)
 * 5. ton ana renk olarak kullanılır
 */

// Renk tonlarını oluşturan yardımcı fonksiyon
const generateColorShades = (baseColor) => {
  // Hex renk kodunu RGB'ye dönüştür
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  // RGB'yi Hex'e dönüştür
  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b]
      .map(x => {
        const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');
  };

  // Rengi açıklaştır veya koyulaştır
  const adjustColor = (rgb, factor) => {
    return {
      r: rgb.r + (255 - rgb.r) * factor,
      g: rgb.g + (255 - rgb.g) * factor,
      b: rgb.b + (255 - rgb.b) * factor
    };
  };

  const darkColor = (rgb, factor) => {
    return {
      r: rgb.r * (1 - factor),
      g: rgb.g * (1 - factor),
      b: rgb.b * (1 - factor)
    };
  };

  const rgb = hexToRgb(baseColor);
  const shades = {};

  // 9 farklı ton oluştur (1: en koyu, 9: en açık)
  // 5. ton ana renk olacak
  shades[1] = rgbToHex(darkColor(rgb, 0.82).r, darkColor(rgb, 0.82).g, darkColor(rgb, 0.82).b);
  shades[2] = rgbToHex(darkColor(rgb, 0.65).r, darkColor(rgb, 0.65).g, darkColor(rgb, 0.65).b);
  shades[3] = rgbToHex(darkColor(rgb, 0.35).r, darkColor(rgb, 0.35).g, darkColor(rgb, 0.35).b);
  shades[4] = rgbToHex(darkColor(rgb, 0.25).r, darkColor(rgb, 0.25).g, darkColor(rgb, 0.25).b);
  shades[5] = baseColor; 
  shades[6] = rgbToHex(adjustColor(rgb, 0.2).r, adjustColor(rgb, 0.2).g, adjustColor(rgb, 0.2).b);
  shades[7] = rgbToHex(adjustColor(rgb, 0.4).r, adjustColor(rgb, 0.4).g, adjustColor(rgb, 0.4).b);
  shades[8] = rgbToHex(adjustColor(rgb, 0.6).r, adjustColor(rgb, 0.6).g, adjustColor(rgb, 0.6).b);
  shades[9] = rgbToHex(adjustColor(rgb, 0.9).r, adjustColor(rgb, 0.9).g, adjustColor(rgb, 0.9).b);

  return shades;
};


const themeColors = {
  primary: '#0091fc',
  secondary: '#f86810',
  orange: '#f86810',
  yellow: '#f5da29',
  green: '#15a462',
  blue: '#0091fc',
  purple: '#8d4ec6',
  pink: '#ed48b1',
  red: '#e3383e',
  gray: '#364153',
  // Durum renkleri
  success: '#2ecc71',
  warning: '#f39c12',
  error: '#e74c3c',
  info: '#3498db',
}
const dynamicShades = Object.fromEntries(
  Object.entries(themeColors).map(([name, base]) => [name, generateColorShades(base)])
);
// Ana renkler ve tonları
const colors = {
  // Ana renkler
  
  ...dynamicShades,

  // Sabit renkler
  black: '#ffffff',
  white: '#000000',
  overlayColor: '#ffffff10',
  shadow: '#000000',

  // Arka plan renkleri
  background: {
    primary: '#0a0a0a',
    white: '#000000',
    secondary: '#000000',
    light: '#181819',
    dark: '#2c3e50',
  },

  card: {
    backgroundColor: '#121213',
  },
  menu: {
    backgroundColor: '#171719',
  },

  // Metin renkleri
  text: {
    primary: '#ffffff',
    black: '#ffffff',
    white: '#000000',
    secondary: '#7f8c8d',
    darkgray: '#aeaeae',
    lightgray: '#969ba1',
    link: '#3498db',
  },

  input: {
    solid: {
      backgroundColor: '#28282a',
      borderColor: '#28282a',
      textColor: '#ffffff',
      placeholderColor: '#5d5d5d',
      iconColor: "#868686"
    },
    outline: {
      backgroundColor: '#121213',
      borderColor: '#393939',
      textColor: '#ffffff',
      placeholderColor: '#5d5d5d',
      iconColor: "#868686"
    },
    soft: {
      backgroundColor: '#121213',
      borderColor: '#393939',
      textColor: '#ffffff',
      placeholderColor: '#5d5d5d',
      iconColor: "#868686"
    }
  },
  tabs: {
    solid: {
      backgroundColor: "#1d1d1e",
      indicatorColor: '#0a0a0a',
      color: '#ffffff',
    },
    outline: {
      backgroundColor: "#39393d",
      indicatorColor: themeColors.primary,
      color: '#ffffff',
    }
  },
  // Kenarlık renkleri
  border: {
    light: '#202022',
    medium: '#b2bec3',
    dark: '#636e72',
  },

  // Gölge renkleri
  /* shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.2)',
    dark: 'rgba(0, 0, 0, 0.3)',
  }, */
};

export default colors;