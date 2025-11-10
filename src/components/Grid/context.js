import React from 'react';

const GridContext = React.createContext({
  columns: 12,
  cg: 0,
  rg: 0,
  grow: false,
});

export default GridContext;