import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextInput, Button, Card } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import SvgComponent from './Svg'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from '../../redux/thunks'

export default function Login() {

    const [sending, setSending] = useState(false)
    const [showPass, setShowPass] = useState(true)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const startLoadingToken = useSelector(state => state.token.isLoading)

    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        return () => { source.cancel() }
    }, [])

    useEffect(() => {
        const controller = new AbortController()

        return () => { controller.abort() }
    }, [])


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (data) => {
            (async () => {
                try {
                    dispatch(getToken(data))
                } catch (error) {
                    console.log(error)
                }
                setSending(false)

            })()
        }
    })

    const showingPass = () => {
        setShowPass(!showPass)
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SvgComponent />
            <View>
                <Image source={require('../../images/icon.png')} style={{ width: 170, height: 130, marginTop: -310 }} />
            </View>
            <Card style={{ width: '90%', marginTop: -205, borderRadius: 10 }}>
                <Card.Title title="Inicio de Sesión" />
                <Card.Content>
                    <TextInput
                        mode='outlined'
                        label="Email"
                        left={<TextInput.Icon name="mail" />}
                        style={{ marginBottom: 15 }}
                        value={formik.values.email}
                        onChangeText={(text) => formik.setFieldValue('email', text)}
                    />
                    <Text style={styles.error}>{formik.errors.email}</Text>

                    <TextInput
                        mode='outlined'
                        label="Contraseña"
                        secureTextEntry={showPass}
                        left={<TextInput.Icon name="lock" />}
                        right={<TextInput.Icon name="eye" onPress={() => showingPass()} />}
                        style={{ marginBottom: 15 }}
                        value={formik.values.password}
                        onChangeText={(text) => formik.setFieldValue('password', text)}
                    />
                    <Text style={styles.error}>{formik.errors.password}</Text>

                    <Button
                        icon="account"
                        mode="contained"
                        onPress={formik.handleSubmit}
                        uppercase={false}
                        loading={startLoadingToken}
                        disabled={startLoadingToken}
                    >
                        Iniciar Sesión
                    </Button>
                </Card.Content>
                <Card.Actions style={{ paddingTop: 50 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button
                            onPress={() => navigation.navigate('Register')}
                            uppercase={false}
                        >
                            Registro
                        </Button>
                        <Button
                            onPress={() => navigation.navigate('ForgotPassword')}
                            uppercase={false}
                        >
                            Recuperar Contraseña
                        </Button>
                    </View>
                </Card.Actions>
            </Card>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                <Text>Versión 1.0.0</Text>
            </View>
        </View>
    )
}

function initialValues() {
    return {
        email: 'administrador@gmail.com',
        password: '123456'
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
            .max(20, 'Máximo 20 caracteres')
    }
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginBottom: 20,
        marginTop: -15
    }
})