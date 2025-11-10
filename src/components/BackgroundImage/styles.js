import { StyleSheet } from 'react-native';

const createStyles = (theme) => {
  return StyleSheet.create({
    container: {
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });
};

export default createStyles;