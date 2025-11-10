import { StyleSheet } from 'react-native';
import { spacing } from '../../constants';

const createStyles = (theme) => {
  const colors = theme?.colors || {};
  return StyleSheet.create({
    dropdownContainer: {
      position: 'absolute',
      paddingVertical: spacing.padding.s,
      paddingHorizontal: spacing.padding.s,
      shadowColor: colors?.shadow || '#000',
      shadowOpacity: 0.05,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: -3 },
      elevation: 6,
    },
  });
};

export default createStyles;