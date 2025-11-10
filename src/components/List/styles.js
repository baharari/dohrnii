import { create } from '../../theme';

const createStyles = () =>
  create({
    container: {
      // Dış container; isteğe bağlı style ile birleşir
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    markerContainer: {
      // Marker (icon veya işaret) alanı
      marginRight: 8,
      minWidth: 16,
      alignItems: 'center',
    },
    markerText: {
      // İşaret metni için stil (bullet/1./A./I. vs)
    },
    contentContainer: {
      flex: 1,
    },
    contentText: {
      // İçerik metni için temel stil
    },
  });

export default createStyles;