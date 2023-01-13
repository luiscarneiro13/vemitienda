import React, { useState } from 'react'
import { View, Image, Text, Alert } from 'react-native'
import { TextInput, Button, Card } from 'react-native-paper'
import SvgComponent from './Svg'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Styles } from '../../constants/Styles'
import { useNavigation } from '@react-navigation/native'

export default function ForgotPassword() {

    const [sending, setSending] = useState(false)
    const navigator = useNavigation()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (data) => {

            setSending(true)
            try {
                const response = await axios.post(`recover_password`, data)
                const resp = await response?.data
                const status = resp.status

                if (status && status == 200) {
                    navigator.navigate('Login')
                    Alert.alert('Importante', resp?.message)
                } else if (status == 400) {
                    if (resp.errors.email[0]) {
                        Alert.alert('Ha ocurrido un error', resp.errors.email[0])
                    }
                } else {
                    Alert.alert('Ha ocurrido un error inesperado')
                }
            } catch (error) {
                console.log(error)
            }
            setSending(false)
        }
    })

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {/* <SvgComponent /> */}
            <View>
                <Image source={require('../../images/icon.png')} style={{ width: 170, height: 80, marginTop: -310 }} />
            </View>
            <Card style={{ width: '90%', marginTop: -90, borderRadius: 10 }}>
                <Card.Title title="Recuperar mi Contraseña" />
                <Card.Content>
                    <TextInput
                        mode='outlined'
                        label="Email"
                        left={<TextInput.Icon name="mail" />}
                        style={{ marginBottom: 15 }}
                        value={formik.values.email}
                        onChangeText={(text) => formik.setFieldValue('email', text)}
                    />
                    <Text style={Styles.error}>{formik.errors.email}</Text>

                    <Button
                        icon="account"
                        mode="contained"
                        onPress={formik.handleSubmit}
                        uppercase={false}
                        loading={sending}
                        disabled={sending}
                        style={Styles.buttonPlus}
                    >
                        Recuperar
                    </Button>

                </Card.Content>
                <Card.Actions style={{ paddingTop: 50 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button
                            onPress={() => navigator.navigate('Register')}
                            uppercase={false}
                            style={Styles.buttonPlus}
                        >
                            Registro
                        </Button>
                        <Button
                            onPress={() => navigator.navigate('Login')}
                            uppercase={false}
                            style={Styles.buttonPlus}
                        >
                            Iniciar Sesión
                        </Button>
                    </View>
                </Card.Actions>
            </Card>
        </View>
    )
}

function validationSchema() {
    return {
        email: Yup.string('Formato inválido')
            .required('Email requerido')
            .email('Email inválido')
            .max(90, 'Máximo 90 caracteres'),
    }
}


function initialValues() {
    return {
        email: ''
    }
}