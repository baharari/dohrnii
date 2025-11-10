import { StyleSheet } from 'react-native';
import { lightTheme, darkTheme } from '../constants/themes';

// Geçerli temayı burada saklayacağız
let currentTheme = lightTheme;

// Temayı güncellemek için fonksiyon
export const updateThemeForStyles = (theme) => {
  currentTheme = theme;
};

// Renk değerini işleyen yardımcı fonksiyon
export const processColorValue = (value) => {
  if (!value || typeof value !== 'string') return value;
  
  // Eğer renk değeri "primary.1" formatındaysa
  if (value.includes('.')) {
    const [colorName, shade] = value.split('.');
    return currentTheme?.colors?.[colorName]?.[parseInt(shade)] || value;
  }
  
  // Eğer renk değeri sadece "primary" gibi bir isimse (varsayılan 5. ton)
  if (typeof currentTheme?.colors?.[value]?.[5] === 'string') {
    return currentTheme.colors[value][5];
  }
  
  // Diğer durumlarda değeri olduğu gibi döndür
  return value;
};

// Stil nesnesindeki tüm renk özelliklerini işle
const processStyleObject = (styleObj) => {
  if (!styleObj || typeof styleObj !== 'object') return styleObj;
  
  const processedStyle = {};
  
  // Stil nesnesindeki her özelliği kontrol et
  Object.keys(styleObj).forEach(key => {
    const value = styleObj[key];
    
    // Eğer değer bir nesne ise, recursive olarak işle
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      processedStyle[key] = processStyleObject(value);
    }
    // Eğer bu bir renk özelliği ise ve string ise
    else if (
      typeof value === 'string' && 
      (key.includes('Color') || key === 'backgroundColor' || key === 'borderColor' || 
       key === 'color' || key === 'tintColor' || key === 'shadowColor')
    ) {
      processedStyle[key] = processColorValue(value);
    } 
    // Diğer durumlarda değeri olduğu gibi kullan
    else {
      processedStyle[key] = value;
    }
  });
  
  return processedStyle;
};

// StyleSheet.create'i genişleten kendi create fonksiyonumuz
export const create = (styles) => {
  const processedStyles = {};
  
  // Her stil nesnesini işle
  Object.keys(styles).forEach(key => {
    processedStyles[key] = processStyleObject(styles[key]);
  });
  
  // Orijinal StyleSheet.create'i kullanarak stil nesnelerini oluştur
  return StyleSheet.create(processedStyles);
};

// Genişletilmiş StyleSheet nesnesini dışa aktar
export default {
  ...StyleSheet,
  create,
};