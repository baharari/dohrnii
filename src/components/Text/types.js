import PropTypes from 'prop-types';
import { TEXT_SIZES, TEXT_FONT_FAMILIES } from './constants';

/**
 * Text bileşeni için prop tipleri
 */
export const TextPropTypes = {
  // Metin içeriği
  children: PropTypes.node,
  
  // Stil özellikleri
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  
  // Font boyutu (doğrudan sayısal değer)
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  // Font ağırlığı
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // Font ailesi
  fontFamily: PropTypes.oneOf(Object.values(TEXT_FONT_FAMILIES)),
  
  // Satır yüksekliği
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  
  // Metin rengi
  color: PropTypes.string,
  
  // Önceden tanımlanmış boyut
  size: PropTypes.oneOf(Object.values(TEXT_SIZES)),
  
  // React Native Text bileşeninin diğer özellikleri
  numberOfLines: PropTypes.number,
  ellipsizeMode: PropTypes.oneOf(['head', 'middle', 'tail', 'clip']),
  onPress: PropTypes.func,
  selectable: PropTypes.bool,
  textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
  align: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
};

/**
 * Text bileşeni için varsayılan değerler
 */
export const TextDefaultProps = {
  size: TEXT_SIZES.M,
  color: 'text.primary',
  fontFamily: TEXT_FONT_FAMILIES.BODY,
};