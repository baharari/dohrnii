import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import Text from '../Text/Text';
import { AvatarPropTypes, AvatarDefaultProps } from './types';

const Avatar = (props) => {
  const { theme: themeMode } = useTheme();
  
  const {
    src,
    backgroundColor,
    color,
    borderRadius,
    borderColor,
    fontSize=16,
    size,
    style,
    theme="primary",
    variant="solid",
    children,
    ...rest
  } = { ...AvatarDefaultProps, ...props };
  
  
  const styles = createStyles(themeMode);
  
  const typeVariantStyle = styles.getTypeVariantStyle(theme, variant);
  
  const resolvedBg = processColorValue(backgroundColor ?? typeVariantStyle.backgroundColor);
  
  // src belirleme: string ise远端 url olarak kabul edilir
  const imageSource =
  typeof src === 'string'
  ? { uri: src }
  : src;
  
  const containerStyle = [
    styles.container,
    {
      width: size,
      height: size,
      borderRadius,
      backgroundColor: resolvedBg,
      borderWidth: imageSource ? 0 : 1,
      borderColor: processColorValue(borderColor ?? typeVariantStyle.borderColor),
    },
    style,
  ];
  
  return (
    <View style={containerStyle} {...rest}>
    {children ? (
      // Çocuk (ReactNode) varsa src devre dışı kalır
      typeof children === 'string' ? (
        <Text fontWeight="600" fontSize={fontSize} style={{ color: processColorValue(color ?? typeVariantStyle.color) }}>
        {children}
        </Text>
      ) : (
        children
      )
    ) : (
      // src varsa görseli göster, yoksa sadece arkaplan görünür
      imageSource ? <Image source={imageSource} style={[styles.image]} /> : null
    )}
    </View>
  );
};

Avatar.propTypes = AvatarPropTypes;

export default Avatar;