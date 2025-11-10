import PropTypes from 'prop-types';
import { INPUT_SIZES, INPUT_VARIANTS } from './constants';
import spacing from '../../constants/spacing';


export const InputPropTypes = {
  /**
   * React Native TextInput tüm propsları desteklenir (rest ile iletilir)
   */

  /**
   * Varyant
   */
  variant: PropTypes.oneOf(Object.values(INPUT_VARIANTS)),

  /**
   * Boyut: sm | md | lg veya sayı (yükseklik)
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(INPUT_SIZES)),
    PropTypes.number,
  ]),

  /**
   * Köşe yuvarlaklığı
   */
  borderRadius: PropTypes.number,

  /**
   * Sol bölüm (ReactNode)
   */
  leftSection: PropTypes.node,

  /**
   * Sağ bölüm (ReactNode)
   */
  rightSection: PropTypes.node,

  /**
   * Label metni veya ReactNode
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Hata mesajı (string)
   */
  error: PropTypes.string,

  /**
   * Dış kutu stili
   */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Label stili
   */
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Hata metni stili
   */
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * İç TextInput stili
   */
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export const InputDefaultProps = {
  variant: INPUT_VARIANTS.SOLID,
  size: INPUT_SIZES.MEDIUM,
  borderRadius: spacing.borderRadius.m,
  leftSection: null,
  rightSection: null,
  label: undefined,
  error: undefined,
};