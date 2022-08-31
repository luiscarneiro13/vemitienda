import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import React from 'react'

export default function Search({ query, onChange }) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar..."
                placeholderTextColor="#b1e5d3"
                style={styles.text}
                value={query || ''}
                onChangeText={(text) => onChange(text)}
            />
            <Image
                source={require('../images/3.png')}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: -5,
        padding: 10
    },
    text: {
        fontSize: 18,
        marginTop: -5
    },
    image: { height: 20, width: 20 }
})