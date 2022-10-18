import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, ActivityIndicator, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'
import { deleteToken } from '../../redux/slices'
import { getCompany } from '../../redux/thunks'

export default function Index() {

    const [sending, setSending] = useState(false)
    const dispatch = useDispatch()
    const company = useSelector(state => state.company.company)
    const isLoading = useSelector(state => state.company.isLoading)

    const logout = async () => {
        dispatch(deleteToken())
    }

    useEffect(() => {
        dispatch(getCompany())
    }, [])


    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <HeaderGrid sending={sending} onPress={logout} title="Mi Tienda" showButton={true} titleButton='Salir' iconButton='logout' />
                    <View style={{ marginTop: 10 }}>
                        {!isLoading ?

                            <>
                                <Text>Ésta condiguración estará en el pdf que genera la App</Text>

                                <TextInput
                                    mode='outlined'
                                    label="Nombre comercial"
                                    placeholder="Ingrese su nombre comercial aquí"
                                    style={{ marginBottom: 15 }}
                                    value={company.name || ''}
                                />
                                <TextInput
                                    mode='outlined'
                                    label="Email"
                                    placeholder="Ingrese su email comercial aquí"
                                    style={{ marginBottom: 15 }}
                                    value={company.email || ''}
                                />

                                <TextInput
                                    mode='outlined'
                                    label="Slogan o lema"
                                    placeholder="Ingrese su slogan o lema comercial aquí"
                                    style={{ marginBottom: 15 }}
                                    value={company.slogan || ''}
                                />

                                <TextInput
                                    mode='outlined'
                                    label="Teléfono"
                                    placeholder="Ingrese su teléfono comercial aquí"
                                    style={{ marginBottom: 15 }}
                                    value={company.phone || ''}
                                />

                                <SparatorFooter />
                            </>

                            : <ActivityIndicator />}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}