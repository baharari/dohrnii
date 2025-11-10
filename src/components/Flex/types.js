import PropTypes from 'prop-types';

export const FlexPropTypes = {
  /**
   * Genel boşluk (hem yatay hem dikey). 'xxs' | 'xs' | 's' | 'sm' | 'm' | 'md' | 'l' | 'lg' | 'xl' | 'xxl' | 'xxxl' veya sayı.
   */
  gap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Satırlar arası dikey boşluk. Yoksa gap uygulanır.
   */
  rowGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Sütunlar arası yatay boşluk. Yoksa gap uygulanır.
   */
  columnGap: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Ana eksen hizalama
   */
  justify: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),

  /**
   * Çapraz eksen hizalama
   */
  align: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),

  /**
   * Flex yönü
   */
  direction: PropTypes.oneOf(['row', 'column', 'row-reverse', 'column-reverse']),

  /**
   * Wrap davranışı
   */
  wrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse']),

  /**
   * Container stili
   */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Çocuklar
   */
  children: PropTypes.node,
};

export const FlexDefaultProps = {
  gap: 'md',
  rowGap: undefined,
  columnGap: undefined,
  direction: 'row',
  wrap: 'nowrap',
  style: undefined,
};