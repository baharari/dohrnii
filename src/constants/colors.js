export const THEME_COLOR = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    ORANGE: 'orange',
    YELLOW: 'yellow',
    GREEN: 'green',
    BLUE: 'blue',
    PURPLE: 'purple',
    PINK: 'pink',
    RED: 'red',
    GRAY: 'gray',
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
};
export const extendThemeColorConstants = (baseColorsOrNames) => {
    // baseColorsOrNames bir obje ise anahtarları al, dizi ise direkt kullan
    const names = Array.isArray(baseColorsOrNames)
        ? baseColorsOrNames
        : Object.keys(baseColorsOrNames || {});

    names.forEach((name) => {
        if (!name) return;
        const upper = String(name).toUpperCase();
        if (!(upper in THEME_COLOR)) {
            THEME_COLOR[upper] = name;
        }
    });

    return THEME_COLOR;
  };
export default THEME_COLOR;