import { StyleSheet } from 'react-native';

const createStyles = (theme) => {
  const colors = theme?.colors || {};

  // Textarea için nötr (gray) palet bazında varyant şablonları
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
      alignItems: 'flex-start',
    },

    // Dış kutu
    box: {
      borderWidth: 1.5,
      paddingHorizontal: 12,
      paddingVertical: 10,
    },

    // Hazır yükseklikler (textarea için daha büyük)
    smBox: {
      minHeight: 72,
    },
    mdBox: {
      minHeight: 100,
    },
    lgBox: {
      minHeight: 140,
    },

    // Sol/sağ bölüm kapları
    leftSection: {
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    rightSection: {
      marginLeft: 8,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    // TextInput stil
    input: {
      flex: 1,
      color: colors.text?.primary,
      textAlignVertical: 'top', // Android için textarea üstten hizalama,
      paddingTop: 1,
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