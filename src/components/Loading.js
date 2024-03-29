import React, { useEffect } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'

export default function Loading() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../images/icon.png')} />
            <Animatable.Text animation="bounceInLeft" duration={5000} style={styles.text}>
                ¡Crea tu propia tienda en línea!
            </Animatable.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0'
    },
    image: {
        width: '85%',
        resizeMode: 'contain',
        marginTop: -380
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#053e66',
        marginTop: -350
    }
})
