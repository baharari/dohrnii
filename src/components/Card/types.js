import PropTypes from 'prop-types';
import { spacing } from '../../constants';

export const CardPropTypes = {
  // Dış container stil
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // Shadow preset (varsayılan md). Ekstra presetler: none, sm, md, lg
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  // Shadow özelleştirmeleri
  shadowColor: PropTypes.string,
  shadowOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  shadowOpacity: PropTypes.number,
  shadowRadius: PropTypes.number,
  // Köşe yuvarlaklığı
  borderRadius: PropTypes.number,
  // Padding yardımcıları
  p: PropTypes.number,
  px: PropTypes.number,
  py: PropTypes.number,
  bg: PropTypes.string,
  // İçerik (ReactNode)
  children: PropTypes.node,
};

export const CardDefaultProps = {
  style: undefined,
  shadow: 'md',
  // Kullanıcı geçmediği sürece preset'ten gelsin diye undefined yapıldı
  shadowColor: undefined,
  shadowOffset: undefined,
  shadowOpacity: undefined,
  shadowRadius: undefined,
  borderRadius: spacing.borderRadius.m,
  p: 12,
  px: 12,
  py: 12,
  children: undefined,
};