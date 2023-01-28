import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, useTheme } from 'react-native-paper'
import { Styles } from '../constants/Styles'

export default function HeaderGrid({ title, onPress, sending, showButton, titleButton, iconButton }) {

    const theme = useTheme()
    const titleBtn = titleButton ? titleButton : "Agregar"
    const iconBtn = iconButton ? iconButton : "plus"

    const styleInternal = showButton ? { ...styles.content } : { ...styles.contentCenter }

    return (
        <View style={styleInternal}>
            <Text style={{ ...Styles.title, marginTop: 5, marginLeft: 5, color: theme.colors.primary }}>{title}</Text>
            {showButton &&
                <Button
                    icon={iconBtn}
                    mode="contained"
                    uppercase={false}
                    loading={sending}
                    disabled={sending}
                    style={styles.buttonPlus}
                    onPress={item => {
                        onPress(item)
                    }}
                >
                    {titleBtn}
                </Button>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 3
    },
    contentCenter: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonPlus: {
        borderRadius: 10,
        height: 40
    }
})