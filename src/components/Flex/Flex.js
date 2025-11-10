import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../providers';
import createStyles from './styles';
import { FlexPropTypes, FlexDefaultProps } from './types';

const Flex = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles();

  const {
    gap,
    rowGap,
    columnGap,
    justify,
    align,
    direction,
    wrap,
    style,
    children,
    ...rest
  } = { ...FlexDefaultProps, ...props };

  const spacing = themeMode?.spacing || {};

  const resolveSpace = (value) => {
    if (value === null || value === undefined) return undefined;
    if (typeof value === 'number') return value;

    // alias: sm/md/lg -> s/m/l
    const aliasMap = {
      sm: spacing.s,
      md: spacing.m,
      lg: spacing.l,
    };

    // doğrudan spacing anahtarı
    return spacing[value] ?? aliasMap[value] ?? spacing.m;
  };

  const g = resolveSpace(gap);
  const rg = resolveSpace(rowGap !== undefined ? rowGap : g);
  const cg = resolveSpace(columnGap !== undefined ? columnGap : g);

  const containerStyle = [
    styles.container,
    {
      flexDirection: direction,
      flexWrap: wrap,
      justifyContent: justify,
      alignItems: align,
      // Kenar boşluklarını dengelemek için negatif margin (wrap senaryosunda satır/sütun aralıklarını doğru verir)
      gap: g,
      rowGap: rg,
      columnGap: cg,
    },
    style,
  ];

  return (
    <View style={containerStyle} {...rest}>
      {children}
    </View>
  );
};

Flex.propTypes = FlexPropTypes;
Flex.defaultProps = FlexDefaultProps;

export default Flex;