import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { RadioPropTypes, RadioDefaultProps } from './types';

const Radio = (props) => {
  const { theme: themeMode } = useTheme();
  const mergedProps = { ...RadioDefaultProps, ...props };

  const {
    checked,
    value,
    onChange,
    label,
    theme,
    size,
    variant,
    disabled,
    borderRadius,
    icon, // checked olduğunda gösterilecek özel ikon
    style,
    labelStyle,
    ...rest
  } = mergedProps;

  const styles = createStyles(themeMode);

  const typeVariantStyle = styles.getTypeVariantStyle(theme, variant);
  const uncheckedStyle = styles.getUncheckedStyle(theme, variant);
  const visualStyle = checked ? typeVariantStyle : uncheckedStyle;

  // Boyut hesaplama: string veya number
  const isNumberSize = typeof size === 'number';
  const outerSizeStyle = isNumberSize
    ? { width: size, height: size, borderRadius: borderRadius ?? Math.round(size / 2) }
    : styles[`${size}Box`];

  const dotStyle = isNumberSize
    ? {
        width: Math.round((size * 3) / 5),
        height: Math.round((size * 3) / 5),
        borderRadius: Math.round((size * 3) / 10),
        backgroundColor: processColorValue(typeVariantStyle?.color),
      }
    : {
        ...(size === 'sm' ? styles.smDot : size === 'lg' ? styles.lgDot : styles.mdDot),
        backgroundColor: processColorValue(typeVariantStyle?.color),
      };

  const boxStyles = [
    styles.box,
    outerSizeStyle,
    {
      backgroundColor: processColorValue(visualStyle.backgroundColor),
      borderColor: processColorValue(visualStyle.borderColor),
      borderRadius: borderRadius ?? outerSizeStyle?.borderRadius,
    },
    disabled && styles.disabled,
    style,
  ];

  const labelStyles = [
    styles.label,
    labelStyle,
  ];

  const handlePress = () => {
    if (disabled) return;
    // Radio tekil kullanımda sadece checked=true olarak bildirim yapar
    onChange && onChange(true, value);
  };

  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      {...rest}
    >
      <View style={boxStyles}>
        {checked ? (
          icon ? (
            icon
          ) : (
            <View style={dotStyle} />
          )
        ) : null}
      </View>
      {label ? <Text style={labelStyles}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

Radio.propTypes = RadioPropTypes;
Radio.defaultProps = RadioDefaultProps;

export default Radio;