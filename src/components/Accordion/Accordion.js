import React from 'react';
import { View, Pressable, Animated, Image } from 'react-native';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { AccordionPropTypes, AccordionDefaultProps } from './types';
import Item from './Item';
import Control from './Control';
import Panel from './Panel';

const defaultChevron = require('../../assets/icons/chevron-down.png');


const Accordion = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles(themeMode);

  const {
    variant,
    borderRadius,
    defaultValue,
    value,
    onChange,
    multiple,
    style,
    children,
    ...rest
  } = { ...AccordionDefaultProps, ...props };

  // Controlled / uncontrolled durum
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);

  const getActiveValues = React.useCallback(() => {
    if (multiple) {
      const vals = isControlled ? value : internal;
      return Array.isArray(vals) ? vals : vals != null ? [vals] : [];
    }
    const val = isControlled ? value : internal;
    return val != null ? [val] : [];
  }, [multiple, isControlled, value, internal]);

  const setActive = React.useCallback(
    (nextValue) => {
      if (multiple) {
        const current = getActiveValues();
        const exists = current.includes(nextValue);
        const newValues = exists ? current.filter((v) => v !== nextValue) : [...current, nextValue];
        if (!isControlled) setInternal(newValues);
        onChange?.(newValues);
      } else {
        const current = getActiveValues()[0];
        const newValue = current === nextValue ? undefined : nextValue;
        if (!isControlled) setInternal(newValue);
        onChange?.(newValue);
      }
    },
    [multiple, isControlled, onChange, getActiveValues]
  );

  // Çocukları ayrıştır: sadece Accordion.Item'ları
  const items = React.Children.toArray(children).filter(
    (child) => child && child.type && child.type.displayName === 'AccordionItem'
  );

  // Varyant stilini al
  const variantStyle = styles.getVariant(variant);
  const base = styles.base;

  return (
    <View style={[base.container, style]} {...rest}>
      {items.map((item, idx) => {
        const itemValue = item.props.value;
        const disabled = !!item.props.disabled;
        const itemStyle = item.props.style;

        const childNodes = React.Children.toArray(item.props.children);
        const controlNode = childNodes.find((c) => c?.type?.displayName === 'AccordionControl');
        const panelNode = childNodes.find((c) => c?.type?.displayName === 'AccordionPanel');

        const isActive = getActiveValues().includes(itemValue);

        return (
          <AccordionItemWithAnimation
            key={String(itemValue) || `item-${idx}`}
            isActive={isActive}
            disabled={disabled}
            itemValue={itemValue}
            setActive={setActive}
            borderRadius={borderRadius}
            base={base}
            variantStyle={variantStyle}
            itemStyle={itemStyle}
            controlNode={controlNode}
            panelNode={panelNode}
          />
        );
      })}
    </View>
  );
};

// Animasyonlu item bileşeni
const AccordionItemWithAnimation = ({
  isActive,
  disabled,
  itemValue,
  setActive,
  borderRadius,
  base,
  variantStyle,
  itemStyle,
  controlNode,
  panelNode,
}) => {
  const animatedHeight = React.useRef(new Animated.Value(0)).current;
  const animatedOpacity = React.useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = React.useState(0);
  const [measured, setMeasured] = React.useState(false);

  React.useEffect(() => {
    if (isActive && contentHeight > 0) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: contentHeight,
          duration: 300,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
        }),
      ]).start();
    } else if (!isActive) {
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 300,
        }),
      ]).start();
    }
  }, [isActive, contentHeight]);

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && !measured) {
      setContentHeight(height);
      setMeasured(true);
    }
  };

  return (
    <View
      style={[
        base.item,
        { borderRadius },
        variantStyle.item,
        variantStyle.item && {
          backgroundColor: processColorValue(variantStyle.item.backgroundColor),
          borderColor: processColorValue(variantStyle.item.borderColor),
        },
        isActive && variantStyle.activeItem && {
          backgroundColor: processColorValue(variantStyle.activeItem.backgroundColor),
        },
        itemStyle,
      ]}
    >
      {/* Control */}
      <Pressable
        disabled={disabled}
        onPress={() => (disabled ? null : setActive(itemValue))}
        style={[base.controlBase, disabled && base.disabled, variantStyle.control]}
      >
        {controlNode
          ? typeof controlNode.props.children === 'string'
            ? (
              <Text style={base.controlText}>
                {controlNode.props.children}
              </Text>
            ) : (
              controlNode.props.children
            )
          : null}
        <Image
          source={defaultChevron}
          style={base.chevron}
          resizeMode="contain"
        />
      </Pressable>

      {/* Animated Panel */}
      <Animated.View
        style={{
          height: animatedHeight,
          opacity: animatedOpacity,
          overflow: 'hidden',
        }}
      >
        <View
          style={[
            base.panelBase,
            variantStyle.panel,
            disabled && base.disabled,
            panelNode?.props?.style,
          ]}
        >
          {panelNode ? panelNode.props.children : null}
        </View>
      </Animated.View>

      {/* Gizli ölçüm view'ı */}
      <View
        style={{
          position: 'absolute',
          opacity: 0,
          zIndex: -1,
        }}
        onLayout={handleLayout}
      >
        <View
          style={[
            base.panelBase,
            variantStyle.panel,
            disabled && base.disabled,
            panelNode?.props?.style,
          ]}
        >
          {panelNode ? panelNode.props.children : null}
        </View>
      </View>
    </View>
  );
};

Accordion.propTypes = AccordionPropTypes;

Accordion.Item = Item;
Accordion.Control = Control;
Accordion.Panel = Panel;

export default Accordion;