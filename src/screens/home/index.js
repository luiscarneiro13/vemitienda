import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../../components/Header'
import Search from '../../components/Search'
import CardCustom from '../../components/CardCustom'
import ScrollHorizontal from '../../components/ScrollHorizontal'
import { Styles } from '../../constants/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Button } from 'react-native-paper'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { getCategoriesThunk, getCompanyThunk, getProducts, getTemplatesThunk } from '../../redux/thunks'
import { productsFilters } from '../../redux/slices'


export default function Index() {

    const [query, setQuery] = useState('')
    const navigator = useNavigation()
    const categories = useSelector(state => state.categories.categories) || []
    const productsStore = useSelector(state => state?.products.products) || []
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCompanyThunk())
        dispatch(getCategoriesThunk())
        dispatch(getTemplatesThunk())
    }, [])

    useFocusEffect(() => {
        changeSearch(query)
    })

    const onClickCardCustom = (item) => {
        navigator.navigate('HomeDetails', { item: { ...item }, update: true })
    }

    const goAdd = () => {
        navigator.navigate('HomeDetails', { update: false })
    }

    const changeSearch = (query) => {

        setQuery(query)

        if (query.length) {

            const filtrado = productsStore.filter(item => {
                if (item.name.includes(query) || item.category.name.includes(query) || item.description.includes(query)) {
                    return item
                }
            })

            dispatch(productsFilters(filtrado))
        } else {
            dispatch(productsFilters(productsStore))
        }
    }

    const filterCategory = (query) => {
        changeSearch(query)
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />

            <View style={Styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Search query={query} onChange={(item) => changeSearch(item)} />
                    <Button
                        icon={'plus'}
                        mode="contained"
                        uppercase={false}
                        style={styles.buttonPlus}
                        onPress={goAdd}
                    >
                        Agregar
                    </Button>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <ScrollHorizontal categories={categories} filterCategory={(item) => filterCategory(item)} />
                </View>
                <CardCustom onClick={onClickCardCustom} share={false} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonPlus: {
        borderRadius: 10,
        height: 40
    }
})