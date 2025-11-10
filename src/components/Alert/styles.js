import { create } from '../../theme';
import { BUTTON_VARIANTS } from '../Button/constants';
import { THEME_COLOR } from '../../constants/colors';

const createStyles = (theme) => {
  const colors = theme?.colors || {};

  const variantTemplates = {
    [BUTTON_VARIANTS.SOLID]: (colorName) => ({
      backgroundColor: colors[colorName]?.[5],
      borderColor: colors[colorName]?.[5],
      color: colors.white,
    }),
    [BUTTON_VARIANTS.OUTLINE]: (colorName) => ({
      backgroundColor: 'transparent',
      borderColor: colors[colorName]?.[5],
      color: colors[colorName]?.[5],
    }),
    [BUTTON_VARIANTS.GHOST]: (colorName) => ({
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: colors[colorName]?.[5],
    }),
    [BUTTON_VARIANTS.SOFT]: (colorName) => ({
      backgroundColor: colors[colorName]?.[1],
      borderColor: colors[colorName]?.[1],
      color: colors[colorName]?.[7],
    }),
  };

  const alertTypeVariants = {};
  const supportedThemes = Object.values(THEME_COLOR);

  supportedThemes.forEach((colorName) => {
    alertTypeVariants[colorName] = {};
    Object.entries(variantTemplates).forEach(([variantName, styleGenerator]) => {
      alertTypeVariants[colorName][variantName] = styleGenerator(colorName);
    });
  });


  return create({
    container: {
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 12,
    },
    iconBox: {
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'flex-start',
      minWidth: 20,
    },
    contentBox: {
      flex: 1,
    },
    titleText: {
      fontWeight: '600',
      marginBottom: 4,
    },
    bodyText: {
      // varsayılan metin rengi theme.text.primary üzerinden işlenir (component içinde verilir)
    },
    getTypeVariantStyle: (type, variant) => {
      return alertTypeVariants[type]?.[variant] || {};
    },
  });
};

export default createStyles;