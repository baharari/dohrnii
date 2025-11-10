import PropTypes from 'prop-types';

export const GridPropTypes = {
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  columnGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  grow: PropTypes.bool,
  justify: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  align: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
  columns: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};

export const GridDefaultProps = {
  gap: 'md',
  rowGap: undefined,
  columnGap: undefined,
  grow: false,
  justify: 'flex-start',
  align: 'flex-start',
  columns: 12,
};

export const GridColPropTypes = {
  span: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto', 'content'])]),
  order: PropTypes.number,
  offset: PropTypes.number, // kaç sütun kadar öteleme yapılacak
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};

export const GridColDefaultProps = {
  span: 'auto',
  order: undefined,
  offset: 0,
};