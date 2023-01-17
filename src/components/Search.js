import React from 'react'
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'

MIcon.loadFont()

export default function Search({ query, onChange }) {
    return (
        <View style={styles.container}>
            <MIcon name={'magnify'} size={30} color={'#888888'} />
            <TextInput
                placeholder="Buscar..."
                placeholderTextColor="#888888"
                style={styles.text}
                value={query || ''}
                onChangeText={(text) => onChange(text)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: -5,
        padding: 5,
        backgroundColor: '#F3F3F3',
        width: '60%',
        borderRadius: 10,
        height: 40
    },
    text: {
        fontSize: 18,
        marginTop: -3,
        color: '#333'
    },
    image: { height: 20, width: 20 }
})