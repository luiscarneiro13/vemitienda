import { View, Text, FlatList, Alert, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { Card, Title, Paragraph, Button, List, Avatar } from 'react-native-paper'
import { DIGITALOCEAN } from '../constants/Data'

export default function CardCustom({ data, onClick, compartir = false }) {

    const inputEl = useRef(null)

    const RenderItem = ({ item }) => {
        const size = 80
        return (
            <List.Item
                title={item.name}
                description={item.category?.name}
                left={props => item?.image ? <Image mode='cover' source={{ uri: DIGITALOCEAN + item?.image[0]?.url }} style={{ width: size, height: size }} /> : <Text></Text>}
                onPress={() => onClick(item)}
                style={{ backgroundColor: '#F9F9F9', marginTop: 5 }}
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