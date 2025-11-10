import { create } from '../../theme';

const createStyles = (theme) => {
  const { colors } = theme || {};
  const variantTemplates = {
    solid: (colorName) => ({
      tab: {
        backgroundColor: colors[colorName]?.[1],
        color: colors[colorName]?.[5],
      },
      text: {
        color: colors?.text?.white,
      },
    }),
    outline: (colorName) => ({
      tab: {
        backgroundColor: colors[colorName]?.[1],
        color: colors[colorName]?.[5],
      },
      text: {
        color: colors?.text?.primary,
      },
    }),
  };

  return create({
    container: {
      // Tabs root container
      width: '100%',
      alignItems: "flex-start",
    },
    list: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
    },
    tabBase: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    tabInnerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabText: {
      color: colors?.text?.primary,
    },
    tabDisabled: {
      opacity: 0.6,
    },
    indicator: {
      marginTop: 6,
      height: 3,
      width: '100%',
      borderRadius: 2,
      backgroundColor: colors?.gray?.[5],
    },
    panels: {
      marginTop: 12,
      width: '100%'
    },
    panel: {
      // user style + defaults
    },

    getVariant: (variant, colorName) => {
      const fn = variantTemplates[variant];
      return fn ? fn(colorName) : variantTemplates.solid(colorName);
    },
  });
};

export default createStyles;