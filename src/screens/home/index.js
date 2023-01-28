import React, { useEffect, useState } from 'react'
import { Alert, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/Header'
import Search from '../../components/Search'
import CardCustom from '../../components/CardCustom'
import ScrollHorizontal from '../../components/ScrollHorizontal'
import { Styles } from '../../constants/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Button, useTheme } from 'react-native-paper'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { getCategoriesThunk, getCompanyThunk, getProducts, getTemplatesThunk } from '../../redux/thunks'
import { productsFilters } from '../../redux/slices'
import { ThemeConsumer } from 'react-native-elements'


export default function Index() {

    const [query, setQuery] = useState('')
    const theme = useTheme()
    const navigator = useNavigation()
    const company = useSelector(state => state.company.company) || []
    const categories = useSelector(state => state.categories.categories) || []
    const productsStore = useSelector(state => state?.products.products) || []
    const planId = useSelector(state => state?.token.plan_id) || []
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

    const clickHandlerShare = async () => {
        if (planId === 2) {
            if (!company?.url_tienda) {
                navigator.navigate('Store');
                Alert.alert('Mensaje', 'Debe agregar la información de su tienda para poder compartir el catálogo')
            } else {
                await Share.share({
                    message: company.url_tienda
                })
            }
        } else {
            Alert.alert('Mensaje', 'Debe activar el plan premium para compartir su Catálogo')
        }
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

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={clickHandlerShare}
                    style={styles.touchableOpacityStyle}>
                    <Image
                        //We are making FAB using TouchableOpacity with an image
                        //We are using online image here
                        // source={{
                        //     uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                        // }}
                        //You can use you project image Example below
                        source={require('../../assets/share.png')}
                        style={styles.floatingButtonStyle}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonPlus: {
        borderRadius: 10,
        height: 40,
        borderColor:"#053e66"
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
})