import React from 'react';
import PropTypes from 'prop-types';

const Item = () => null;

Item.propTypes = {
  value: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
};

Item.defaultProps = {
  disabled: false,
  style: undefined,
};

Item.displayName = 'AccordionItem';

export default Item;