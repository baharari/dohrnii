import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Modal, Pressable, Animated, Image } from 'react-native';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { SelectPropTypes, SelectDefaultProps } from './types';
import Option from './Option';
const defaultCheckSource = require('../../assets/icons/check.png');
const defaultChevronSource = require('../../assets/icons/chevron-expand.png');

const Select = (props) => {
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
    style,          // dropdown style
    labelStyle,
    errorStyle,
    inputStyle,
    placeholder,
    placeholderTextColor,
    onChange,
    value,
    data,
    children,
    ...rest
  } = { ...SelectDefaultProps, ...props };
  
  const [open, setOpen] = React.useState(false);
  
  const variantStyle = styles.getVariantStyle(variant);
  
  // Seçenekleri çocuklardan veya data'dan hazırla
  const optionsFromChildren = React.Children.toArray(children)
  .filter((child) => child && child.type && child.type.displayName === 'SelectOption')
  .map((child) => ({
    label: child.props.children,
    value: child.props.value,
    disabled: child.props.disabled,
  }));
  
  const optionsFromData = Array.isArray(data)
  ? data.map((item) =>
    typeof item === 'string'
  ? { label: item, value: item }
  : { label: item.label, value: item.value }
)
: [];

const options = optionsFromChildren.length > 0 ? optionsFromChildren : optionsFromData;

// Seçili label çözümle
const selectedOption = options.find((opt) => opt.value === value);
const selectedLabel = selectedOption ? selectedOption.label : undefined;

const boxStyles = [
  styles.box,
  styles[`${size}Box`],
  {
    backgroundColor: processColorValue(variantStyle.backgroundColor),
    borderColor: error ? processColorValue('error.5') : processColorValue(variantStyle.borderColor),
    borderRadius,
  },
];

const finalPlaceholderColor =
placeholderTextColor ||
processColorValue(variantStyle.placeholderColor) ||
processColorValue('text.secondary');

const handleSelect = (val) => {
  setOpen(false);
  if (onChange) onChange(val);
};

  // Overlay opaklığını kontrol edecek animasyon değeri
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Modal açıldığında 1 saniye bekleyip fade ile opaklığı 1'e çıkar
  useEffect(() => {
    if (open) {
      overlayOpacity.setValue(0);
      Animated.sequence([
        Animated.delay(200),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Kapandığında sıfırla (bir sonraki açılışa yine şeffaf başlasın)
      overlayOpacity.setValue(0);
    }
  }, [open]);

return (
  <View style={styles.container} {...rest}>
  {label ? (
    typeof label === 'string' ? (
      <Text fontWeight="500" style={[styles.label, labelStyle]}>{label}</Text>
    ) : (
      label
    )
  ) : null}
  
  <TouchableOpacity
  activeOpacity={0.7}
  onPress={() => setOpen((prev) => !prev)}
  style={[styles.fieldRow, boxStyles]}
  >
  {leftSection ? <View style={styles.leftSection}>{leftSection}</View> : null}
  
  {selectedLabel ? (
    typeof selectedLabel === 'string' ? (
      <Text style={[styles.valueText, inputStyle, { color: processColorValue(variantStyle.textColor) }]}>
      {selectedLabel}
      </Text>
    ) : (
      selectedLabel
    )
  ) : (
    placeholder ? (
      <Text style={[styles.valueText, inputStyle, { color: finalPlaceholderColor }]}>
      {placeholder}
      </Text>
    ) : (
      <Text style={[styles.valueText, inputStyle, { color: finalPlaceholderColor }]}>
      {/* Boş seçim */}
      </Text>
    )
  )}
  
      {rightSection ? <View style={styles.rightSection}>{rightSection}</View> : <Image
        source={defaultChevronSource}
        style={{
          width: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
          height: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
          tintColor: themeMode?.colors?.input[variant].iconColor,
        }}
        resizeMode="contain"
      />
      }
  </TouchableOpacity>
  
  {/* Dropdown'u inline View yerine alttan kayan modal ile gösteriyoruz */}
  <Modal
    visible={open && options.length > 0}
    transparent
    animationType="slide"
    onRequestClose={() => setOpen(false)}
  >
    {/* Overlay: tıklayınca kapanır */}
    <Pressable
        style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end' }}
      onPress={() => setOpen(false)}
    >
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: themeMode?.colors?.overlayColor,
            opacity: overlayOpacity,
          }}
        />
      {/* İçerik alanı: tıklayınca kapanmaz */}
      <Pressable
        style={[styles.dropdown, style]}
        onPress={() => {}}
      >
          {label ? (
            typeof label === 'string' ? (
              <Text fontWeight="500" style={{ color: themeMode?.colors.text?.lightgray, marginLeft: 24, marginBottom: 5 }}>{label}</Text>
            ) : (
              label
            )
          ) : null}

        {options.map((opt, idx) => {
          const isSelected = value === opt.value;
          return (
            <TouchableOpacity
              key={`${String(opt.value)}-${idx}`}
              disabled={opt.disabled}
              onPress={() => handleSelect(opt.value)}
              style={[
                styles.dropdownItem,
                isSelected && styles.dropdownItemActive,
                opt.disabled && styles.disabled,
              ]}
            >
              {typeof opt.label === 'string' ? (
                <Text style={[styles.dropdownItemText, isSelected && styles.dropdownItemActiveText]}>{opt.label}</Text>
              ) : (
                opt.label
              )}
              {isSelected && 
                <Image
                  source={defaultCheckSource}
                  style={{
                    width:  16,
                    height:  16,
                    tintColor: themeMode?.colors?.primary?.[5],
                  }}
                  resizeMode="contain"
                />
              }
            </TouchableOpacity>
          );
        })}
      </Pressable>
    </Pressable>
  </Modal>
  
  {error ? (
    <Text size="xs" style={[styles.errorText, errorStyle]}>
    {error}
    </Text>
  ) : null}
  </View>
);
};

Select.propTypes = SelectPropTypes;
Select.defaultProps = SelectDefaultProps;
Select.Option = Option;

export default Select;