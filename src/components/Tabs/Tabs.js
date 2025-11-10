import React from 'react';
import { View, TouchableOpacity, Animated, Pressable } from 'react-native';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import List from './List';
import Tab from './Tab';
import Panel from './Panel';
import { spacing } from '../../constants';

const Tabs = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles(themeMode);
  
  const {
    defaultValue,
    value,
    onChange,
    theme = 'default',
    variant = 'solid',
    borderRadius = spacing.borderRadius.m,
    backgroundColor, // Tabs.List BG
    color,           // indicator/accent color
    size = 'md',  
    style,
    children,
    ...rest
  } = props;
  
  const SIZE_METRICS = {
    sm: {
      listPad: 3,
      tabPadH: 8,
      tabPadV: 6,
      fontSize: themeMode?.typography?.fontSize?.s || 12,
    },
    md: {
      listPad: 4,
      tabPadH: 12,
      tabPadV: 8,
      fontSize: themeMode?.typography?.fontSize?.m || 14,
    },
    lg: {
      listPad: 4,
      tabPadH: 12,
      tabPadV: 8,
      fontSize: themeMode?.typography?.fontSize?.l || 16,
    },
  };
  const sizeMetrics = SIZE_METRICS[size] || SIZE_METRICS.md;
  
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const activeValue = isControlled ? value : internalValue;
  
  const accentColor =
  color ? processColorValue(color) : theme ?
      (theme === 'default' ? themeMode?.colors?.tabs[variant]?.indicatorColor : styles.getVariant(variant, theme).tab.color) :
  themeMode?.colors?.white;
  
  const listBackground =
    backgroundColor ? processColorValue(backgroundColor) : theme ? (theme === "default" ? themeMode?.colors?.tabs[variant]?.backgroundColor : styles.getVariant(variant, theme).tab.backgroundColor) :
  themeMode?.colors?.gray?.[1];
  
  const textColor =
  theme === "default" ? themeMode?.colors?.tabs[variant]?.color : styles.getVariant(variant, theme).text.color;
  
  const handleChange = (next) => {
    if (!isControlled) setInternalValue(next);
    if (onChange) onChange(next);
  };
  
  const childrenArray = React.Children.toArray(children);
  
  // Bul: Tabs.List ve içindeki Tabs.Tab
  const listNode = childrenArray.find(
    (child) => child?.type?.displayName === 'TabsList'
  );
  
  const listStyle = listNode?.props?.style;
  
  const tabNodes = listNode
  ? React.Children.toArray(listNode.props.children).filter(
    (c) => c?.type?.displayName === 'TabsTab'
  )
  : [];
  
  // Bul: Panels
  const panelNodes = childrenArray.filter(
    (child) => child?.type?.displayName === 'TabsPanel'
  );
  
  const [listWidth, setListWidth] = React.useState(0);
  const [tabLayouts, setTabLayouts] = React.useState({});
  const indicatorX = React.useRef(new Animated.Value(0)).current;
  const [indicatorWidthNum, setIndicatorWidthNum] = React.useState(0);
  const [indicatorHeightNum, setIndicatorHeightNum] = React.useState(variant === 'solid' ? 0 : 2);
  // ... existing code ...
  
  React.useEffect(() => {
    const activeLayout = tabLayouts[activeValue];
    if (!activeLayout) return;
    
    const nextHeight = variant === 'solid' ? activeLayout.height : 2;
    // width/height değerlerini state ile direkt güncelle (animasyonsuz veya LayoutAnimation ile)
    setIndicatorWidthNum(activeLayout.width);
    setIndicatorHeightNum(nextHeight);
    
    // Sadece translateX’i native driver ile animasyonla
    Animated.timing(indicatorX, {
      toValue: activeLayout.x,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [activeValue, variant, tabLayouts]);
  
  return (
    <View style={[styles.container, style]} {...rest}>
    {/* Tabs.List */}
    <View
    style={[
      styles.list,
      listStyle,
    ]}
    onLayout={(e) => setListWidth(e.nativeEvent.layout.width)}
    >
    
    <View style={{
      position: 'absolute', bottom: 0, height: variant === "solid" ? '100%' : 2, width: listWidth, borderRadius: borderRadius, 
      backgroundColor: listBackground }} />
      
      <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        bottom: variant === 'solid' ? sizeMetrics.listPad : 0,
        height: indicatorHeightNum,   // düz sayı
        width: indicatorWidthNum,     // düz sayı
        backgroundColor: accentColor,
        borderRadius: Math.max(borderRadius - sizeMetrics.listPad, 0),
        transform: [{ translateX: indicatorX }], // sadece transform Animated.Value
        zIndex: 0,
      }}
      />
      
      <View style={{ padding: sizeMetrics.listPad, flexDirection: 'row' }} >
      
      {tabNodes.map((tab) => {
        const { value: tabValue, disabled, style: tabStyle } = tab.props;
        const active = activeValue === tabValue;
        
        return (
          <Pressable
          key={String(tabValue)}
          activeOpacity={disabled ? 1 : 0.7}
          onPress={() => (disabled ? null : handleChange(tabValue))}
          style={[
            styles.tabBase,
            {
              zIndex: 1, 
              paddingHorizontal: sizeMetrics.tabPadH,
              paddingVertical: sizeMetrics.tabPadV,
            },
            disabled && styles.tabDisabled,
            tabStyle,
            
          ]}
          onLayout={(e) => {
            const { x, width, height } = e.nativeEvent.layout;
            setTabLayouts((prev) => ({
              ...prev,
              [tabValue]: { x, width, height },
            }));
          }}
          >
          <View style={styles.tabInnerRow}>
          {typeof tab.props.children === 'string' ? (
            <Text
            fontWeight={'500'}
            style={[styles.tabText, { color: active ? textColor : themeMode.colors.text.darkgray, fontSize: sizeMetrics.fontSize }]}
            >
            {tab.props.children}
            </Text>
          ) : (
            tab.props.children
          )}
          </View>
          
          
          </Pressable>
        );
      })}
      </View>
      </View>
      
      {/* Panels */}
      <View style={styles.panels}>
      {panelNodes.map((panel) => {
        const { value: panelValue, style: panelStyle } = panel.props;
        if (panelValue !== activeValue) return null;
        
        return (
          <View key={String(panelValue)} style={[styles.panel, panelStyle]}>
          {panel.props.children}
          </View>
        );
      })}
      </View>
      </View>
    );
  };
  
  Tabs.List = List;
  Tabs.Tab = Tab;
  Tabs.Panel = Panel;
  
  export default Tabs;