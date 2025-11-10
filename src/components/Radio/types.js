import PropTypes from 'prop-types';
import { THEME_COLOR } from '../../constants/colors';
import { RADIO_SIZES, RADIO_VARIANTS } from './constants';
import { spacing } from '../../constants';

export const RadioPropTypes = {
  /**
   * Seçili durumu (grup dışı kullanımda)
   */
  checked: PropTypes.bool,

  /**
   * Radio değeri (grup içinde zorunlu)
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /**
   * Grup dışı kullanımda değişim fonksiyonu (checked true olduğunda çağrılır)
   */
  onChange: PropTypes.func,

  /**
   * Label metni veya ReactNode
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Tema rengi
   */
  theme: PropTypes.oneOf(Object.values(THEME_COLOR)),

  /**
   * Boyut: sm | md | lg veya sayı (çap)
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(RADIO_SIZES)),
    PropTypes.number,
  ]),

  /**
   * Varyant
   */
  variant: PropTypes.oneOf(Object.values(RADIO_VARIANTS)),

  /**
   * Devre dışı
   */
  disabled: PropTypes.bool,

  /**
   * Köşe yuvarlaklığı (dış kutuya uygulanır)
   */
  borderRadius: PropTypes.number,

  /**
   * Kullanıcı tarafından verilecek icon (checked olduğunda gösterilir)
   */
  icon: PropTypes.node,

  /**
   * Stil prop'ları
   */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export const RadioDefaultProps = {
  checked: false,
  onChange: () => {},
  theme: THEME_COLOR.PRIMARY,
  size: RADIO_SIZES.MEDIUM,
  variant: RADIO_VARIANTS.SOLID,
  disabled: false,
  borderRadius: undefined,
  icon: null,
};

export const RadioGroupPropTypes = {
  /**
   * Grup başlığı (string veya ReactNode)
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Açıklama (string veya ReactNode)
   */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Grup ikonu (verilirse tüm Radio’lara uygulanır, Radio kendi icon'u varsa o önceliklidir)
   */
  icon: PropTypes.node,

  /**
   * Tema rengi
   */
  theme: PropTypes.oneOf(Object.values(THEME_COLOR)),

  /**
   * Boyut: sm | md | lg veya number
   */
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(RADIO_SIZES)),
    PropTypes.number,
  ]),

  /**
   * Varyant
   */
  variant: PropTypes.oneOf(Object.values(RADIO_VARIANTS)),

  /**
   * Devre dışı
   */
  disabled: PropTypes.bool,

  /**
   * Köşe yuvarlaklığı
   */
  borderRadius: PropTypes.number,

  /**
   * Değer kontrolü
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,

  /**
   * Çocuklar
   */
  children: PropTypes.node,

  /**
   * Stil prop'ları
   */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  descriptionStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export const RadioGroupDefaultProps = {
  label: undefined,
  description: undefined,
  icon: null,
  theme: THEME_COLOR.PRIMARY,
  size: RADIO_SIZES.MEDIUM,
  variant: RADIO_VARIANTS.SOLID,
  disabled: false,
  borderRadius: spacing.borderRadius.round,
  value: undefined,
  onChange: () => {},
};