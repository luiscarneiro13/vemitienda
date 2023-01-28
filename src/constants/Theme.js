import { DefaultTheme } from 'react-native-paper'

const THEME = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#053e66',
        primary1: '#3FA9F5',
        secondary: '#333333',
        errors:'#f9672e',
        background: '#F3F3F3',
    },
}

module.exports = { THEME }