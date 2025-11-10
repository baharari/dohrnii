import React, { useMemo } from 'react';
import { View, Platform } from 'react-native';
import { useTheme } from '../../providers';
import { processColorValue } from '../../theme';
import createStyles, { getShadowPresets } from './styles';
import { CardPropTypes, CardDefaultProps } from './types';


const Card = (props) => {
    const { theme: themeMode } = useTheme();
    const styles = createStyles(themeMode);
    const shadowPresets = getShadowPresets(themeMode);
    const {
        style,
        shadow,
        bg,
        shadowColor,
        shadowOffset,
        shadowOpacity,
        shadowRadius,
        borderRadius,
        p,
        px,
        py,
        children,
        ...rest
    } = { ...CardDefaultProps, ...props };
    
    // Seçilen preset
    const preset = shadowPresets[shadow] || shadowPresets.md;
   
    // Kullanıcının verdiği değerler preset’i override etsin
    const finalShadow = useMemo(() => {
        return {
            color: shadowColor ?? preset.color,
            offset: {
                x: (shadowOffset?.x ?? preset.offset.x),
                y: (shadowOffset?.y ?? preset.offset.y),
            },
            opacity: shadowOpacity ?? preset.opacity,
            radius: shadowRadius ?? preset.radius,
            elevation: preset.elevation, // Android için
        };
    }, [shadowColor, shadowOffset, shadowOpacity, shadowRadius, preset]);
    
    const paddingStyle = {
        padding: p,
        paddingHorizontal: px,
        paddingVertical: py,
    };
 
    const shadowStyle = Platform.select({
        ios: {
            shadowColor: processColorValue(finalShadow.color),
            shadowOpacity: finalShadow.opacity,
            shadowRadius: finalShadow.radius,
            shadowOffset: { width: finalShadow.offset.x, height: finalShadow.offset.y },
        },
        android: {
            elevation: finalShadow.elevation,
            // Android’de shadowColor/effect sınırlıdır; elevation yeterli
        },
        default: {},
    });

    
    const containerStyle = [
        styles.container,
        { borderRadius },
        bg && { backgroundColor: processColorValue(bg) },
        paddingStyle,
        shadowStyle,
        style,
    ];
    
    return (
        <View style={containerStyle} {...rest}>
        {children}
        </View>
    );
};

Card.propTypes = CardPropTypes;

export default Card;