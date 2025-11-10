import { create } from '../../theme';

const createStyles = (theme) => {
  const colors = theme?.colors || {};

  return create({
    container: {
      // Dış container
    },
    pinsRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    pinBox: {
      marginRight: 8, // son elemanda kaldıracağız
    },
    label: {
      marginBottom: 2,
      marginLeft: 10,
      color: colors.text?.lightgray,
    },
    errorText: {
      marginTop: 4,
      color: 'error.5',
    },
    // İç metni ortalamak için TextInput stiline eklenecek
    centerInputText: {
      textAlign: 'center',
    },
  });
}

export default createStyles;