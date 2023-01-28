import React, { useRef } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, IconButton, List as Lista, useTheme } from 'react-native-paper'

export default function List({ data, style, onClick }) {

    const inputEl = useRef(null)
    const theme = useTheme()

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => onClick(item)} style={{ backgroundColor: '#FFFFFF', marginBottom: 5, height: 60, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 10, color: theme.colors.primary }}>{item.name}</Text>
                    <Button icon="magnify" mode="text" color={theme.colors.primary}></Button>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            style={style || null}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id || inputEl}
        />
    )
}