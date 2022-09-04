import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header'
import Search from '../../components/Search'
import CardCustom from '../../components/CardCustom'
import ScrollHorizontal from '../../components/ScrollHorizontal'
import { Styles } from '../../constants/Styles'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-paper'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'


export default function Index() {

    const [query, setQuery] = useState('')
    const navigator = useNavigation()
    const categories = useSelector(state => state.categories) || []
    const userInfo = useSelector(state => state) || []
    const products = useSelector(state => state?.userInformation?.products) || []

    useEffect(() => {
        /** Esto es para que no dé error al cerrar sesión */
        const unsubscribe = navigator.addListener('focus', () => { })
        return unsubscribe
    })

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync()
        })()
    }, [])

    const onClickCardCustom = (item) => {
        navigator.navigate('HomeDetails', { item })
    }

    const goAdd = () => {
        navigator.navigate('HomeDetails', { update: false })
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Search query={query} onChange={(item) => console.log("")} />
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
                    <ScrollHorizontal categories={categories} filterCategory={(item) => console.log("")} />
                </View>
                <CardCustom data={products} onClick={onClickCardCustom} />
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