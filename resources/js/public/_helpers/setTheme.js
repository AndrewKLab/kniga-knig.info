export const setTheme = (currentTheme, themes) => {
    const theme = themes[currentTheme];
    Object.keys(theme).forEach((key) => {
        const cssKey = `--${key}`;
        const cssValue = theme[key];
        document.documentElement.style.setProperty(cssKey, cssValue)
    })
}