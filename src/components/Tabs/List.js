import React from 'react';
import PropTypes from 'prop-types';

const List = () => null;

List.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

List.displayName = 'TabsList';

export default List;