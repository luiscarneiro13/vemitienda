import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../../components/Header'
import Search from '../../components/Search'
import CardCustom from '../../components/CardCustom'
import ScrollHorizontal from '../../components/ScrollHorizontal'
import { Styles } from '../../constants/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Button, useTheme } from 'react-native-paper'
import { getCategoriesThunk, getCompanyThunk, getProducts, getTemplatesThunk, getThemesThunk } from '../../redux/thunks'
import { productsFilters } from '../../redux/slices'
import { userInfoThunk } from '../../redux/thunks/userInfoThunk'

export default function Index() {

    const [query, setQuery] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const theme = useTheme()
    const navigator = useNavigation()
    const company = useSelector(state => state.company.company) || []
    const categories = useSelector(state => state.categories.categories) || []
    const productsStore = useSelector(state => state?.products.products) || []
    const isLoading = useSelector(state => state?.products.isLoading)
    const planId = useSelector(state => state?.token.plan_id) || []
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userInfoThunk())
        dispatch(getProducts())
        dispatch(getCompanyThunk())
        dispatch(getThemesThunk())
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
        console.log('url_tienda',company?.url_tienda)
        if (!company?.url_tienda) {
            Alert.alert('Mensaje', 'Debe agregar la información de su tienda para poder compartir el catálogo')
            navigator.navigate('StoreNavigator')
        } else {
            navigator.navigate('HomeDetails', { update: false })
        }
    }

    const changeSearch = (query) => {

        setQuery(query)

        if (query.length) {

            const filtrado = productsStore.filter(item => {
                if (item?.name?.includes(query) || item?.category?.name?.includes(query) || item?.description?.includes(query) || item?.code?.includes(query)) {
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

        if (planId > 1) {
            if (!company?.name) {
                navigator.navigate('StoreNavigator')
                Alert.alert('Mensaje', 'Debe agregar la información de su tienda para poder compartir el catálogo')
            } else {
                if (!productsStore.length) {
                    Alert.alert('Mensaje', 'Para poder compartir, usted debe agregar productos')
                } else {
                    navigator.navigate('Share')
                }
            }
        } else {
            Alert.alert('Mensaje', 'Debe activar un plan premium para compartir su Catálogo')
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
                {
                    isLoading ?
                        <ActivityIndicator />
                        :
                        <CardCustom onClick={onClickCardCustom} share={false} />
                }

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={clickHandlerShare}
                    style={styles.touchableOpacityStyle}>
                    <Image
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
        borderColor: "#053e66"
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    }
})