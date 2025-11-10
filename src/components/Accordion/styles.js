import { StyleSheet } from 'react-native';

const createStyles = (theme) => {
  const spacing = theme?.spacing || {};
  const colors = theme?.colors || {};
  const typography = theme?.typography || {};

  const surface = colors?.background?.light;
  const divider = colors?.border?.light;
  const textPrimary = colors?.text?.primary;

  return {
    base: StyleSheet.create({
      container: {
        width: '100%',
      },
      item: {
        overflow: 'hidden',
        backgroundColor: 'transparent',
      },
      chevron: {
        width: 14,
        height: 14,
        tintColor: theme.name === "light" ? colors?.gray[2] : colors?.gray[6],
      },
      controlBase: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing?.m || 12,
        paddingVertical: spacing?.s || 10,
      },
      controlText: {
        color: textPrimary,
        fontSize: typography?.fontSize?.m || 16,
        fontWeight: '500',
      },
      panelBase: {
        paddingHorizontal: spacing?.m || 12,
        paddingVertical: spacing?.s || 10,
      },
      disabled: {
        opacity: 0.5,
      },
    }),

    // Varyant bazlı stilleri döndür
    getVariant(variant) {
      switch (variant) {
        case 'solid':
          return {
            item: { backgroundColor: surface, borderWidth: 0, marginBottom: 4 },
            control: {},
            panel: {},
          };
        case 'outline':
          return {
            item: { backgroundColor: 'transparent', borderWidth: 1, borderColor: divider, marginBottom: 4 },
            control: {},
            panel: {},
          };
        case 'soft':
          return {
            item: { backgroundColor: "transparent", borderWidth: 0 },
            control: {},
            panel: {},
            activeItem: { backgroundColor: surface, },
          };
        case 'ghost':
          return {
            item: { backgroundColor: 'transparent', borderWidth: 0 },
            control: {},
            panel: {},
          };
        case 'default':
        default:
          return {
            item: { backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: divider, },
            control: {},
            panel: {},
          };
      }
    },
  };
};

export default createStyles;