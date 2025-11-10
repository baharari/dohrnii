import { StyleSheet } from 'react-native';

export const getShadowPresets = (theme) => {
    const colors = theme?.colors || {};
    return {
    none: { color: colors?.shadow, offset: { x: 0, y: 0 }, opacity: 0, radius: 0, elevation: 0 },
    sm: { color: colors?.shadow, offset: { x: 0, y: 1 }, opacity: 0.07, radius: 2, elevation: 2 },
    md: { color: colors?.shadow, offset: { x: 0, y: 2 }, opacity: 0.10, radius: 4, elevation: 4 },
    lg: { color: colors?.shadow, offset: { x: 0, y: 8 }, opacity: 0.12, radius: 16, elevation: 8 },
};
};


const createStyles = (theme) => {
    const colors = theme?.colors || {};
    return StyleSheet.create({
        container: {
            backgroundColor: colors?.card?.backgroundColor,
            // Shadow burada uygulanmayacak; Card.js içinde preset + props ile hesaplanır
        },
    });
};

export default createStyles;