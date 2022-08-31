import React, { useCallback, useEffect, useState } from 'react'
import { StatusBar, View } from 'react-native'
import Header from '../../components/Header'
import Search from '../../components/Search'
import CardCustom from '../../components/CardCustom'
import ScrollHorizontal from '../../components/ScrollHorizontal'
import { Styles } from '../../constants/Styles'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useSelector, useDispatch } from 'react-redux'
import { selectDB } from '../../constants/DataBase'
import { addCategories } from '../../redux/slices/categoriesSlice'
import * as Func from '../add/Functions'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { PRODUCTS } from '../../constants/Data'


export default function Index() {
    const dispatch = useDispatch()
    const navigator = useNavigation()
    const categories = useSelector(state => state.categories) || []
    const [query, setQuery] = useState('')
    const [plants, setPlants] = useState([])

    const select = `Select plants.*, categories.name as category from plants INNER JOIN categories ON plants.category_id = categories.id;`

    useFocusEffect(
        useCallback(() => {
            selectDB(select, [], (rows) => { setPlants(rows) })
        }, [])
    )

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync()
        })()

        if (!categories.length) {
            selectDB(`Select * from categories;`, [], (rows) => {
                dispatch(addCategories(rows))
            })
        }

    }, [])


    const changeSearch = (query) => {
        setQuery(query)

        selectDB(select, [], (rows) => {

            if (query?.length) {
                setPlants(Func.filtrar(rows, query))
            } else {
                setPlants(rows)
            }

        })
    }

    const filterCategory = (query) => {
        changeSearch(query)
    }

    const onClickCardCustom = (item) => {
        navigator.navigate('HomeDetails', { item })
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <Search query={query} onChange={(item) => changeSearch(item)} />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <ScrollHorizontal categories={categories} filterCategory={(item) => filterCategory(item)} />
                </View>
                <CardCustom data={PRODUCTS} onClick={onClickCardCustom} />
            </View>
        </View>
    )
}