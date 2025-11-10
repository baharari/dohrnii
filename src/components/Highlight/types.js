import PropTypes from 'prop-types';

export const HighlightPropTypes = {
  // Vurgulanacak kelime/ifadeler (string veya string[])
  // Not: "highlight" tercih edilen prop; "higlight" alias'ı da bileşen içinde desteklenir.
  highlight: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  // Vurgu rengi (token veya hex), varsayılan "primary" (5. ton)
  color: PropTypes.string,
  // Dış Text stil
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // Bulunan parçaları sarmalamak için opsiyonel özel render
  // Not: prop adı istekle birebir "renderHiglight"
  renderHiglight: PropTypes.func,
  // Case sensitivity kontrolü: false ise büyük/küçük harf duyarsız eşleşme
  caseSensitive: PropTypes.bool,
  // Metin: string olması beklenir; node da desteklenir (string değilse aynen döner)
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export const HighlightDefaultProps = {
  color: 'primary',
  style: undefined,
  renderHiglight: undefined,
  caseSensitive: false,
};