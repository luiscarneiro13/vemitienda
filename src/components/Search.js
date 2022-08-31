import React from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'

MIcon.loadFont()

export default function Search({ query, onChange }) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Buscar..."
                placeholderTextColor="#0c77c340"
                style={styles.text}
                value={query || ''}
                onChangeText={(text) => onChange(text)}
            />
            <MIcon name={'magnify'} size={30} color={'#0c77c340'} />
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