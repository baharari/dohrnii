import React from 'react';
import PropTypes from 'prop-types';

const Panel = () => null;

Panel.propTypes = {
  value: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

Panel.displayName = 'TabsPanel';

export default Panel;