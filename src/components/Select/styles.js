import { StyleSheet } from 'react-native';

const createStyles = (theme) => {
  const colors = theme?.colors || {};

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

    box: {
      borderWidth: 1.5,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },

    smBox: {
      height: 36,
    },
    mdBox: {
      height: 40,
    },
    lgBox: {
      height: 48,
    },

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

    valueText: {
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

    dropdown: {
      marginTop: 4,
      backgroundColor: colors.white || '#fff',
      borderTopLeftRadius: theme?.spacing?.borderRadius?.m * 3 || 8,
      borderTopRightRadius: theme?.spacing?.borderRadius?.m * 3 || 8,
      overflow: 'hidden',
      paddingTop: 18,
      paddingBottom: 32,
    },

    dropdownItem: {
      paddingVertical: 10,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    dropdownItemActive: {
      backgroundColor: colors.primary?.[1],
    },

    dropdownItemText: {
      color: colors.text?.primary,
    },
    dropdownItemActiveText: {
      color: colors.primary?.[5],
    },
    disabled: {
      opacity: 0.6,
    },

    getVariantStyle: (variant) => {
      const fn = variantTemplates[variant];
      return fn ? fn() : {};
    },
  });
};

export default createStyles;