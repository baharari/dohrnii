import PropTypes from 'prop-types';
import { ACCORDION_VARIANTS } from './constants';

export const AccordionPropTypes = {
  variant: PropTypes.oneOf(Object.values(ACCORDION_VARIANTS)),
  borderRadius: PropTypes.number,
  defaultValue: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  value: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};

export const AccordionDefaultProps = {
  variant: ACCORDION_VARIANTS.DEFAULT,
  borderRadius: 0,
  defaultValue: undefined,
  value: undefined,
  onChange: undefined,
  multiple: false,
  style: undefined,
};