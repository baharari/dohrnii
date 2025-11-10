/**
 * Text bileşeni için sabitler
 */

// Text boyutları
export const TEXT_SIZES = {
  XXS: 'xxs',
  XS: 'xs',
  S: 's',
  M: 'm',
  L: 'l',
  XL: 'xl',
  XXL: 'xxl',
  XXXL: 'xxxl',
  DISPLAY: 'display',
  GIANT: 'giant',
};

// Font aileleri
export const TEXT_FONT_FAMILIES = {
  HEADING: 'heading',
  BODY: 'body',
  NUMBER: 'number',
};

// Text boyutları için varsayılan stil değerleri
export const TEXT_SIZE_STYLES = {
  [TEXT_SIZES.XXS]: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
  },
  [TEXT_SIZES.XS]: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  [TEXT_SIZES.S]: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  [TEXT_SIZES.M]: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  [TEXT_SIZES.L]: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
  },
  [TEXT_SIZES.XL]: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
  },
  [TEXT_SIZES.XXL]: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 36,
  },
  [TEXT_SIZES.XXXL]: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 42,
  },
  [TEXT_SIZES.DISPLAY]: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 48,
  },
  [TEXT_SIZES.GIANT]: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 54,
  },
};