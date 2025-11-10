import React, { useMemo } from 'react';
import { Image as RNImage } from 'react-native';
import { useTheme } from '../../providers';
import createStyles from './styles';
import { ImagePropTypes, ImageDefaultProps } from './types';

const normalizeSource = (src) => {
  if (!src) return undefined;
  if (typeof src === 'string') {
    const trimmed = src.trim();
    return trimmed.length === 0 ? undefined : { uri: trimmed };
  }
  return src;
};

const Image = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles(themeMode);

  const {
    src,
    fallbackSrc,
    borderRadius,
    w,
    h,
    fit,
    ...rest
  } = { ...ImageDefaultProps, ...props };

  const primarySource = normalizeSource(src);
  const backupSource = normalizeSource(fallbackSrc);
  const source = useMemo(() => primarySource ?? backupSource, [primarySource, backupSource]);

  if (!source) {
    // Hiçbir kaynak yoksa render etme (isteğe bağlı olarak boş View döndürülebilir)
    return null;
  }

  return (
    <RNImage
      source={source}
      style={[
        styles.image,
        w !== undefined && { width: w },
        h !== undefined && { height: h },
        borderRadius !== undefined && { borderRadius },
      ]}
      resizeMode={fit}
      {...rest}
    />
  );
};

Image.propTypes = ImagePropTypes;

export default Image;