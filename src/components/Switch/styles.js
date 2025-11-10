import { create } from '../../theme';

const createStyles = (theme) => {
  const { colors, spacing } = theme || {};
  return create({
    container: {
      // dış sarıcı
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12
    },
    label: {
      color: colors?.text?.primary,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    thumbBase: {
      backgroundColor: colors?.white || '#fff',
      shadowColor: colors?.shadow?.dark,
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: { width: 0, height: 1 },
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export default createStyles;