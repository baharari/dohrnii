import React from 'react';
import { Modal as RNModal, View, Animated, Pressable, Dimensions } from 'react-native';
import Text from '../Text/Text';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles from './styles';
import { ModalPropTypes, ModalDefaultProps } from './types';

const Modal = (props) => {
  const { theme: themeMode } = useTheme();
  const styles = createStyles(themeMode);
  
  const merged = { ...ModalDefaultProps, ...props };
  const {
    opened,
    onClose,
    title,
    hideHeader,
    borderRadius,
    overlayColor,
    mode,
    position,
    overlayClose,
    style,
    bodyStyle,
    headerStyle,
    children,
    ...rest
  } = merged;
  
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  // Overlay opaklığı (fade)
  const overlayOpacity = React.useRef(new Animated.Value(0)).current;
  
  // Drawer için kaydırma değeri
  const drawerTranslate = React.useRef(new Animated.Value(0)).current;
  
  // RN Modal görünürlük (kapanış animasyonunu tamamlamak için internal visible)
  const [visible, setVisible] = React.useState(false);
  
  // Pozisyona göre başlangıç ofseti
  const getInitialOffset = React.useCallback(() => {
    switch (position) {
      case 'left':
      return { axis: 'x', value: -screenWidth };
      case 'right':
      return { axis: 'x', value: screenWidth };
      case 'top':
      return { axis: 'y', value: -screenHeight };
      case 'bottom':
      default:
      return { axis: 'y', value: screenHeight };
    }
  }, [position, screenWidth, screenHeight]);
  
  // Başlangıç ofsetini ve driver'ı ayarla
  React.useEffect(() => {
    if (mode === 'drawer') {
      const { value } = getInitialOffset();
      drawerTranslate.setValue(value);
    } else {
      drawerTranslate.setValue(0);
    }
  }, [mode, getInitialOffset, drawerTranslate]);
  
  // Açılma/kapanma animasyonları
  React.useEffect(() => {
    if (opened) {
      setVisible(true);
      overlayOpacity.setValue(0);
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      
      if (mode === 'drawer') {
        const { value } = getInitialOffset();
        drawerTranslate.setValue(value);
        Animated.timing(drawerTranslate, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }).start();
      }
    } else {
      // Kapanışta önce animasyonları çalıştır, bitince Modal'ı kapat
      const animations = [
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }),
      ];
      
      if (mode === 'drawer') {
        const { value } = getInitialOffset();
        animations.push(
          Animated.timing(drawerTranslate, {
            toValue: value,
            duration: 200,
            useNativeDriver: true,
          })
        );
      }
      
      Animated.parallel(animations).start(() => {
        setVisible(false);
      });
    }
  }, [opened, mode, getInitialOffset, overlayOpacity, drawerTranslate]);
  
  const resolvedOverlayColor = processColorValue(
    overlayColor || themeMode?.colors?.overlayColor
  );
  
  // Drawer konumuna göre wrapper hizalaması
  const getDrawerWrapperStyle = React.useCallback(() => {
    switch (position) {
      case 'left':
      return { justifyContent: 'center', alignItems: 'flex-start' };
      case 'right':
      return { justifyContent: 'center', alignItems: 'flex-end' };
      case 'top':
      return { justifyContent: 'flex-start', alignItems: 'center'};
      case 'bottom':
      default:
      return { justifyContent: 'flex-end', alignItems: 'center' };
    }
  }, [position]);
  // Drawer konumuna göre wrapper hizalaması
  const getRadiusStyle = React.useCallback(() => {
    switch (position) {
      case 'left':
      return { borderTopRightRadius: borderRadius, borderBottomRightRadius: borderRadius };
      case 'right':
      return { borderTopLeftRadius: borderRadius, borderBottomLeftRadius: borderRadius };
      case 'top':
      return { borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius };
      case 'bottom':
      return { borderTopRightRadius: borderRadius, borderTopLeftRadius: borderRadius };
      default:
      return { borderRadius: borderRadius };
    }
  }, [position]);
  
  // Drawer içerik transform’u
  const drawerTransformStyle =
  mode === 'drawer'
  ? getInitialOffset().axis === 'x'
  ? { transform: [{ translateX: drawerTranslate }], height: "100%", paddingTop: 60, maxWidth: "100%", minWidth: "60%" }
  : { transform: [{ translateY: drawerTranslate }], width: "100%", maxHeight: "90%", paddingTop: position === "top" ? 60 : 0 }
  : null;
  
  
  return (
    <RNModal
    transparent
    visible={visible}
    animationType="fade" // Animasyonu kendimiz yönetiyoruz
    onRequestClose={onClose}
    {...rest}
    >
    <View style={styles.root}>
    {/* Overlay: fade ile renk görünür, tıklamayla kapatma (overlayClose=true) */}
    <Animated.View
    style={[
      styles.overlay,
      {
        backgroundColor: resolvedOverlayColor,
        opacity: overlayOpacity,
      },
    ]}
    />
    <Pressable
    style={styles.overlay}
    onPress={() => {
      if (overlayClose) onClose?.();
    }}
    />
    
    {/* İçerik yerleştirme */}
    {mode === 'drawer' ? (
      <View style={[styles.drawerWrapper, getDrawerWrapperStyle()]}>
      <Animated.View style={[styles.contentBase, getRadiusStyle(), drawerTransformStyle, style]}>
      {!hideHeader && (
        <View style={[styles.header, headerStyle]}>
        <Text style={styles.title}>{title}</Text>
        <Pressable accessibilityRole="button" style={styles.closeButton} onPress={onClose}>
        <Text>✕</Text>
        </Pressable>
        </View>
      )}
      <View style={[{ paddingHorizontal: 24, paddingVertical: 24, paddingTop: 0 }, bodyStyle]}>
      {children}
      </View>
      </Animated.View>
      </View>
    ) : (
      <View style={styles.centerWrapper}>
      <View style={[styles.contentBase, { borderRadius, width: '100%' }, style]}>
      {!hideHeader && (
        <View style={[styles.header, headerStyle]}>
        <Text style={styles.title}>{title}</Text>
        <Pressable accessibilityRole="button" style={styles.closeButton} onPress={onClose}>
        <Text>✕</Text>
        </Pressable>
        </View>
      )}
      <View style={[{ paddingHorizontal: 24, paddingVertical: 12, paddingTop: 0 }, bodyStyle]}>
      {children}
      </View>
      </View>
      </View>
    )}
    </View>
    </RNModal>
  );
};

Modal.propTypes = ModalPropTypes;

export default Modal;