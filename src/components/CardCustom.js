import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { Card, Title, Paragraph, Button } from 'react-native-paper'


export default function CardCustom({ data, onClick, compartir = false }) {

    const inputEl = useRef(null)

    const RenderItem = ({ item }) => {
        const precio = item?.price ? `$${item.price}` : ''

        return (
            <TouchableOpacity onPress={() => onClick(item)}>
                <Card mode='outlined' style={{ borderRadius: 10, marginTop: 5, backgroundColor: '#FFF', marginBottom: 30 }}>
                    {item?.image && <Card.Cover source={{ uri: item?.image }} style={{ borderTopEndRadius: 10, borderTopStartRadius: 8, borderTopEndRadius: 8 }} />}
                    <Card.Content style={{ borderColor: '#333', paddingTop:10 }}>
                        {item?.name && <Text>{item?.category}: {item?.name}</Text>}
                        {item?.price > 0 && <Text style={{ marginRight: 15, fontWeight: 'bold' }}>Precio: {precio}</Text>}

                    </Card.Content>
                    <Card.Actions style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {!compartir && <Button>EDITAR...</Button>}
                    </Card.Actions>
                </Card>
            </TouchableOpacity>
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