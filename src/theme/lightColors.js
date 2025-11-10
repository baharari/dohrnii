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
  shades[9] = rgbToHex(darkColor(rgb, 0.6).r, darkColor(rgb, 0.6).g, darkColor(rgb, 0.6).b);
  shades[8] = rgbToHex(darkColor(rgb, 0.45).r, darkColor(rgb, 0.45).g, darkColor(rgb, 0.45).b);
  shades[7] = rgbToHex(darkColor(rgb, 0.3).r, darkColor(rgb, 0.3).g, darkColor(rgb, 0.3).b);
  shades[6] = rgbToHex(darkColor(rgb, 0.15).r, darkColor(rgb, 0.15).g, darkColor(rgb, 0.15).b);
  shades[5] = baseColor; 
  shades[4] = rgbToHex(adjustColor(rgb, 0.2).r, adjustColor(rgb, 0.2).g, adjustColor(rgb, 0.2).b);
  shades[3] = rgbToHex(adjustColor(rgb, 0.4).r, adjustColor(rgb, 0.4).g, adjustColor(rgb, 0.4).b);
  shades[2] = rgbToHex(adjustColor(rgb, 0.6).r, adjustColor(rgb, 0.6).g, adjustColor(rgb, 0.6).b);
  shades[1] = rgbToHex(adjustColor(rgb, 0.9).r, adjustColor(rgb, 0.9).g, adjustColor(rgb, 0.9).b);
  
  return shades;
};
const primaryShades = generateColorShades('#0091fc');

// Ana renkler ve tonları
const colors = {
  // Ana renkler
  primary: {
    ...primaryShades,
  },
  secondary: {
    ...generateColorShades('#f86810'),
  },
  orange: {
    ...generateColorShades('#f86810'),
  },
  yellow: {
    ...generateColorShades('#f5da29'),
  },
  green: {
    ...generateColorShades('#15a462'),
  },
  blue: {
    ...generateColorShades('#0091fc'),
  },
  purple: {
    ...generateColorShades('#8d4ec6'),
  },
  pink: {
    ...generateColorShades('#ed48b1'),
  },
  red: {
    ...generateColorShades('#e3383e'),
  },
  gray: {
    ...generateColorShades('#364153'),
  },
  
  
  
  // Durum renkleri
  success: {
    ...generateColorShades('#2ecc71'),
    base: '#2ecc71',
  },
  warning: {
    ...generateColorShades('#f39c12'),
    base: '#f39c12',
  },
  error: {
    ...generateColorShades('#e74c3c'),
    base: '#e74c3c',
  },
  info: {
    ...generateColorShades('#3498db'),
    base: '#3498db',
  },
  
  // Sabit renkler
  black: '#000000',
  white: '#FFFFFF',
  overlayColor: '#00000020',
  shadow: '#000000',
  
  // Arka plan renkleri
  background: {
    primary: '#FFFFFF',
    white: '#FFFFFF',
    secondary: '#f9f9f9',
    light: '#f5f5f5',
    dark: '#2c3e50',
  },
  card: {
    backgroundColor: '#ffffff',
  },
  menu: {
    backgroundColor: '#ffffff',
  },
  // Metin renkleri
  text: {
    primary: '#000000',
    black: '#000000',
    white: '#ffffff',
    secondary: '#7f8c8d',
    darkgray: '#494949',
    lightgray: '#969ba1',
    link: '#3498db',
  },
  
  input: {
    solid: {
      backgroundColor: '#f0f0f5',
      borderColor: '#f0f0f5',
      textColor: '#000000',
      placeholderColor: '#adb5bd',
      iconColor: "#868d98"
    },
    outline: {
      backgroundColor: '#ffffff',
      borderColor: '#e9ebf0',
      textColor: '#000000',
      placeholderColor: '#adb5bd',
      iconColor: "#868d98"
    },
    soft: {
      backgroundColor: '#ffffff',
      borderColor: '#e9ebf0',
      textColor: '#000000',
      placeholderColor: '#adb5bd',
      iconColor: "#868d98"
    }
  },
  tabs: {
    solid: {
      backgroundColor: "#ebecee",
      indicatorColor: '#ffffff',
      color: '#ffffff',
    },
    outline: {
      backgroundColor: "#ebecee",
      indicatorColor: primaryShades[5],
      color: '#ffffff',
    }
  },
// Kenarlık renkleri
border: {
  light: '#dfe6e9',
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