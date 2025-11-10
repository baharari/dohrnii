import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import { CheckboxPropTypes, CheckboxDefaultProps } from './types';
import createStyles from './styles';

// Varsayılan check görseli (PNG)
const defaultCheckSource = require('../../assets/icons/check.png');

const Checkbox = (props) => {
  const { theme: themeMode } = useTheme();
  const mergedProps = { ...CheckboxDefaultProps, ...props };

  const {
    checked,
    onChange,
    theme,   
    size,
    variant,
    disabled,
    label,
    style,
    labelStyle,
    borderRadius,
    icon, // kullanıcı tarafından verilebilecek ikon
    ...rest
  } = mergedProps;

  const styles = createStyles(themeMode);

  // Varyant ve type (renk) bazlı stil çözümü
  const typeVariantStyle = styles.getTypeVariantStyle(theme, variant);
  const uncheckedStyle = styles.getUncheckedStyle(theme, variant);
  const visualStyle = checked ? typeVariantStyle : uncheckedStyle;

  const boxStyles = [
    styles.box,
    styles[`${size}Box`],
    // checked/unchecked duruma göre arkaplan ve kenarlık
    {
      backgroundColor: processColorValue(visualStyle.backgroundColor),
      borderColor: processColorValue(visualStyle.borderColor),
      borderRadius,
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
    onChange && onChange(!checked);
  };

  const checkMarkColor = checked
    ? processColorValue(typeVariantStyle?.color)
    : 'transparent';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      {...rest}
    >
      <View style={boxStyles}>
        {checked ? (
          // Öncelik: kullanıcı ikon props'u -> yoksa varsayılan PNG
          icon ? (
            icon
          ) : (
            <Image
              source={defaultCheckSource}
              style={{
                width: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
                height: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
                tintColor: checkMarkColor,
              }}
              resizeMode="contain"
            />
          )
        ) : null}
      </View>
      {label ? <Text style={labelStyles}>{label}</Text> : null}
    </TouchableOpacity>
  );
};

Checkbox.propTypes = CheckboxPropTypes;
Checkbox.defaultProps = CheckboxDefaultProps;

export default Checkbox;