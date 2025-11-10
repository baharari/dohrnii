import React from 'react';
import PropTypes from 'prop-types';

const Tab = () => null;

Tab.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

Tab.defaultProps = {
  disabled: false,
};

Tab.displayName = 'TabsTab';

export default Tab;