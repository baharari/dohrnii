import PropTypes from 'prop-types';

export const BackgroundImagePropTypes = {
  // Arka plan görsel kaynağı: string (URL), require numarası veya { uri } objesi
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  // Köşe yuvarlaklığı (varsayılan 0)
  borderRadius: PropTypes.number,
  // Dış container stil
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // İçerik (ReactNode)
  children: PropTypes.node,
};

export const BackgroundImageDefaultProps = {
  src: undefined,
  borderRadius: 0,
  style: undefined,
  children: undefined,
};