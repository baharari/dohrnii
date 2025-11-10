import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../providers';
import createStyles from './styles';
import { GridPropTypes, GridDefaultProps } from './types';
import GridContext from './context';

const Grid = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles();

  const {
    gap,
    rowGap,
    columnGap,
    grow,
    justify,
    align,
    columns,
    style,
    children,
    ...rest
  } = { ...GridDefaultProps, ...props };

  const spacing = themeMode?.spacing || {};

  const resolveSpace = (value) => {
    if (value === null || value === undefined) return undefined;
    if (typeof value === 'number') return value;

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

  const containerStyle = [
    styles.container,
    {
      justifyContent: justify,
      alignItems: align,
      marginBottom: rg ? -rg : undefined,
      marginRight: cg ? -cg : undefined,
    },
    style,
  ];

  // RN'de 'order' stil desteği olmadığı için, çocukları order'a göre sıralıyoruz
  const sortedChildren = React.Children.toArray(children).sort((a, b) => {
    const ao = a?.props?.order ?? 0;
    const bo = b?.props?.order ?? 0;
    return ao - bo;
  });

  return (
    <GridContext.Provider value={{ columns, cg: cg || 0, rg: rg || 0, grow }}>
      <View style={containerStyle} {...rest}>
        {sortedChildren}
      </View>
    </GridContext.Provider>
  );
};

Grid.propTypes = GridPropTypes;
Grid.defaultProps = GridDefaultProps;

export default Grid;