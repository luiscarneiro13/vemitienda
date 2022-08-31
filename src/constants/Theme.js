import { DefaultTheme } from 'react-native-paper'

const THEME = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: 'green',
        secondary: '#333333',
        background: '#FFFFFF',
    },
}

module.exports = { THEME }