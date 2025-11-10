import React from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { AlertPropTypes, AlertDefaultProps } from './types';
import Text from '../Text/Text';
const defaultAlertIcon = require('../../assets/icons/alert-circle-2.png');

const Alert = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles(themeMode);

  const {
    variant,
    theme,
    color,
    bg,
    title,
    icon,
    borderRadius,
    style,
    contentStyle,
    titleStyle,
    textStyle,
    children,
    ...rest
  } = { ...AlertDefaultProps, ...props };

  const typeVariantStyle = styles.getTypeVariantStyle(theme, variant);

  const backgroundColor = bg
    ? processColorValue(bg)
    : processColorValue(typeVariantStyle.backgroundColor);

  const borderColor = processColorValue(typeVariantStyle.borderColor);

  const titleIconColor = color
    ? processColorValue(color)
    : processColorValue(typeVariantStyle.color);

  const containerStyle = [
    styles.container,
    { backgroundColor, borderColor, borderRadius },
    style,
  ];

  // Default ikon: icon prop'u undefined ise göster; null ise hiç gösterme
  const iconElement = (() => {
    if (icon === undefined) {
      return (
        <Image
          source={defaultAlertIcon}
          style={{ width: 20, height: 20, tintColor: titleIconColor }}
        />
      );
    }
    if (!icon) return null;
    return React.isValidElement(icon)
      ? React.cloneElement(icon, {
        style: [
          icon.props?.style,
          { color: titleIconColor, tintColor: titleIconColor },
        ],
      })
      : icon;
  })();

  return (
    <View style={containerStyle} {...rest}>
      {iconElement ? <View style={styles.iconBox}>{iconElement}</View> : null}

      <View style={[styles.contentBox, contentStyle]}>
        {title
          ? typeof title === 'string'
            ? (
              <Text style={[styles.titleText, titleStyle, { color: titleIconColor }]}>
                {title}
              </Text>
            )
            : title
          : null}

        {typeof children === 'string'
          ? (
            <Text style={[styles.bodyText, { color: processColorValue(variant === 'solid' ? themeMode?.colors.text.white : themeMode?.colors.text.darkgray) }, textStyle]}>
              {children}
            </Text>
          )
          : children}
      </View>
    </View>
  );
};

Alert.propTypes = AlertPropTypes;

export default Alert;