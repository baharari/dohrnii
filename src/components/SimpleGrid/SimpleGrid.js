// SimpleGrid bileşeni
import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../providers';
import createStyles from './styles';
import { SimpleGridPropTypes, SimpleGridDefaultProps } from './types';

const SimpleGrid = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles();

  const {
    cols,
    gap,
    rowGap,
    columnGap,
    style,
    children,
    ...rest
  } = { ...SimpleGridDefaultProps, ...props };

  // Container genişliğini ölçüyoruz
  const [containerWidth, setContainerWidth] = React.useState(0);

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

    // doğrudan spacing anahtarı veya alias
    return spacing[value] ?? aliasMap[value] ?? spacing.m;
  };

  const g = resolveSpace(gap);
  const rg = resolveSpace(rowGap !== undefined ? rowGap : g);
  const cg = resolveSpace(columnGap !== undefined ? columnGap : g);

  // Negatif margin kullanmıyoruz, genişliği hesapladığımız için gerek yok
  const containerStyle = [
    styles.container,
    style,
  ];

  // Ölçüm yokken yüzde tabanlı çizim, ölçüm geldikten sonra piksel tabanlı sabit genişlik
  const percent = cols > 0 ? (100 / cols) : 100;
  const itemWidth =
    containerWidth > 0 ? (containerWidth - (cg || 0) * (cols - 1)) / cols : undefined;

  const wrappedChildren = React.Children.map(children, (child, index) => {
    if (!child) return null;
    const isLastInRow = ((index + 1) % cols) === 0;

    const widthStyle =
      itemWidth !== undefined ? { width: itemWidth } : { width: `${percent}%` };

    const horizontalGap =
      itemWidth !== undefined ? (isLastInRow ? 0 : (cg || 0)) : 0;

    return (
      <View style={[widthStyle, { marginRight: horizontalGap, marginBottom: rg || 0 }]}>
        {child}
      </View>
    );
  });

  return (
    <View
      style={containerStyle}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      {...rest}
    >
      {wrappedChildren}
    </View>
  );
};

SimpleGrid.propTypes = SimpleGridPropTypes;
SimpleGrid.defaultProps = SimpleGridDefaultProps;

export default SimpleGrid;