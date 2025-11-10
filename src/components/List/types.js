import PropTypes from 'prop-types';

export const ListPropTypes = {
  size: PropTypes.number,              // font size
  gap: PropTypes.number,               // items vertical gap
  icon: PropTypes.node,                // default icon for all items
  type: PropTypes.oneOf([
    'upper-alpha',
    'lower-alpha',
    'upper-roman',
    'lower-roman',
    'decimal',
    'disc',
  ]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};

export const ListDefaultProps = {
  size: 14,
  gap: 4,
  icon: undefined,
  type: 'disc',
  style: undefined,
};

export const ListItemPropTypes = {
  icon: PropTypes.node,                // per-item icon
  type: PropTypes.oneOf([
    'upper-alpha',
    'lower-alpha',
    'upper-roman',
    'lower-roman',
    'decimal',
    'disc',
  ]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};

export const ListItemDefaultProps = {
  icon: undefined,
  type: undefined, // uses List type by default
  style: undefined,
};