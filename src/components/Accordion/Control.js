import React from 'react';
import PropTypes from 'prop-types';

const Control = () => null;

Control.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

Control.defaultProps = {
  style: undefined,
};

Control.displayName = 'AccordionControl';

export default Control;