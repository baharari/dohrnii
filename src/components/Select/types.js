import PropTypes from 'prop-types';
import { SELECT_SIZES, SELECT_VARIANTS } from './constants';
import spacing from '../../constants/spacing';


export const SelectPropTypes = {
  variant: PropTypes.oneOf(Object.values(SELECT_VARIANTS)),
  size: PropTypes.oneOf(Object.values(SELECT_SIZES)),
  borderRadius: PropTypes.number,
  leftSection: PropTypes.node,
  rightSection: PropTypes.node,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  error: PropTypes.string,

  /**
   * Açılan seçenekler alanının stili
   */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  errorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,

  onChange: PropTypes.func,
  value: PropTypes.any,

  /**
   * data: ['React', 'Angular'] veya [{ label: 'React', value: 'react' }]
   */
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        value: PropTypes.any.isRequired,
      })
    ),
  ]),

  children: PropTypes.node,
};

export const SelectDefaultProps = {
  variant: SELECT_VARIANTS.SOLID,
  size: SELECT_SIZES.MEDIUM,
  borderRadius: spacing.borderRadius.m,
  leftSection: null,
  rightSection: null,
  label: undefined,
  error: undefined,
  style: undefined,
  inputStyle: undefined,
  labelStyle: undefined,
  errorStyle: undefined,
  placeholder: undefined,
  placeholderTextColor: undefined,
  onChange: undefined,
  value: undefined,
  data: undefined,
};

export const SelectOptionPropTypes = {
  value: PropTypes.any.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  disabled: PropTypes.bool,
};

export const SelectOptionDefaultProps = {
  disabled: false,
};