import { StyleSheet } from 'react-native';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './constants';
import { THEME_COLOR } from '../../constants/colors';

const createStyles = (theme) => {
  // Tema yoksa boş bir nesne kullan
  const colors = theme?.colors || {};
  
  // Varyant şablonları - tüm renkler için ortak stil yapıları
  const variantTemplates = {
    [BUTTON_VARIANTS.SOLID]: (colorName) => ({
      backgroundColor: colors[colorName]?.[5],
      borderColor: colors[colorName]?.[5],
      color: colors.white
    }),
    [BUTTON_VARIANTS.OUTLINE]: (colorName) => ({
      backgroundColor: 'transparent',
      borderColor: colors[colorName]?.[5],
      color: colors[colorName]?.[5]
    }),
    [BUTTON_VARIANTS.GHOST]: (colorName) => ({
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: colors[colorName]?.[5]
    }),
    [BUTTON_VARIANTS.SOFT]: (colorName) => ({
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
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1,
    },
 
    // Boyut stilleri
    [BUTTON_SIZES.SMALL]: {
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    [BUTTON_SIZES.MEDIUM]: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    [BUTTON_SIZES.LARGE]: {
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    [BUTTON_VARIANTS.LINK]: {
      paddingHorizontal: 0,
      paddingVertical: 0,
      borderColor: "transparent"
    },
    // Durum stilleri
    disabled: {
      opacity: 0.6,
    },
    
    // İçerik stilleri
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    // Metin stilleri - boyut bazlı
    [BUTTON_SIZES.SMALL + 'Text']: {
      fontSize: 12,
      fontWeight: '600',
    },
    [BUTTON_SIZES.MEDIUM + 'Text']: {
      fontSize: 14,
      fontWeight: '600',
    },
    [BUTTON_SIZES.LARGE + 'Text']: {
      fontSize: 16,
      fontWeight: '600',
    },
    
    // İkon stilleri
    leftIcon: {
      marginRight: 8,
    },
    rightIcon: {
      marginLeft: 8,
    },
    
    // Tip ve varyant kombinasyonları için stil erişim fonksiyonu
    getTypeVariantStyle: (type, variant) => {
      return buttonTypeVariants[type]?.[variant] || {};
    }
  });
};

export default createStyles;