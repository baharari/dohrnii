import React from 'react';
import { View, ImageBackground } from 'react-native';
import { useTheme } from '../../providers';
import createStyles from './styles';
import { BackgroundImagePropTypes, BackgroundImageDefaultProps } from './types';

const BackgroundImage = (props) => {
    const { theme: themeMode } = useTheme();
    const styles = createStyles(themeMode);
    
    const {
        src,
        borderRadius,
        style,
        children,
        ...rest
    } = { ...BackgroundImageDefaultProps, ...props };
    
    // src belirleme: string ise uzak URL olarak kabul edilir; boş string ise yok sayılır
    const normalizedSrc = typeof src === 'string' && src.trim().length === 0 ? undefined : src;
    const imageSource =
    typeof normalizedSrc === 'string'
    ? { uri: normalizedSrc }
    : normalizedSrc;
    
    const containerStyle = [
        styles.container,
        { borderRadius: borderRadius },
        style,
    ];
    
    return (
        <View style={containerStyle} {...rest}>
        {imageSource ? (
            <ImageBackground
            source={imageSource}
            style={styles.image}
            imageStyle={{ borderRadius: borderRadius }}
            >
            {children}
            </ImageBackground>
        ) : (
            children
        )}
        </View>
    );
};

BackgroundImage.propTypes = BackgroundImagePropTypes;

export default BackgroundImage;