import { StyleSheet } from 'react-native';

const createStyles = (theme) => {
  const colors = theme?.colors || {};

  // Input için nötr renk temelli varyant şablonları (gray paleti kullanılır)
  const variantTemplates = {
    solid: () => ({
      backgroundColor: colors.input?.solid?.backgroundColor,
      borderColor: colors.input?.solid?.borderColor,
      textColor: colors.input?.solid?.textColor,
      placeholderColor: colors.input?.solid?.placeholderColor,
    }),
    outline: () => ({
      backgroundColor: colors.input?.outline?.backgroundColor,
      borderColor: colors.input?.outline?.borderColor,
      textColor: colors.input?.outline?.textColor,
      placeholderColor: colors.input?.outline?.placeholderColor,
    }),
    ghost: () => ({
      backgroundColor: colors.input?.ghost?.backgroundColor,
      borderColor: 'transparent',
      textColor: colors.input?.ghost?.textColor,
      placeholderColor: colors.input?.ghost?.placeholderColor,
    }),
    soft: () => ({
      backgroundColor: colors.input?.soft?.backgroundColor,
      borderColor: colors.input?.soft?.borderColor,
      textColor: colors.input?.soft?.textColor,
      placeholderColor: colors.input?.soft?.placeholderColor,
    }),
  };

  return StyleSheet.create({
    container: {
      width: '100%',
    },

    fieldRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    // Dış kutu
    box: {
      borderWidth: 1.5,
      paddingHorizontal: 12,
    },

    // Hazır yükseklikler
    smBox: {
      height: 36,
    },
    mdBox: {
      height: 40,
    },
    lgBox: {
      height: 48,
    },

    // Sol/sağ bölüm kapları
    leftSection: {
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightSection: {
      marginLeft: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // TextInput stil (flex ile alan doldurur)
    input: {
      flex: 1,
      color: colors.text?.primary,
    },

    label: {
      marginBottom: 2,
      marginLeft: 10,
      color: colors.text?.lightgray,
    },

    errorText: {
      marginTop: 1,
      marginLeft: 10,
      color: colors.error?.[5],
    },

    disabled: {
      opacity: 0.6,
    },

    // Varyant çözümleyici
    getVariantStyle: (variant) => {
      const fn = variantTemplates[variant];
      return fn ? fn() : {};
    },
  });
};

export default createStyles;