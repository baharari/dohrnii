import PropTypes from 'prop-types';
import { BUTTON_VARIANTS } from '../Button/constants';
import { THEME_COLOR } from '../../constants/colors';
import { spacing } from '../../constants';

export const AvatarPropTypes = {
  // Görsel kaynağı: string (远端 url), require numarası veya { uri } objesi
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  // Arkaplan rengi (token veya hex)
  color: PropTypes.string,
  // Köşe yuvarlaklığı
  borderRadius: PropTypes.number,
  // Boyut: genişlik = yükseklik = size
  size: PropTypes.number,
  // Dış container stil
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // İçerik (ReactNode). Varsa src devre dışı kalır.
  children: PropTypes.node,
  theme: PropTypes.oneOf(Object.values(THEME_COLOR)),
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
  borderColor: PropTypes.string,
};

export const AvatarDefaultProps = {
  src: undefined,
  color: undefined,
  borderRadius: spacing.borderRadius.round,
  size: 38,
  style: undefined,
  children: undefined,
};