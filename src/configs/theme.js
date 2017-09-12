import { Platform, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

const colors = {
    primary: '#edbbd0',
    secondary: '#B3D9CE',
    bg_app: '#F7F7F7',
    access: '#71C7B8',
    text: '#191919',
    disable: '#cccccc',
    border: '#bababa',
    error: '#db2828',
    green: '#00551e',
    brown: '#693504',
    red: '#db2828',
    white: '#f9f9f9',
    black: '#0f0f0f'
}

const constants = {
    appWidth: width < height ? width : height,
    appHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 48 : 48,
    statusBarHeight: Platform.OS === 'ios' ? 22 : 22,
    padHor: 8,
    padVer: 4,
    pad: 4,
    opacity: .6,
    border: 0.7,
    borderRadius: 6,
    font: {
        sub: 14,
        nomal: 16,
        dialog: 22,
        header: 32,
    },
    fab: 48,
    icon: 36,
    btnHeight: 38,
}

export {
    colors, constants
}