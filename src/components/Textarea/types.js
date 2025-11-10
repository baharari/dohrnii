import PropTypes from 'prop-types';
import { TEXTAREA_SIZES, TEXTAREA_VARIANTS } from './constants';
import { spacing } from '../../constants';

export const TextareaPropTypes = {
  /**
   * Varyant
   */
  variant: PropTypes.oneOf(Object.values(TEXTAREA_VARIANTS)),

  /**
   * Boyut: sm | md | lg veya sayı (yükseklik/minHeight)
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(TEXTAREA_SIZES)),
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

export const TextareaDefaultProps = {
  variant: TEXTAREA_VARIANTS.SOLID,
  size: TEXTAREA_SIZES.MEDIUM,
  borderRadius: spacing.borderRadius.m,
  leftSection: null,
  rightSection: null,
  label: undefined,
  error: undefined,
};