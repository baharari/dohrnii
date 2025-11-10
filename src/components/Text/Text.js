import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../providers';

import { TextPropTypes, TextDefaultProps } from './types';
import { TEXT_SIZE_STYLES, TEXT_FONT_FAMILIES } from './constants';
import createStyles from './styles';
import { processColorValue } from '../../theme';

/**
 * Özelleştirilmiş Text bileşeni
 */
const Text = (props) => {
  const {
    children,
    style,
    fontSize,
    fontWeight,
    fontFamily,
    lineHeight,
    color,
    size,
    align,
    ...restProps
  } = props;

  const theme = useTheme();
  const styles = createStyles(theme);

  // Kategori + ağırlık bazlı fontFamily ve varsayılan ağırlık çözümleme
  const fontFamilyCategory = fontFamily ?? TEXT_FONT_FAMILIES.BODY;
  const categoryDefaultWeight = theme.theme.typography?.defaultFontWeight?.[fontFamilyCategory];
  const sizeDefaultWeight = size ? TEXT_SIZE_STYLES[size]?.fontWeight : undefined;
  const efontFamilyectiveWeight = String(fontWeight ?? categoryDefaultWeight ?? sizeDefaultWeight ?? '400');

  const categoryWeightMap = theme.theme.typography?.fontFamily?.[fontFamilyCategory];
  const resolvedFontFamily =
    categoryWeightMap && typeof categoryWeightMap === 'object'
      ? categoryWeightMap[efontFamilyectiveWeight]
      : undefined;

  // Stil oluşturma
  const textStyle = [
    styles.text,
    // Size prop'u varsa, ilgili boyut stillerini uygula (fontSize, lineHeight vb. dahil)
    size && TEXT_SIZE_STYLES[size],
    // Özel stil özellikleri
    fontSize !== undefined && { fontSize: fontSize },
    align !== undefined && { textAlign: align },
    { fontWeight: efontFamilyectiveWeight },
    lineHeight !== undefined && { lineHeight: lineHeight },
    color !== undefined && { color: processColorValue(color) },
    // Kategori + ağırlık bazlı dinamik fontFamily
    resolvedFontFamily && { fontFamily: resolvedFontFamily },
    // Kullanıcı tarafından sağlanan stil
    style,
  ];

  return (
    <RNText style={textStyle} {...restProps}>
      {children}
    </RNText>
  );
};

Text.propTypes = TextPropTypes;
Text.defaultProps = TextDefaultProps;

export default Text;