import PropTypes from 'prop-types';
import { BUTTON_SIZES, BUTTON_VARIANTS } from './constants';
import { THEME_COLOR } from '../../constants/colors';
import spacing from '../../constants/spacing';


export const ButtonPropTypes = {
  /**
   * Button içeriği
   */
  label: PropTypes.string,
  
  /**
   * Tıklama olayı
   */
  onPress: PropTypes.func,
  
  /**
   * Button tipi
   */
  theme: PropTypes.oneOf(Object.values(THEME_COLOR)),
  
  /**
   * Button boyutu
   */
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  
  /**
   * Button varyantı
   */
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
  
  /**
   * Devre dışı durumu
   */
  disabled: PropTypes.bool,
  
  /**
   * Yükleniyor durumu
   */
  loading: PropTypes.bool,
  
  /**
   * Özel stil
   */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  
  /**
   * Metin stili
   */
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  
  /**
   * Sol ikon
   */
  leftIcon: PropTypes.element,
  
  /**
   * Sağ ikon
   */
  rightIcon: PropTypes.element,
  
  /**
   * Köşe yuvarlaklığı
   */
  borderRadius: PropTypes.number,

  /**
   * Arkaplan rengi
   */
  bg: PropTypes.string,

  /**
   * Metin rengi
   */
  color: PropTypes.string,

  /**
   * Kenarlık rengi
   */
  borderColor: PropTypes.string,

  /**
   * Font boyutu
   */
  fs: PropTypes.number,
};

export const ButtonDefaultProps = {
  theme: THEME_COLOR.PRIMARY,
  size: BUTTON_SIZES.MEDIUM,
  variant: BUTTON_VARIANTS.SOLID,
  disabled: false,
  loading: false,
  onPress: () => {},
  borderRadius: spacing.borderRadius.m,
};