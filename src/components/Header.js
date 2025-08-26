import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme } from 'react-native-paper'

export default function Header() {

    const theme = useTheme()

    return (
        <>
            <StatusBar translucent backgroundColor="#053e66" />
            <LinearGradient colors={['#b8d5e9', '#F3F3F3']}>
                <View style={styles.header}>
                    <View style={styles.headerTitle}>
                        <Image
                            source={require('../images/icon.png')}
                            style={styles.image}
                        />
                    </View>
                </View>
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        // backgroundColor: "#f3f3f3",
        height: "30%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 60
    },
    headerTitle: {
        // flexDirection: "row",
        // marginTop: 0,
        // width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 150,
        width: 150,
        marginTop: '-5%',
    },
    title: {
        fontSize: 30,
        color: "#FFF",
        fontWeight: "bold",
        marginLeft: 10
    },
    gradient: {
        backgroundColor: "#FFFFFF"
    }
})