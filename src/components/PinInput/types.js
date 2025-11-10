import PropTypes from 'prop-types';
import { InputPropTypes } from '../Input';

export const PinInputPropTypes = {
  // Input'tan gelen tüm props'lar PinInput'a da geçerli (spread ile aktarılacak)
  ...InputPropTypes,

  // PinInput'e özgü props'lar
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  error: PropTypes.string,
  length: PropTypes.number, // en az 1
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['number', 'alphanumeric']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  mask: PropTypes.bool,
  // Dış container stili
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // Label ve error stil override'ları
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export const PinInputDefaultProps = {
  label: undefined,
  error: undefined,
  length: 4,
  placeholder: '',
  type: 'alphanumeric',
  value: '',
  onChange: undefined,
  mask: false,
  style: undefined,
  labelStyle: undefined,
  errorStyle: undefined,
};