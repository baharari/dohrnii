import PropTypes from 'prop-types';

export const ImagePropTypes = {
  // Görsel kaynağı: string (URL), require numarası veya { uri } objesi
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  // src kullanılabilir değilse yedek görsel
  fallbackSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  // Köşe yuvarlaklığı
  borderRadius: PropTypes.number,
  // Boyutlar
  w: PropTypes.number,
  h: PropTypes.number,
  // ResizeMode yerine: cover, contain, stretch, center
  fit: PropTypes.oneOf(['cover', 'contain', 'stretch', 'center']),
};

export const ImageDefaultProps = {
  src: undefined,
  fallbackSrc: undefined,
  borderRadius: 0,
  w: undefined,
  h: undefined,
  fit: 'cover',
};