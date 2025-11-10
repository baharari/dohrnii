import React, { useMemo } from 'react';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { HighlightPropTypes, HighlightDefaultProps } from './types';

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const Highlight = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles(themeMode);

  const {
    highlight,
    color,
    style,
    renderHiglight,
    caseSensitive,
    children,
    ...rest
  } = { ...HighlightDefaultProps, ...props };

  // "highlight" yazım hatası için alias desteği: "higlight"
  const highlightInput = highlight ?? props.higlight;

  // children string değilse, olduğu gibi döndür
  if (typeof children !== 'string') {
    return (
      <Text style={[styles.container, style]} {...rest}>
        {children}
      </Text>
    );
  }

  // Tekil string veya dizi olarak highlight'ı normalize et
  const tokens = (() => {
    if (typeof highlightInput === 'string' && highlightInput.length > 0) {
      return [highlightInput];
    }
    if (Array.isArray(highlightInput)) {
      return highlightInput.filter(t => typeof t === 'string' && t.length > 0);
    }
    return [];
  })();

  if (tokens.length === 0) {
    return (
      <Text style={[styles.container, style]} {...rest}>
        {children}
      </Text>
    );
  }

  const pattern = useMemo(() => {
    const escaped = tokens.map(escapeRegExp);
    // caseSensitive=false => 'gi' (global + case-insensitive)
    // caseSensitive=true  => 'g'  (global + case-sensitive)
    const flags = caseSensitive ? 'g' : 'gi';
    return new RegExp(`(${escaped.join('|')})`, flags);
  }, [tokens, caseSensitive]);

  const content = [];
  let lastIndex = 0;
  let match;
  let partIndex = 0;

  // Metni parçalara ayır ve highlight parçalarını sarmala
  while ((match = pattern.exec(children)) !== null) {
    const start = match.index;
    const end = start + match[0].length;

    if (start > lastIndex) {
      content.push(
        <Text key={`t-${partIndex++}`}>{children.slice(lastIndex, start)}</Text>
      );
    }

    const matchedText = match[0];

    if (typeof renderHiglight === 'function') {
      const node = renderHiglight(matchedText, partIndex);
      content.push(
        React.isValidElement(node)
          ? React.cloneElement(node, { key: `h-${partIndex++}` })
          : <Text key={`h-${partIndex++}`}>{String(node)}</Text>
      );
    } else {
      content.push(
        <Text key={`h-${partIndex++}`} style={{ color: processColorValue(color) }}>
          {matchedText}
        </Text>
      );
    }

    lastIndex = end;
  }

  if (lastIndex < children.length) {
    content.push(
      <Text key={`t-${partIndex++}`}>{children.slice(lastIndex)}</Text>
    );
  }

  return (
    <Text style={[styles.container, style]} {...rest}>
      {content}
    </Text>
  );
};

Highlight.propTypes = HighlightPropTypes;

export default Highlight;