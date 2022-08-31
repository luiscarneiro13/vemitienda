import { Text, FlatList, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'

export default function ScrollHorizontal({ categories, filterCategory }) {

    const inputEl = useRef(null)

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => filterCategory(item.name)}>
            <Text style={{ color: '#0c77c3', padding: 5, marginTop: 5 }}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            {categories.length ?
                <View style={{ flexDirection: 'row', height: 50,width:'97%' }}>
                    {/* <Text style={{ color: 'green', padding: 5, marginTop: 5 }}>Categorías:</Text> */}
                    <TouchableOpacity onPress={() => filterCategory('')}>
                        <Text style={{ color: '#0c77c3', padding: 5, marginTop: 5 }}>Todas</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={categories}
                        renderItem={renderItem}
                        keyExtractor={item => item.id || inputEl}
                        horizontal={true}
                    />

                </View>
                :
                <>
                    <Text style={{ color: '#b1e5d3', padding: 5, marginTop: 5 }}></Text>
                </>
            }
        </>
    )
}