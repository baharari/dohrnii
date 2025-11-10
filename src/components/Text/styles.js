import { StyleSheet } from 'react-native';
import { TEXT_FONT_FAMILIES } from './constants';

/**
 * Text bileşeni için stil oluşturucu fonksiyon
 */
export const createStyles = (theme) => {

  return StyleSheet.create({
    // Temel metin stili
    text: {
      color: theme.theme.colors.text.primary,
      // fontFamily çözümü Text.js'de yapılır
    },
  });
};

export default createStyles;