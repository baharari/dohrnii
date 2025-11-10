import React, { useContext } from 'react';
import { View } from 'react-native';
import GridContext from './context';
import { GridColPropTypes, GridColDefaultProps } from './types';

const GridCol = (props) => {
  const { columns, cg, rg, grow } = useContext(GridContext);
  const { span, offset, style, children, ...rest } = { ...GridColDefaultProps, ...props };

  const clampSpan = (n) => {
    if (typeof n !== 'number') return undefined;
    if (Number.isNaN(n)) return undefined;
    return Math.max(0, Math.min(n, columns));
  };

  let colStyle = {
    marginRight: cg,
    marginBottom: rg,
  };

  // offset: marginLeft yüzde
  const validOffset = clampSpan(offset);
  if (typeof validOffset === 'number' && validOffset > 0) {
    const offsetPercent = (validOffset / columns) * 100;
    colStyle.marginLeft = `${offsetPercent}%`;
  }

  if (span === 'content') {
    // içeriğe göre genişlik
    colStyle = {
      ...colStyle,
      flexGrow: 0,
      flexShrink: 0,
      width: 'auto',
    };
  } else if (span === 'auto' || span === undefined) {
    // satırı eşit şekilde doldur
    colStyle = {
      ...colStyle,
      flexGrow: 1,
      flexBasis: 0,
    };
  } else {
    // sayısal span
    const s = clampSpan(span);
    if (typeof s === 'number') {
      const percent = (s / columns) * 100;
      colStyle = {
        ...colStyle,
        flexBasis: `${percent}%`,
        maxWidth: `${percent}%`,
        // grow true ise kalan boşluğu doldurabilecek şekilde esner
        flexGrow: grow ? 1 : 0,
      };
    }
  }

  return (
    <View style={[colStyle, style]} {...rest}>
      {children}
    </View>
  );
};

GridCol.propTypes = GridColPropTypes;
GridCol.defaultProps = GridColDefaultProps;
GridCol.displayName = 'GridCol';

export default GridCol;