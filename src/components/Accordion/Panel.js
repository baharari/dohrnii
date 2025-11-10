import React from 'react';
import PropTypes from 'prop-types';

const Panel = () => null;

Panel.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node.isRequired,
};

Panel.defaultProps = {
  style: undefined,
};

Panel.displayName = 'AccordionPanel';

export default Panel;