import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'

export default function Index() {

    const [sending, setSending] = useState(false)

    const logout = async () => {
        setSending(true)
        await AsyncStorage.clear()
        setSending(false)
    }



    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <HeaderGrid sending={sending} onPress={logout} title="Mi Tienda" showButton={true} titleButton='Salir' iconButton='logout' />
                    <View style={{ marginTop: 10 }}>
                        {/* <TextInput
                            mode='outlined'
                            label="Email"
                            left={<TextInput.Icon name="mail" />}
                            style={{ marginBottom: 15 }}
                            value={formik.values.email}
                            onChangeText={(text) => formik.setFieldValue('email', text)}
                        />
                        <Text style={styles.error}>{formik.errors.email}</Text> */}
                        <Text>Ésta condiguración estará en el pdf que genera la App</Text>

                        <TextInput
                            mode='outlined'
                            label="Nombre comercial"
                            placeholder="Ingrese su nombre comercial aquí"
                            style={{ marginBottom: 15 }}
                        />
                        <TextInput
                            mode='outlined'
                            label="Email"
                            placeholder="Ingrese su email comercial aquí"
                            style={{ marginBottom: 15 }}
                        />

                        <TextInput
                            mode='outlined'
                            label="Slogan o lema"
                            placeholder="Ingrese su slogan o lema comercial aquí"
                            style={{ marginBottom: 15 }}
                        />

                        <TextInput
                            mode='outlined'
                            label="Teléfono"
                            placeholder="Ingrese su teléfono comercial aquí"
                            style={{ marginBottom: 15 }}
                        />

                        <SparatorFooter />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}