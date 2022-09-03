import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'
import { deleteToken } from '../../redux/slices/tokenSlice'

export default function Index() {

    const [sending, setSending] = useState(false)
    const dispatch = useDispatch()


    const logout = async () => {
        setSending(true)
        await AsyncStorage.clear()
        dispatch(deleteToken())
        setSending(false)
    }



    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <HeaderGrid sending={sending} onPress={logout} title="Mi Tienda" showButton={true} titleButton='Salir' iconButton='logout' />
                    <View style={{ marginTop: -180 }}>
                        <TextInput
                            mode='outlined'
                            label="Nombre"
                        />


                        <SparatorFooter />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}