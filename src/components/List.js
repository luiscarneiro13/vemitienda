import React, { useRef } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, IconButton, List as Lista } from 'react-native-paper'

export default function List({ data, style, onClick }) {

    const inputEl = useRef(null)

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => onClick(item)} style={{ backgroundColor: '#F6F6F6', marginBottom: 2 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                <Text style={{ fontSize: 20, marginTop: 5 }}>{item.name}</Text>
                <Button icon="magnify" mode="text">
                    Ver
                </Button>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            style={style || null}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id || inputEl}
        />
    )
}