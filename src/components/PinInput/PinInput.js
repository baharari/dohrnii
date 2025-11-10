import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { PinInputPropTypes, PinInputDefaultProps } from './types';
import Input from '../Input/Input';
import { useTheme } from '../../providers';

const sanitizeChars = (text, type) => {
  if (!text) return '';
  const str = String(text);
  if (type === 'number') {
    return str.replace(/[^0-9]/g, '');
  }
  // alphanumeric
  return str.replace(/[^a-zA-Z0-9]/g, '');
};

const PinInput = (props) => {
  const {
    label,
    error,
    length,
    placeholder,
    type,
    value,
    onChange,
    mask,
    style,
    labelStyle,
    errorStyle,
    inputStyle, // Input'tan gelen; her pin'e uygulanır
    // Input'tan gelen diğer tüm propslar (variant, size, borderRadius, vb)
    ...rest
  } = { ...PinInputDefaultProps, ...props };
  const { theme: themeMode } = useTheme();

  const styles = createStyles(themeMode);

  // length minimum 1
  const pinLength = Math.max(1, Number(length) || PinInputDefaultProps.length);

  // İç state ve dış value senkronizasyonu
  const [pins, setPins] = React.useState(() => {
    const initial = (value || '').slice(0, pinLength);
    const arr = Array(pinLength).fill('');
    for (let i = 0; i < initial.length; i++) arr[i] = initial[i];
    return arr;
  });

  React.useEffect(() => {
    const src = (value || '').slice(0, pinLength);
    setPins((prev) => {
      const next = Array(pinLength).fill('');
      for (let i = 0; i < src.length; i++) next[i] = src[i];
      return next;
    });
  }, [value, pinLength]);

  const inputsRef = React.useRef([]);

  const emitChange = (nextPins) => {
    const s = nextPins.join('');
    if (onChange) onChange(s);
  };

  const focusIndex = (idx) => {
    const ref = inputsRef.current[idx];
    if (ref && ref.focus) ref.focus();
  };

  const handleChangeAt = (idx, text) => {
    const sanitized = sanitizeChars(text, type);

    // Çoklu yapıştırma desteği (örn: "1234")
    const chars = sanitized.split('');
    setPins((prev) => {
      const next = [...prev];
      let cursor = idx;

      for (let c of chars) {
        if (cursor >= pinLength) break;
        next[cursor] = c;
        cursor += 1;
      }

      // Bir sonraki boş veya bir sonraki pozisyona odaklan
      const nextFocus = Math.min(cursor, pinLength - 1);
      if (chars.length > 0) focusIndex(nextFocus);

      emitChange(next);
      return next;
    });
  };

  const handleKeyPressAt = (idx, e) => {
    if (e?.nativeEvent?.key === 'Backspace') {
      setPins((prev) => {
        const next = [...prev];
        if (next[idx]) {
          // mevcut karakteri sil
          next[idx] = '';
          emitChange(next);
          return next;
        }
        // boşsa bir önceki index'e git ve onu sil
        const prevIdx = Math.max(0, idx - 1);
        next[prevIdx] = '';
        focusIndex(prevIdx);
        emitChange(next);
        return next;
      });
    }
  };

  // Her bir Input için ortak propslar
  const perInputCommonProps = {
    placeholder: placeholder ? placeholder : 'o',
    secureTextEntry: !!mask,
    keyboardType: type === 'number' ? 'number-pad' : 'default',
    // Input kendi handle'ında onChangeText + onChange'i çağırıyor; burada sadece onChangeText kullanacağız
  };

  const pinInputs = Array.from({ length: pinLength }).map((_, idx) => {
    const isLast = idx === pinLength - 1;
    return (
      <View
        key={`pin-${idx}`}
        style={[styles.pinBox, isLast ? { marginRight: 0 } : null]}
      >
        <Input
          ref={(r) => (inputsRef.current[idx] = r)}
          value={pins[idx]}
          onChangeText={(t) => handleChangeAt(idx, t)}
          onKeyPress={(e) => handleKeyPressAt(idx, e)}
          inputStyle={[styles.centerInputText, { width: "100%", height: "100%", aspectRatio: 1, fontWeight: "600" }, inputStyle]}
          style={{ paddingHorizontal: 0, aspectRatio: 1, }} // dış kutu stilini dışarıdan vermek istemiyorsanız null bırakabilirsiniz
          {...perInputCommonProps}
          {...rest}
        />
      </View>
    );
  });

  return (
    <View style={[styles.container, style]}>
      {label ? (
        typeof label === 'string' ? (
          <Text fontWeight="500" style={[styles.label, labelStyle]}>{label}</Text>
        ) : (
          label
        )
      ) : null}

      <View style={styles.pinsRow}>{pinInputs}</View>

      {error ? (
        <Text size="xs" style={[styles.errorText, errorStyle]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

PinInput.propTypes = PinInputPropTypes;
PinInput.defaultProps = PinInputDefaultProps;

export default PinInput;