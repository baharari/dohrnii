import { StyleSheet } from 'react-native';

const createStyles = (theme) => {
    const colors = theme?.colors || {};
    
    // Seçili radio için renk şablonları
    const variantTemplates = {
        solid: (colorName) => ({
            backgroundColor: colors[colorName]?.[5],
            borderColor: colors[colorName]?.[5],
            color: colors.white,
        }),
        outline: (colorName) => ({
            backgroundColor: 'transparent',
            borderColor: colors[colorName]?.[5],
            color: colors[colorName]?.[5],
        }),
        ghost: (colorName) => ({
            backgroundColor: colors[colorName]?.[1],
            borderColor: colors[colorName]?.[1],
            color: colors[colorName]?.[7],
        }),
        soft: (colorName) => ({
            backgroundColor: colors[colorName]?.[1],
            borderColor: colors[colorName]?.[1],
            color: colors[colorName]?.[7],
        }),
    };
    
    // Seçili olmayan radio için şablonlar
    const uncheckedVariantTemplates = {
        solid: (colorName) => ({
            backgroundColor: 'transparent',
            borderColor: colors[colorName]?.[1],
        }),
        outline: (colorName) => ({
            backgroundColor: 'transparent',
            borderColor: colors[colorName]?.[1],
        }),
        ghost: (colorName) => ({
            backgroundColor: colors[colorName]?.[1],
            borderColor: colors[colorName]?.[1],
        }),
        soft: (colorName) => ({
            backgroundColor: colors[colorName]?.[1],
            borderColor: colors[colorName]?.[1],
          }),
    };
    
    return StyleSheet.create({
        groupContainer: {
            width: '100%',
        },
        groupHeader: {
            marginBottom: 8,
        },
        groupDescription: {
            marginTop: 2,
            color: colors?.text?.secondary,
        },
        groupList: {
            gap: 8,
        },
        
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        
        // Radio dış çerçevesi
        box: {
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
        },
        
        // Hazır boyutlar: çap (width/height aynı)
        smBox: {
            width: 16,
            height: 16,
            borderRadius: 8,
        },
        mdBox: {
            width: 20,
            height: 20,
            borderRadius: 10,
        },
        lgBox: {
            width: 24,
            height: 24,
            borderRadius: 12,
        },
        
        // İç nokta (default check görseli yerine)
        smDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
        },
        mdDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
        },
        lgDot: {
            width: 12,
            height: 12,
            borderRadius: 6,
        },
        
        label: {
            marginLeft: 8,
            color: colors?.text?.primary,
        },
        disabled: {
            opacity: 0.6,
        },
        
        // Şablon çözümleyiciler
        getTypeVariantStyle: (type, variant) => {
            const fn = variantTemplates[variant];
            return fn ? fn(type) : {};
        },
        getUncheckedStyle: (type, variant) => {
            const fn = uncheckedVariantTemplates[variant];
            return fn ? fn(type) : {};
        },
    });
};

export default createStyles;