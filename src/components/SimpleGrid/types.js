import PropTypes from 'prop-types';

export const SimpleGridPropTypes = {
  /**
   * Sütun sayısı
   */
  cols: PropTypes.number,

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
   * Container stili
   */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Çocuklar
   */
  children: PropTypes.node,
};

export const SimpleGridDefaultProps = {
  cols: 1,
  gap: 'md',
  rowGap: undefined,
  columnGap: undefined,
  style: undefined,
};