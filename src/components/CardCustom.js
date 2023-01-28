import { View, Text, FlatList, Alert, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import React, { useRef } from 'react'
import { List, useTheme } from 'react-native-paper'
import { DIGITALOCEAN } from '../constants/Data'
import { useSelector } from 'react-redux'
import { Card } from 'react-native-elements'

export default function CardCustom({ onClick, share }) {

    const inputEl = useRef(null)
    const theme = useTheme()
    const products = useSelector(state => state?.products.products) || []
    const productsFilters = useSelector(state => state?.products.productsFilters) || []

    const RenderItem = ({ item }) => {
        const index = products.findIndex(value => value.id === item.id)
        const size = 80
        if (share) {
            if (products[index]?.share === 1) {
                return (
                    <List.Item
                        title={products[index].name}
                        description={products[index].category?.name}
                        titleStyle={{ color: theme.colors.primary }}
                        descriptionStyle={{ color: theme.colors.primary }}
                        left={props =>
                            products[index]?.image ?
                                <>
                                    {products[index]?.image[0].thumbnail.includes('file:') ?
                                        <Image mode='cover' source={{ uri: products[index]?.image[0]?.thumbnail }} style={{ width: size, height: size, zIndex: 3 }} />
                                        :
                                        <Image mode='cover' source={{ uri: DIGITALOCEAN + products[index]?.image[0]?.thumbnail }} style={{ width: size, height: size, zIndex: 3 }} />
                                    }
                                </>
                                :
                                <Text></Text>
                        }
                        onPress={() => onClick(products[index])}
                        style={{ backgroundColor: '#F3F3F3', marginTop: 5 }}
                    />
                )
            }
        } else {
            if (products[index]) {
                return (
                    <List.Item
                        title={products[index].name}
                        description={products[index].category?.name}
                        titleStyle={{ color: theme.colors.primary, fontWeight:'bold' }}
                        descriptionStyle={{ color: theme.colors.primary }}
                        left={props =>
                            products[index]?.image ?
                                <>
                                    {products[index]?.image[0]?.thumbnail?.includes('file') ?
                                        <Image mode='cover' source={{ uri: products[index]?.image[0]?.thumbnail }} style={{ width: size, height: size, zIndex: 3 }} />
                                        :
                                        <Image mode='cover' source={{ uri: DIGITALOCEAN + products[index]?.image[0]?.thumbnail }} style={{ width: size, height: size, zIndex: 3 }} />
                                    }
                                </>
                                :
                                <Text></Text>
                        }
                        onPress={() => onClick(products[index])}
                        style={{ backgroundColor: '#FFF', marginTop: 5 }}
                    />
                )
            }
        }
    }

    const RenderItem2Columns = ({ item }) => {
        return (
            <Card>
                <Card.Image
                    style={{ padding: 0, width: 100, height: 100 }}
                    source={{ uri: DIGITALOCEAN + item.image[0].thumbnail }}
                />
                <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 10 }}>{item.name}</Text>
                <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 12 }}>${item.price}</Text>
            </Card>
        )
    }

    return (
        <>
            {productsFilters.length ?
                <>
                    {share ?
                        <FlatList
                            data={productsFilters}
                            renderItem={(item) => RenderItem2Columns(item)}
                            keyExtractor={item => item.id || inputEl}
                            numColumns={2}
                        />
                        :
                        <FlatList
                            data={productsFilters}
                            renderItem={(item) => RenderItem(item)}
                            keyExtractor={item => item.id || inputEl}
                        />
                    }
                </>
                :
                <View style={{ justifyContents: 'center', alignItems: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                    <Text>No hay datos disponibles</Text>
                </View>
            }
        </>
    )
}

const spacing = 10;
const width = (Dimensions.get('window').width - 4 * 10) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    list: {
        justifyContent: 'space-around',
    },
    column: {
        flexShrink: 1,
    },
    card: {
        width: width,
        margin: spacing,
    },
})