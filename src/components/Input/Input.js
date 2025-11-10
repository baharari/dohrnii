import React from 'react';
import { View, TextInput } from 'react-native';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { InputPropTypes, InputDefaultProps } from './types';

const Input = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles(themeMode);

  const {
    variant,
    size,
    borderRadius,
    leftSection,
    rightSection,
    label,
    error,
    style,
    labelStyle,
    errorStyle,
    inputStyle,
    onChange,       // kullanıcı onChange sağlarsa kullan
    onChangeText,   // RN TextInput callback'i
    placeholder,
    placeholderTextColor,
    value,
    ...rest
  } = { ...InputDefaultProps, ...props };

  const variantStyle = styles.getVariantStyle(variant);

  const isNumberSize = typeof size === 'number';
  const heightStyle = isNumberSize ? { height: size } : styles[`${size}Box`];

  const boxStyles = [
    styles.box,
    heightStyle,
    {
      backgroundColor: processColorValue(variantStyle.backgroundColor),
      borderColor: error ? processColorValue('error.5') : processColorValue(variantStyle.borderColor),
      borderRadius,
    },
    style,
  ];

  const finalPlaceholderColor =
    placeholderTextColor ||
    processColorValue(variantStyle.placeholderColor) ||
    processColorValue('text.secondary');

  const handleChangeText = (text) => {
    if (onChangeText) onChangeText(text);
    if (onChange) onChange(text);
  };

  return (
    <View style={styles.container}>
      {label ? (
        typeof label === 'string' ? (
          <Text fontWeight="500" style={[styles.label, labelStyle]}>{label}</Text>
        ) : (
          label
        )
      ) : null}

      <View style={[styles.fieldRow, boxStyles]}>
        {leftSection ? <View style={styles.leftSection}>{leftSection}</View> : null}

        <TextInput
          style={[styles.input, inputStyle, { color: processColorValue(variantStyle.textColor) }]}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={finalPlaceholderColor}
          {...rest}
        />

        {rightSection ? <View style={styles.rightSection}>{rightSection}</View> : null}
      </View>

      {error ? (
        <Text size="xs" style={[styles.errorText, errorStyle]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

Input.propTypes = InputPropTypes;
Input.defaultProps = InputDefaultProps;

export default Input;