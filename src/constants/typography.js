/**
 * Uygulama genelinde kullanılan tipografi sabitleri
 */
export default {
  // Font aileleri (kategori bazlı, tüketen uygulama doldurur)
  fontFamily: {
    heading: {},
    body: {},
    number: {},
  },
  
  // Ağırlığa göre font aileleri (tüketen uygulama doldurur)
  // Örn. Inter için tüketen app kendi temasında:
  // '400': Platform.select({ ios: 'Inter', android: 'Inter-Regular' }),
  // '500': Platform.select({ ios: 'Inter', android: 'Inter-Medium' }),
  // '600': Platform.select({ ios: 'Inter', android: 'Inter-SemiBold' }),
  // '700': Platform.select({ ios: 'Inter', android: 'Inter-Bold' }),
  fontFamilyByWeight: {},
  
  // Kategori bazlı varsayılan font ağırlıkları
  defaultFontWeight: {
    heading: '600',
    body: '400',
    number: '400',
  },
  
  // Font ağırlıkları
  fontWeight: {
    thin: '100',
    ultraLight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
    black: '900',
  },
  
  // Font stilleri
  fontStyle: {
    normal: 'normal',
    italic: 'italic',
  },
  
  // Font boyutları
  fontSize: {
    xxs: 8,
    xs: 10,
    s: 12,
    m: 14,
    l: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
    display: 28,
    giant: 34,
  },
  
  // Satır yükseklikleri
  lineHeight: {
    xxs: 12,
    xs: 16,
    s: 18,
    m: 22,
    l: 26,
    xl: 28,
    xxl: 32,
    xxxl: 38,
    display: 42,
    giant: 50,
  },
  
  // Metin dönüşümleri
  textTransform: {
    none: 'none',
    capitalize: 'capitalize',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
  },
  
  // Metin dekorasyonları
  textDecoration: {
    none: 'none',
    underline: 'underline',
    lineThrough: 'line-through',
  },
};