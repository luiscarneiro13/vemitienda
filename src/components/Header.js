import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function Header() {

    const colors = ["rgba(42,174,124,1)", "transparent"]

    return (
        <>
            <LinearGradient colors={colors} style={styles.gradient} />
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Image
                        source={require('../images/icon.png')}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Mis Plantitas</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00a46c",
        height: "24%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
    },
    headerTitle: {
        flexDirection: "row",
        marginTop: 45,
        width: "100%",
    },
    image: {
        height: 80,
        width: 80,
        marginTop: '-5%',
    },
    title: {
        fontSize: 30,
        color: "#FFF",
        fontWeight: "bold",
        marginLeft: 10
    },
    gradient: {
        zIndex: -1000
    }
})