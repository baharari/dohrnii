import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Pressable } from 'react-native';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { SwitchPropTypes, SwitchDefaultProps } from './types';
import { SWITCH_SIZES, SWITCH_METRICS } from './constants';

const Switch = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles(themeMode);

  const {
    checked,
    onChange,
    theme,
    onColor,
    offColor,
    size,
    borderRadius,
    label,
    thumbIcon,
    style,
    labelStyle,
    ...rest
  } = { ...SwitchDefaultProps, ...props };

  // Boyut metrikleri
  const metrics = SWITCH_METRICS[size] || SWITCH_METRICS[SWITCH_SIZES.MD];
  const { trackWidth, trackHeight, padding, thumbSize } = metrics;
  const maxTranslate = trackWidth - thumbSize - padding;

  // Renkleri çözümle
  const resolvedOnColor =
    onColor ? processColorValue(onColor) :
    (themeMode?.colors?.[theme]?.[5] || themeMode?.colors?.primary?.[5]);

  const resolvedOffColor =
    offColor ? processColorValue(offColor) :
    (themeMode?.colors?.gray?.[1]);

  // Animasyon değeri (thumb hareketi)
  const translateX = useRef(new Animated.Value(checked ? maxTranslate : padding)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: checked ? maxTranslate : padding,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [checked, maxTranslate, translateX]);

  // Değişim
  const handleToggle = () => {
    if (onChange) onChange(!checked);
  };

  return (
    <Pressable onPress={handleToggle} style={[styles.container, style]} {...rest}>
     

      <Pressable
        activeOpacity={0.7}
        onPress={handleToggle}
        accessibilityRole="switch"
        accessibilityState={{ checked }}
        style={[
          styles.row,
          {
            width: trackWidth,
            height: trackHeight,
            borderRadius,
            backgroundColor: checked ? resolvedOnColor : resolvedOffColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumbBase,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: borderRadius,
              transform: [{ translateX }],
            },
          ]}
        >
          {thumbIcon || null}
        </Animated.View>
      </Pressable>

      {label ? (
        typeof label === 'string' ? (
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        ) : (
          label
        )
      ) : null}
    </Pressable>
  );
};

Switch.propTypes = SwitchPropTypes;
Switch.defaultProps = SwitchDefaultProps;

export default Switch;