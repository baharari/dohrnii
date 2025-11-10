import React from 'react';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import Text from '../Text/Text';
import { ButtonPropTypes, ButtonDefaultProps } from './types';
import createStyles from './styles';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';

const Button = (props) => {
  const { theme: themeMode } = useTheme();
  const mergedProps = { ...ButtonDefaultProps, ...props };
  
  const {
    label,
    onPress,
    color,
    size,
    variant,
    disabled,
    loading,
    style,
    labelStyle,
    leftIcon,
    rightIcon,
    borderRadius,
    bg,
    theme,
    borderColor,
    fs,
    ...rest
  } = mergedProps;
  
  const styles = createStyles(themeMode);
  
  // Tip ve varyant kombinasyonuna göre stil al
  const typeVariantStyle = styles.getTypeVariantStyle(theme, variant);
  
  const buttonStyles = [
    styles.button,
    styles[size],
    // Tip ve varyant kombinasyonundan gelen stiller
    typeVariantStyle && {
      backgroundColor: processColorValue(typeVariantStyle.backgroundColor),
      borderColor: processColorValue(typeVariantStyle.borderColor)
    },
    { borderRadius },
    bg && { backgroundColor: processColorValue(bg) },
    borderColor && { borderColor: processColorValue(borderColor) },
    disabled && styles.disabled,
    style,
  ];
  
  const labelStyles = [
    styles[`${size}Text`],
    // Tip ve varyant kombinasyonundan gelen metin rengi
    typeVariantStyle && { color: processColorValue(typeVariantStyle.color) },
    color && { color: processColorValue(color) },
    fs && { fontSize: fs },
    labelStyle,
  ];
  
  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={color ? color : typeVariantStyle?.color} />;
    }
    
    return (
      <View style={styles.content}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {label && <Text style={labelStyles}>{label}</Text>}
      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    );
  };
  
  return (
    <TouchableOpacity
    style={buttonStyles}
    onPress={onPress}
    disabled={disabled || loading}
    activeOpacity={0.7}
    {...rest}
    >
    {renderContent()}
    </TouchableOpacity>
  );
};

Button.propTypes = ButtonPropTypes;
Button.defaultProps = ButtonDefaultProps;

export default Button;