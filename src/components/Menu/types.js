import PropTypes from 'prop-types';
import { spacing } from '../../constants';

export const MenuPropTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),      // ör: 200 veya 'auto'
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),   // ör: 200 veya '90%'
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),     // ör: 200 veya 'auto'
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),  // ör: 200 veya '90%'
  borderRadius: PropTypes.number,
  defaultOpened: PropTypes.bool,
  disabled: PropTypes.bool,
  withArrow: PropTypes.bool,
  // children: Menu.Target ve Menu.Dropdown
  children: PropTypes.node,
};

export const MenuDefaultProps = {
  width: undefined,            // içerik kadar
  maxWidth: '90%',
  height: undefined,           // içerik kadar
  maxHeight: '90%',
  borderRadius: spacing.borderRadius.m,
  defaultOpened: false,
  disabled: false,
  withArrow: true,
};