import { StyleSheet } from 'react-native';

const createStyles = (theme) => {
  const colors = theme?.colors || {};

  // Varyant şablonları (checked durumu için)
  const variantTemplates = {
    solid: (colorName) => ({
      backgroundColor: colors[colorName]?.[5],
      borderColor: colors[colorName]?.[5],
      color: colors.white,
    }),
    outline: (colorName) => ({
      backgroundColor: 'transparent',
      borderColor: colors[colorName]?.[5],
      color: colors[colorName]?.[5],
    }),
    // ghost'u soft ile aynı yapıyoruz ve colorName parametresi ekliyoruz
    ghost: (colorName) => ({
      backgroundColor: colors[colorName]?.[1],
      borderColor: colors[colorName]?.[1],
      color: colors[colorName]?.[7],
    }),
    soft: (colorName) => ({
      backgroundColor: colors[colorName]?.[1],
      borderColor: colors[colorName]?.[1],
      color: colors[colorName]?.[7],
    }),
  };

  // Seçili olmayan (unchecked) durum için şablonlar
  const uncheckedVariantTemplates = {
    solid: (colorName) => ({
      backgroundColor: 'transparent',
      borderColor: colors[colorName]?.[1],
    }),
    outline: (colorName) => ({
      backgroundColor: 'transparent',
      borderColor: colors[colorName]?.[1],
    }),
    // ghost'u soft ile aynı yapıyoruz ve colorName parametresi ekliyoruz
    ghost: (colorName) => ({
      backgroundColor: colors[colorName]?.[1],
      borderColor: colors[colorName]?.[1],
    }),
    soft: (colorName) => ({
      backgroundColor: colors[colorName]?.[1],
      borderColor: colors[colorName]?.[1],
    }),
  };

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    box: {
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
    },
    smBox: {
      width: 16,
      height: 16,
    },
    mdBox: {
      width: 20,
      height: 20,
    },
    lgBox: {
      width: 24,
      height: 24,
    },
    label: {
      marginLeft: 8,
      color: colors?.text?.primary,
    },
    disabled: {
      opacity: 0.6,
    },

    // Varyant ve type (renk adı) çözüm fonksiyonları
    getTypeVariantStyle: (type, variant) => {
      const fn = variantTemplates[variant];
      return fn ? fn(type) : {};
    },
    getUncheckedStyle: (type, variant) => {
      const fn = uncheckedVariantTemplates[variant];
      return fn ? fn(type) : {};
    },
  });
};

export default createStyles;