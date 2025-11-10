import React from 'react';
import { View } from 'react-native';
import Text from '../Text/Text';
import createStyles from './styles';
import {
  ListPropTypes,
  ListDefaultProps,
  ListItemPropTypes,
  ListItemDefaultProps,
} from './types';

// 1-based index'i A, B, ..., Z, AA, AB ... şeklinde alfabeye çevirir
const toAlphabetLabel = (n, isUpper = true) => {
  let s = '';
  while (n > 0) {
    const rem = (n - 1) % 26;
    s = String.fromCharCode((isUpper ? 65 : 97) + rem) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
};

// 1-based index'i roman rakamına çevirir (I..MMMCMXCIX)
const toRoman = (n, isUpper = true) => {
  const map = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let result = '';
  for (const [val, sym] of map) {
    while (n >= val) {
      result += sym;
      n -= val;
    }
  }
  return isUpper ? result : result.toLowerCase();
};

const getMarkerLabel = (index1Based, type) => {
  switch (type) {
    case 'decimal':
      return `${index1Based}.`;
    case 'upper-alpha':
      return `${toAlphabetLabel(index1Based, true)}.`;
    case 'lower-alpha':
      return `${toAlphabetLabel(index1Based, false)}.`;
    case 'upper-roman':
      return `${toRoman(index1Based, true)}.`;
    case 'lower-roman':
      return `${toRoman(index1Based, false)}.`;
    case 'disc':
    default:
      return '•';
  }
};

// List.Item bileşeni
const ListItem = (props) => {
  const { icon, type, size, gap, index, style, children } = {
    ...ListItemDefaultProps,
    ...props,
  };
  const styles = createStyles();

  const markerNode =
    icon ??
    (type === 'disc' ? (
      <Text style={[styles.markerText, { fontSize: size }]}>{getMarkerLabel(index, type)}</Text>
    ) : (
      <Text style={[styles.markerText, { fontSize: size }]}>{getMarkerLabel(index, type)}</Text>
    ));

  return (
    <View style={[styles.itemRow, { marginBottom: gap }, style]}>
      <View style={styles.markerContainer}>{markerNode}</View>
      <View style={styles.contentContainer}>
        {typeof children === 'string' ? (
          <Text style={[styles.contentText, { fontSize: size }]}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
};
ListItem.displayName = 'ListItem';
ListItem.propTypes = ListItemPropTypes;

// List bileşeni
const List = (props) => {
  const { size, gap, icon, type, style, children, ...rest } = {
    ...ListDefaultProps,
    ...props,
  };
  const styles = createStyles();

  const childrenArray = React.Children.toArray(children);

  const renderedItems = childrenArray.map((child, idx) => {
    if (child?.type?.displayName === 'ListItem') {
      // Per-item override'ları al
      const childProps = child.props || {};
      const resolvedIcon = childProps.icon ?? icon;
      const resolvedType = childProps.type ?? type;

      return React.cloneElement(child, {
        key: child.key ?? `li-${idx}`,
        icon: resolvedIcon,
        type: resolvedType,
        size,
        gap,
        index: idx + 1, // 1-based
      });
    }
    // Eğer doğrudan string/node verildiyse ListItem wrap edelim
    return (
      <ListItem key={`li-${idx}`} size={size} gap={gap} icon={icon} type={type}>
        {child}
      </ListItem>
    );
  });

  // Son elemanın marginBottom'unu kaldırmak isterseniz burada ayarlayabilirsiniz
  // Şimdilik her item gap ile ayrılıyor.
  return (
    <View style={[styles.container, style]} {...rest}>
      {renderedItems}
    </View>
  );
};

List.Item = ListItem;
List.propTypes = ListPropTypes;

export default List;