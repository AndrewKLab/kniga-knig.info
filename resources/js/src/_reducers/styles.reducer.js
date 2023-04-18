import { stylesConstants } from '../_constants';

const currentTheme = localStorage.getItem('theme') || 'light'


const initialState = {
    currentTheme: currentTheme,
    themes: {
        light: {
            // 'primary-light-color': '255, 255, 255',
            'primary-main-color': '101, 182, 88',
            'text-color-light': '29, 248, 226',
            'text-color': '39, 22, 23',
            'border-color': '39, 22, 23',
            'icon-color-light': '229, 248, 226',
            // 'primary-dark-color': '253, 223, 89',
            'background-color': '255, 255, 255',
            'background-color-light': '255, 255, 255',

            'list-circle-url': 'url("https://kniga-knig.info/assets/icons/EllipseDark.svg")',

            // 'text-light': '255, 255, 255',
            // 'text-dark': '34, 62, 84',

            'alert-danger-background-color': '253, 236, 234',
            'alert-danger-text-color': '97, 26, 21',
            'alert-danger-icon-color': '244, 67, 54',

            // 'background-color-light': '245, 245, 245',
            // 'background-color-dark': '238, 238, 238',
            // 'background-color-disabled': '228, 231, 234',

            // 'border-color': '232, 232, 232'

            'drawer-background-color': '229, 248, 226',
        },
        dark: {
            // 'primary-light-color': '253, 223, 89',
            'primary-main-color': '9, 21, 7',
            'text-color-light': '255, 255, 255',
            'text-color': '229, 248, 226',
            'border-color': '192, 200, 191',
            'icon-color-light': '229, 248, 226',
            // 'primary-dark-color': '255, 255, 255',
            'background-color': '9, 21, 7',
            'background-color-light': '42, 51, 41',

            'list-circle-url': 'url("https://kniga-knig.info/assets/icons/EllipseLight.svg")',

            // 'text-light': '66, 66, 66',
            // 'text-dark': '255, 255, 255',

            'alert-danger-background-color': '244, 67, 54',
            'alert-danger-text-color': '255, 255, 255',
            'alert-danger-icon-color': '255, 255, 255',

            // 'background-color-light': '52, 86, 104',
            // 'background-color-dark': '33, 66, 85',
            // 'background-color-disabled': '89, 89, 89',

            // 'border-color': '10, 43, 62',

            'drawer-background-color': '39, 22, 23',
        }
    }
};


export function style(state = initialState, action) {
    switch (action.type) {
        case stylesConstants.SET_THEME:
            return {
                ...state,
                currentTheme: action.theme.currentTheme,
                themes: action.theme.themes,
            };
        default:
            return state
    }
}