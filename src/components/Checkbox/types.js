import PropTypes from 'prop-types';
import { THEME_COLOR } from '../../constants/colors';
import { CHECKBOX_SIZES, CHECKBOX_VARIANTS } from './constants';
import { spacing } from '../../constants';

export const CheckboxPropTypes = {
  /**
   * Seçili durumu
   */
  checked: PropTypes.bool,

  /**
   * Değer değişimi
   */
  onChange: PropTypes.func,

  /**
   * Tema rengi
   */
  theme: PropTypes.oneOf(Object.values(THEME_COLOR)),

  /**
   * Boyut
   */
  size: PropTypes.oneOf(Object.values(CHECKBOX_SIZES)),

  /**
   * Varyant
   */
  variant: PropTypes.oneOf(Object.values(CHECKBOX_VARIANTS)),

  /**
   * Devre dışı
   */
  disabled: PropTypes.bool,

  /**
   * Label metni
   */
  label: PropTypes.string,

  /**
   * Label stili
   */
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Kutu stili
   */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Kenar yuvarlaklığı
   */
  borderRadius: PropTypes.number,

  /**
   * Kullanıcı tarafından verilecek icon elemanı (örn. <Image/>, <Svg/> veya herhangi bir React node)
   */
  icon: PropTypes.node,
};

export const CheckboxDefaultProps = {
  checked: false,
  onChange: () => {},
  theme: THEME_COLOR.PRIMARY,
  size: CHECKBOX_SIZES.MEDIUM,
  variant: CHECKBOX_VARIANTS.SOLID,
  disabled: false,
  borderRadius: spacing.borderRadius.xs,
  icon: null,
};