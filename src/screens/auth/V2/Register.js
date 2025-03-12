import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Text, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TextInput, Button, Card, useTheme } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import SvgComponent from './Svg'
import { Styles } from '../../constants/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { storeRegister } from '../../redux/thunks/registerThunk'
import { COUNTRY_ID } from '../../constants/Data'

export default function Register() {

    const theme = useTheme()
    const [showPass1, setShowPass1] = useState(true)
    const [showPass2, setShowPass2] = useState(true)
    const startLoading = useSelector(state => state.register.isLoading)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (data) => {
            (async () => {
                data.country_id = COUNTRY_ID
                try {
                    dispatch(storeRegister(data, navigation))
                } catch (error) {
                    // console.log(error)
                }

            })()
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
            <Card style={{ width: '90%', marginTop: -205, borderRadius: 10, backgroundColor:'#FFF' }}>
                <Card.Title title="Registro" titleStyle={{ color: theme.colors.primary }} />
                <Card.Content>
                    <TextInput
                        mode='flat'
                        label="Nombre y Apellido"
                        left={<TextInput.Icon icon="account" color={theme.colors.primary} />}
                        value={formik.values.name}
                        onChangeText={(text) => formik.setFieldValue('name', text)}
                        outlineColor={theme.colors.primary}
                        color={theme.colors.primary}
                        theme={{ colors: { text: theme.colors.primary } }}
                        style={{ marginBottom: 10, backgroundColor: '#FFF' }}
                    />
                    {formik.errors.name && <Text style={styles.error}>{formik.errors.name}</Text>}

                    <TextInput
                        mode='flat'
                        label="Email"
                        left={<TextInput.Icon icon="mail" color={theme.colors.primary} />}
                        value={formik.values.email}
                        onChangeText={(text) => formik.setFieldValue('email', text)}
                        outlineColor={theme.colors.primary}
                        color={theme.colors.primary}
                        theme={{ colors: { text: theme.colors.primary } }}
                        style={{ marginBottom: 10, backgroundColor: '#FFF' }}
                    />
                    {formik.errors.email && <Text style={styles.error}>{formik.errors.email}</Text>}

                    <TextInput
                        mode='flat'
                        label="Contraseña"
                        secureTextEntry={showPass1}
                        left={<TextInput.Icon icon="lock" color={theme.colors.primary} />}
                        right={<TextInput.Icon icon="eye" color={theme.colors.primary} onPress={() => showingPass1()} />}
                        value={formik.values.password}
                        onChangeText={(text) => formik.setFieldValue('password', text)}
                        outlineColor={theme.colors.primary}
                        color={theme.colors.primary}
                        theme={{ colors: { text: theme.colors.primary } }}
                        style={{ marginBottom: 10, backgroundColor: '#FFF' }}
                    />
                    {formik.errors.password && <Text style={styles.error}>{formik.errors.password}</Text>}

                    <TextInput
                        mode='flat'
                        label="Repita la contraseña"
                        secureTextEntry={showPass2}
                        left={<TextInput.Icon icon="lock" color={theme.colors.primary} />}
                        right={<TextInput.Icon icon="eye" color={theme.colors.primary} onPress={() => showingPass2()} />}
                        value={formik.values.password_confirmation}
                        onChangeText={(text) => formik.setFieldValue('password_confirmation', text)}
                        outlineColor={theme.colors.primary}
                        color={theme.colors.primary}
                        theme={{ colors: { text: theme.colors.primary } }}
                        style={{ marginBottom: 10, backgroundColor: '#FFF' }}
                    />
                    {formik.errors.password_confirmation && <Text style={styles.error}>{formik.errors.password_confirmation}</Text>}

                    <View style={{ marginTop: 40 }}></View>
                    <Button
                        icon="account"
                        mode="contained"
                        onPress={formik.handleSubmit}
                        uppercase={false}
                        style={Styles.buttonPlus}
                        disabled={startLoading}
                        loading={startLoading}
                    >
                        Registrarme
                    </Button>

                </Card.Content>
                <Card.Actions style={{ paddingTop: 50 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button
                            onPress={() => navigation.goBack()}
                            uppercase={false}
                            style={Styles.buttonPlus}
                        >
                            Cancelar
                        </Button>
                    </View>
                </Card.Actions>
            </Card>
        </View>
    )
}

function initialValues() {
    return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }
}

function validationSchema() {
    return {
        name: Yup.string('Formato inválido')
            .required('Se requiere su nombre y apellido')
            .max(90, 'Máximo 90 caracteres'),

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
            .max(20, 'Máximo 20 caracteres')
    }
}

const styles = StyleSheet.create({
    error: {
        color: '#f9672e',
        marginBottom: 10,
    },
})