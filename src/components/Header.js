import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function Header() {

    const colors = ["rgba(412,119,195,1)", "transparent"]

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient colors={["rgba(412,119,195,1)", "transparent"]} style={styles.gradient} />
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Image
                        source={require('../images/icon.png')}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Ve mi Tienda</Text>
                </View>
                <View style={{ marginTop: -10 }}>
                    <Text style={{ color:'white' }}><Text style={{ fontWeight: 'bold' }}>Contáctanos: </Text>info@vemitienda.online</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#0c77c3",
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