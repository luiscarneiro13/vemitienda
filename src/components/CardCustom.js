import { View, Text, FlatList, Alert, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { Card, Title, Paragraph, Button, List, Avatar } from 'react-native-paper'
import { DIGITALOCEAN } from '../constants/Data'
import { useSelector } from 'react-redux'

export default function CardCustom({ data, onClick, compartir = false }) {

    const inputEl = useRef(null)
    const products = useSelector(state => state?.products.products) || []

    const RenderItem = ({ item }) => {
        const index = products.findIndex(value => value.id === item.id)
        const size = 80
        return (
            <List.Item
                title={products[index].name}
                description={products[index].category?.name}
                left={props => products[index]?.image ? <Image mode='cover' source={{ uri: DIGITALOCEAN + products[index]?.image[0]?.url }} style={{ width: size, height: size }} /> : <Text></Text>}
                onPress={() => onClick(products[index])}
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