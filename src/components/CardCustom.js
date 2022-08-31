import { View, Text, FlatList, Alert, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { Card, Title, Paragraph, Button, List, Avatar } from 'react-native-paper'


export default function CardCustom({ data, onClick, compartir = false }) {

    const inputEl = useRef(null)

    const RenderItem = ({ item }) => {
        return (
            <List.Item
                title={item.title}
                description={item.category}
                left={props => <Image mode='cover' source={{ uri: item.image }} style={{ width: 70, height: 70 }} />}
                right={props => <List.Icon {...props} icon="arrow-right" />}
            />
        )
    }

    return (
        <FlatList
            data={data}
            renderItem={(item) => RenderItem(item)}
            keyExtractor={item => item.id || inputEl}
        />
    )
}