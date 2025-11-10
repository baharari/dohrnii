import PropTypes from 'prop-types';
import { SWITCH_SIZES } from './constants';
import { spacing } from '../../constants';

export const SwitchPropTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,

  // Tema rengi (theme.colors içinde bir anahtar: 'primary', 'red' vb.)
  theme: PropTypes.string,

  // Renk override'ları (string token veya hex)
  onColor: PropTypes.string,
  offColor: PropTypes.string,

  size: PropTypes.oneOf(Object.values(SWITCH_SIZES)),
  borderRadius: PropTypes.number,

  // Label: string veya ReactNode
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  // Thumb içine konacak ikon/ReactNode
  thumbIcon: PropTypes.node,

  // Dış container stil
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export const SwitchDefaultProps = {
  checked: false,
  onChange: undefined,
  theme: 'primary',
  onColor: undefined,
  offColor: undefined,
  size: SWITCH_SIZES.MD,
  borderRadius: spacing.borderRadius.round,
  label: undefined,
  thumbIcon: undefined,
  style: undefined,
  labelStyle: undefined,
};