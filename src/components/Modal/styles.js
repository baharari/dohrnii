import { StyleSheet } from 'react-native';

const createStyles = (theme) => {
  const spacing = theme?.spacing || {};
  const colors = theme?.colors || {};
  const typography = theme?.typography || {};

  return StyleSheet.create({
    root: {
      flex: 1,
    },

    // Modal içinde overlay kaplama
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colors?.overlayColor,
    },

    // İçeriğin yerleşeceği kapsayıcılar
    centerWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing?.m || 12,
    },

    drawerWrapper: {
      flex: 1,
      padding: 0,
    },

    // İçerik kutusu
    contentBase: {
      backgroundColor: colors?.white,
      overflow: 'hidden',
      // borderRadius komponent içinde atanır
      // genişlik/yükseklik içerik tarafından belirlenir
    },

    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 12,
    },

    title: {
      color: colors?.text?.primary || '#000',
      fontSize: typography?.fontSize?.m || 14,
      fontWeight: '500',
    },

    closeButton: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: (spacing?.borderRadius?.s || 8),
      backgroundColor: colors.background.light
    },
  });
};

export default createStyles;