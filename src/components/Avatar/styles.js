import { StyleSheet } from 'react-native';
import { THEME_COLOR } from '../../constants/colors';

const createStyles = (theme) => {
  const colors = theme?.colors || {};
  const typography = theme?.typography || {};

  // Varyant şablonları - tüm renkler için ortak stil yapıları
  const variantTemplates = {
    solid: (colorName) => ({
      backgroundColor: colors[colorName]?.[5],
      borderColor: colors[colorName]?.[5],
      color: colors.white
    }),
    outline: (colorName) => ({
      backgroundColor: 'transparent',
      borderColor: colors[colorName]?.[5],
      color: colors[colorName]?.[5]
    }),
    ghost: (colorName) => ({
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: colors[colorName]?.[5]
    }),
    soft: (colorName) => ({
      backgroundColor: colors[colorName]?.[1],
      borderColor: colors[colorName]?.[1],
      color: colors[colorName]?.[7]
    })
  };

  // Dinamik olarak tüm renk ve varyant kombinasyonlarını oluştur
  const buttonTypeVariants = {};

  // THEME_COLOR içindeki her renk için
  Object.values(THEME_COLOR).forEach(colorName => {
    buttonTypeVariants[colorName] = {};

    // Her varyant için stil oluştur
    Object.entries(variantTemplates).forEach(([variantName, styleGenerator]) => {
      buttonTypeVariants[colorName][variantName] = styleGenerator(colorName);
    });
  });

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      backgroundColor: colors?.backgroundSecondary || '#00000010',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    // Metin/ikon için genel içerik stili (children varsa)
    content: {
      color: colors?.text?.primary || '#000',
      fontSize: typography?.fontSize?.m || 16,
    },
    // Tip ve varyant kombinasyonları için stil erişim fonksiyonu
  getTypeVariantStyle: (type, variant) => {
    return buttonTypeVariants[type]?.[variant] || {};
  }
});
};


export default createStyles;