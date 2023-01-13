import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextInput, Button, Card } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import SvgComponent from './Svg'
import { Styles } from '../../constants/Styles'

export default function Register() {

    const [showPass1, setShowPass1] = useState(true)
    const [showPass2, setShowPass2] = useState(true)

    const navigation = useNavigation()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (data) => {
            (
                async () => {
                    try {
                        const response = await axios.post(`register`, data)
                        const status = await response.data.status

                        if (status && status === 200) {

                            Alert.alert("Excelente!", response.data.message)
                            navigation.navigate('Login')

                        } else if (status && status === 201) {

                            Alert.alert(response.data.message, "Por favor active la cuenta mediante el enlace que hemos enviado a su correo")
                            navigation.navigate('Login')

                        } else if (status && status !== 400 && status !== 422) {

                            Alert.alert('Error', response.data.message)

                        }
                    } catch (error) {
                        console.log("error")
                    }
                }
            )()
        }
    })

    const showingPass1 = () => {
        setShowPass1(!showPass1)
    }

    const showingPass2 = () => {
        setShowPass2(!showPass2)
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SvgComponent />
            <View>
                <Image source={require('../../images/icon.png')} style={{ width: 170, height: 130, marginTop: -310 }} />
            </View>
            <Card style={{ width: '90%', marginTop: -205, borderRadius: 10 }}>
                <Card.Title title="Registro" />
                <Card.Content>
                    <TextInput
                        mode='outlined'
                        label="Email"
                        left={<TextInput.Icon name="mail" />}
                        value={formik.values.email}
                        onChangeText={(text) => formik.setFieldValue('email', text)}
                    />
                    {formik.errors.email && <Text style={styles.error}>{formik.errors.email}</Text>}

                    <TextInput
                        mode='outlined'
                        label="Contraseña"
                        secureTextEntry={showPass1}
                        left={<TextInput.Icon name="lock" />}
                        right={<TextInput.Icon name="eye" onPress={() => showingPass1()} />}
                        value={formik.values.password}
                        onChangeText={(text) => formik.setFieldValue('password', text)}
                    />
                    {formik.errors.password && <Text style={styles.error}>{formik.errors.password}</Text>}

                    <TextInput
                        mode='outlined'
                        label="Repita la contraseña"
                        secureTextEntry={showPass2}
                        left={<TextInput.Icon name="lock" />}
                        right={<TextInput.Icon name="eye" onPress={() => showingPass2()} />}
                        value={formik.values.password_confirmation}
                        onChangeText={(text) => formik.setFieldValue('password_confirmation', text)}
                    />
                    {formik.errors.password_confirmation && <Text style={styles.error}>{formik.errors.password_confirmation}</Text>}

                    <View style={{ marginTop: 40 }}></View>
                    <Button
                        icon="account"
                        mode="contained"
                        onPress={formik.handleSubmit}
                        uppercase={false}
                        style={Styles.buttonPlus}
                    >
                        Registrarme
                    </Button>

                </Card.Content>
                <Card.Actions style={{ paddingTop: 50 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button
                            onPress={() => navigation.navigate('Login')}
                            uppercase={false}
                            style={Styles.buttonPlus}
                        >
                            Iniciar Sesión
                        </Button>
                        <Button
                            onPress={() => navigation.navigate('ForgotPassword')}
                            uppercase={false}
                            style={Styles.buttonPlus}
                        >
                            Recuperar Contraseña
                        </Button>
                    </View>
                </Card.Actions>
            </Card>
        </View>
    )
}

function initialValues() {
    return {
        email: '',
        password: '',
        password_confirmation: '',
        estado_id: 0,
        ciudad_id: '',
    }
}

function validationSchema() {
    return {
        email: Yup.string('Formato inválido')
            .required('Email requerido')
            .email('Email inválido')
            .max(90, 'Máximo 90 caracteres'),

        password: Yup.string('Formato inválido')
            .required('Contraseña requerida')
            .min(3, 'Mínimo 3 caracteres')
            .max(20, 'Máximo 20 caracteres'),

        password_confirmation: Yup.string('Formato inválido')
            .required('Confirmación requerida')
            .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
            .min(3, 'Mínimo 3 caracteres')
            .max(20, 'Máximo 20 caracteres'),
        estado_id: Yup.number().min(1, 'Seleccione un estado'),
        ciudad_id: Yup.string().required('Seleccione un una ciudad')
    }
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginBottom: 10,
    },
})