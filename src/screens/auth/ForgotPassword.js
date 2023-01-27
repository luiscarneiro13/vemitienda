import React, { useState } from 'react'
import { View, Image, Text, Alert, StyleSheet, Linking } from 'react-native'
import { TextInput, Button, Card } from 'react-native-paper'
import SvgComponent from './Svg'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Styles } from '../../constants/Styles'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { URL_PRODUCTION } from '../../constants/Data'
import { searchEmail } from '../../redux/thunks/resetPasswordThunk'

export default function ForgotPassword() {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const resetPasswordLoading = useSelector(state => state.resetPassword.isLoading)
    const user = useSelector(state => state.resetPassword.user)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (data) => {

            (async () => {
                try {
                    dispatch(searchEmail(data, navigation))
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    })

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SvgComponent />
            <View>
                <Image source={require('../../images/icon.png')} style={{ width: 170, height: 130, marginTop: -310 }} />
            </View>
            <Card style={{ width: '90%', marginTop: -205, borderRadius: 10 }}>
                <Card.Title title="Recuperar de Contraseña" />
                <Card.Content>
                    <TextInput
                        mode='outlined'
                        label="Ingrese su Email"
                        left={<TextInput.Icon name="email" />}
                        style={{ marginBottom: 15 }}
                        value={formik.values.email}
                        onChangeText={(text) => formik.setFieldValue('email', text)}
                    />
                    <Text style={styles.error}>{formik.errors.email}</Text>

                    <Button
                        icon="account"
                        mode="contained"
                        onPress={formik.handleSubmit}
                        uppercase={false}
                        loading={resetPasswordLoading}
                        disabled={resetPasswordLoading}
                        style={Styles.buttonPlus}
                    >
                        Recuperar
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
        email: 'carneiroluis3@gmail.com'
    }
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        marginBottom: 20,
        marginTop: -15
    }
})