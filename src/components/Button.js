import React from 'react'
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from './'
import { colors, constants, styleApp } from '../configs'

/**
 * 
 * @param 
 * @return <View/>
 */

let ButtonApp = ({
    style,
    title,
    border,
    backgroundColor,
    onPress,
    disable,
    children,
    width
}) => {
    return (
        <TouchableOpacity
            disabled={disable}
            activeOpacity={constants.opacity}
            onPress={onPress}
            style={[
                styles.constant,
                {
                    borderRadius: border ? constants.btnHeight / 2 : undefined,
                    borderWidth: border ? backgroundColor != colors.white ? 0 : constants.border : 0,
                    borderColor: colors.border,
                    backgroundColor,
                    width
                },
                style]}>
            <Text
                color={backgroundColor != colors.white ? colors.white : colors.text}
                text={title}
                fontSize={constants.font.nomal} />
            {children}
        </TouchableOpacity>
    )
}

let styles = StyleSheet.create({
    constant: {
        paddingHorizontal: constants.padHor,
        height: constants.btnHeight,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        ...styleApp.shadow
    },
    constantLeft: {
        flexDirection: 'row'
    }
})

ButtonApp.propTypes = {
    title: PropTypes.string,
}

ButtonApp.defaultProps = {
    border: true,
    backgroundColor: colors.access
}


export default ButtonApp