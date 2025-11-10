import React from 'react';
import { View, Modal as RNModal, Pressable, Animated, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { MenuPropTypes, MenuDefaultProps } from './types';

const MenuTarget = ({ children }) => children;
MenuTarget.displayName = 'MenuTarget';

const MenuDropdown = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};
MenuDropdown.displayName = 'MenuDropdown';

const ARROW_SIZE = 12;
const SCREEN_MARGIN = 8;

const Menu = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles(themeMode);

  const {
    width,
    height,
    maxWidth,
    maxHeight,
    borderRadius,
    defaultOpened,
    disabled,
    withArrow,
    children,
    ...rest
  } = { ...MenuDefaultProps, ...props };

  const [open, setOpen] = React.useState(!!defaultOpened);
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;
  const targetRef = React.useRef(null);
  const dropdownLayoutRef = React.useRef({ width: 0, height: 0 });

  const [targetRect, setTargetRect] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const [dropdownPos, setDropdownPos] = React.useState({
    top: 0,
    left: 0,
    openDirection: 'down', // 'down' | 'up'
    align: 'left', // 'left' | 'right'
  });

  const window = Dimensions.get('window');

  const childrenArray = React.Children.toArray(children);
  const targetChild = childrenArray.find((c) => c?.type?.displayName === 'MenuTarget');
  const dropdownChild = childrenArray.find((c) => c?.type?.displayName === 'MenuDropdown');

  const measureTarget = React.useCallback(() => {
    if (targetRef.current && targetRef.current.measureInWindow) {
      targetRef.current.measureInWindow((x, y, w, h) => {
        setTargetRect({ x, y, width: w, height: h });
      });
    }
  }, []);

  React.useEffect(() => {
    if (open) {
      overlayOpacity.setValue(0);
      Animated.sequence([
        Animated.delay(120),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Menü açılırken target'ı ölç
      setTimeout(measureTarget, 0);
    } else {
      overlayOpacity.setValue(0);
    }
  }, [open, measureTarget, overlayOpacity]);

  const resolveSize = (value, fallbackPx) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      if (value.endsWith('%')) {
        const pct = parseFloat(value);
        return Math.max(0, Math.min(window.width, (pct / 100) * window.width));
      }
      if (value === 'auto') return fallbackPx;
    }
    return fallbackPx;
  };

  const computePosition = React.useCallback(() => {
    const contentW = resolveSize(width, dropdownLayoutRef.current.width || 0);
    const contentH = resolveSize(height, dropdownLayoutRef.current.height || 0);
    const maxW = resolveSize(maxWidth, window.width * 0.9);
    const maxH = resolveSize(maxHeight, window.height * 0.9);

    const dw = Math.min(contentW || maxW, maxW);
    const dh = Math.min(contentH || maxH, maxH);

    // Varsayılan hizalama: sol
    let left = targetRect.x;
    let align = 'left';
    // Eğer sağa taşarsa sağa hizala
    if (left + dw + SCREEN_MARGIN > window.width) {
      left = Math.max(SCREEN_MARGIN, targetRect.x + targetRect.width - dw);
      align = 'right';
    } else {
      left = Math.max(SCREEN_MARGIN, left);
    }

    // Varsayılan açılma yönü: aşağı
    let top = targetRect.y + targetRect.height + ARROW_SIZE;
    let openDirection = 'down';
    // Eğer alta taşarsa yukarı aç
    if (top + dh + SCREEN_MARGIN > window.height) {
      top = Math.max(SCREEN_MARGIN, targetRect.y - dh - ARROW_SIZE);
      openDirection = 'up';
    }

    setDropdownPos({ top, left, openDirection, align });
  }, [height, maxHeight, maxWidth, width, targetRect, window.height, window.width]);

  // Dropdown ölçüldüğünde pozisyonu yeniden hesapla
  const onDropdownLayout = React.useCallback((e) => {
    const { width: lw, height: lh } = e.nativeEvent.layout;
    dropdownLayoutRef.current = { width: lw, height: lh };
    computePosition();
  }, [computePosition]);

  const bgColor = processColorValue(themeMode?.colors?.menu?.backgroundColor) || themeMode?.colors?.white || '#fff';
  const borderColor = processColorValue(themeMode?.colors?.gray?.[2]) || themeMode?.colors?.gray?.[2];

  const arrowStyle = (() => {
    const base = {
      width: ARROW_SIZE,
      height: ARROW_SIZE,
      backgroundColor: bgColor,
      position: 'absolute',
      transform: [{ rotate: '45deg' }],
      borderTopLeftRadius: 2,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderColor: themeMode?.colors?.border?.light || borderColor,
    };
    if (dropdownPos.openDirection === 'down') {
      return {
        ...base,
        top: dropdownPos.top - ARROW_SIZE / 2,
        left:
          dropdownPos.align === 'left'
            ? Math.max(SCREEN_MARGIN, targetRect.x + targetRect.width / 2 - ARROW_SIZE / 2)
            : Math.min(
                window.width - SCREEN_MARGIN - ARROW_SIZE,
                targetRect.x + targetRect.width / 2 - ARROW_SIZE / 2
              ),
      };
    }
    // yukarı açılıyorsa, ok aşağıyı gösterecek şekilde dropdown'ın altına
    return {
      ...base,
      top: dropdownPos.top + resolveSize(height, dropdownLayoutRef.current.height || 0) + ARROW_SIZE / 2,
      left:
        dropdownPos.align === 'left'
          ? Math.max(SCREEN_MARGIN, targetRect.x + targetRect.width / 2 - ARROW_SIZE / 2)
          : Math.min(
              window.width - SCREEN_MARGIN - ARROW_SIZE,
              targetRect.x + targetRect.width / 2 - ARROW_SIZE / 2
            ),
    };
  })();

  const dropdownContainerStyle = [
    styles.dropdownContainer,
    {
      top: dropdownPos.top,
      left: dropdownPos.left,
      borderRadius,
      backgroundColor: bgColor,
      borderColor,
      maxWidth: resolveSize(maxWidth, window.width * 0.9),
      maxHeight: resolveSize(maxHeight, window.height * 0.9),
      width: width ? resolveSize(width, dropdownLayoutRef.current.width || undefined) : undefined,
      height: height ? resolveSize(height, dropdownLayoutRef.current.height || undefined) : undefined,
      opacity: 1,
    },
  ];

  const shouldShowArrow = !!withArrow && targetRect.width > 0;

  const handleToggle = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const handleClose = () => setOpen(false);

  // Dropdown içindeki etkileşimli öğelerin onPress'ini yakalayıp orijinali çalıştırdıktan sonra kapat
  const enhanceChildrenWithClose = React.useCallback((nodes) => {
    return React.Children.map(nodes, (child) => {
      if (!React.isValidElement(child)) return child;

      const hasOnPress = typeof child.props?.onPress === 'function';
      const nextProps = {};

      if (hasOnPress) {
        nextProps.onPress = (...args) => {
          try {
            child.props.onPress?.(...args);
          } finally {
            handleClose();
          }
        };
      }

      if (child.props?.children) {
        nextProps.children = enhanceChildrenWithClose(child.props.children);
      }

      return React.cloneElement(child, nextProps);
    });
  }, []);

  // Target içindeki etkileşimli öğelerin onPress'ini yakalayıp orijinali çalıştırdıktan sonra toggle et
  const enhanceTargetChildrenWithToggle = React.useCallback((nodes) => {
    if (disabled) return nodes;
    return React.Children.map(nodes, (child) => {
      if (!React.isValidElement(child)) return child;

      const hasOnPress = typeof child.props?.onPress === 'function';
      const nextProps = {};

      // Hem orijinal onPress varsa onu çalıştır, ardından toggle et
      // Orijinal onPress yoksa sadece toggle ekle
      nextProps.onPress = (...args) => {
        try {
          if (hasOnPress) child.props.onPress?.(...args);
        } finally {
          handleToggle();
        }
      };

      if (child.props?.children) {
        nextProps.children = enhanceTargetChildrenWithToggle(child.props.children);
      }

      return React.cloneElement(child, nextProps);
    });
  }, [disabled]);

  // Hedef ve dropdown çocuklarını render et
  return (
    <View {...rest}>
      {targetChild ? (
        <Pressable
          ref={targetRef}
          onLayout={() => {}}
          onPress={handleToggle}
        >
          {enhanceTargetChildrenWithToggle(targetChild.props.children)}
        </Pressable>
      ) : null}

      <RNModal
        visible={open && !!dropdownChild}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        {/* Dış overlay: tıklanınca kapanır */}
        <Pressable
          style={{ flex: 1 }}
          onPress={handleClose}
        >
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "transparent",
              opacity: overlayOpacity,
            }}
          />
          {/* İçerik: konumlandırılmış dropdown; içerik tıklanınca da kapanır (boş alana tıklamada) */}
          <Pressable
            style={dropdownContainerStyle}
            onPress={handleClose}
            onLayout={onDropdownLayout}
          >
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={true}
              style={{ flexGrow: 0 }}
            >
              {enhanceChildrenWithClose(dropdownChild?.props?.children)}
            </ScrollView>
          </Pressable>

          {/* Ok */}
          {shouldShowArrow ? <View style={arrowStyle} /> : null}
        </Pressable>
      </RNModal>
    </View>
  );
};

Menu.propTypes = MenuPropTypes;
Menu.defaultProps = MenuDefaultProps;
Menu.Target = MenuTarget;
Menu.Dropdown = MenuDropdown;

export default Menu;