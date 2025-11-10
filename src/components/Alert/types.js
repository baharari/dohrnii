import PropTypes from 'prop-types';
import { BUTTON_VARIANTS } from '../Button/constants';
import { THEME_COLOR } from '../../constants/colors';
import { spacing } from '../../constants';

export const AlertPropTypes = {
  // Variant: Button ile aynı
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
  // Tema rengi (Button ile aynı + durum renkleri)
  theme: PropTypes.oneOf([
    ...Object.values(THEME_COLOR)
  ]),
  // Başlık metni veya ReactNode
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  // İkon (ReactNode)
  icon: PropTypes.node,
  // Başlık ve ikon rengi
  color: PropTypes.string,
  // Arkaplan rengi
  bg: PropTypes.string,
  // Köşe yuvarlaklığı
  borderRadius: PropTypes.number,
  // Dış container stili
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // İçerik stili (title + body kapsayıcı)
  contentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // Başlık stili
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export const AlertDefaultProps = {
  variant: BUTTON_VARIANTS.SOFT,
  theme: 'info',
  title: undefined,
  icon: undefined,
  color: undefined,
  bg: undefined,
  borderRadius: spacing.borderRadius.m,
  style: undefined,
  contentStyle: undefined,
  titleStyle: undefined,
};