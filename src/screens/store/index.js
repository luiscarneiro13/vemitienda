import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { View, ScrollView, Text, ActivityIndicator, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'
import { deleteToken } from '../../redux/slices'
import { getCompanyThunk, storeCompanyThunk } from '../../redux/thunks'
import * as Func from './Functions'
import * as Yup from 'yup'
import { ColorPicker } from 'react-native-color-picker'

export default function Index() {

    const [color, setColor] = useState('#FFFF00')
    const [sending, setSending] = useState(false)
    const dispatch = useDispatch()
    const company = useSelector(state => state.company?.company)
    const isLoading = useSelector(state => state.company?.isLoading)

    const logout = async () => {
        dispatch(deleteToken())
    }

    const formik = useFormik({
        initialValues: Func.initialValues(company),
        validationSchema: Yup.object(Func.validationSchema()),
        onSubmit: (data) => {
            (
                async () => {
                    dispatch(storeCompanyThunk(data))
                }
            )()
        }
    })

    useEffect(() => {
        formik.setValues(company)
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
                                    style={{ marginTop: 15 }}
                                    value={formik.values?.name || ''}
                                    onChangeText={(text) => formik.setFieldValue('name', text)}
                                />
                                {formik.errors.name && <Text style={Styles.error}>{formik.errors.name}</Text>}

                                <TextInput
                                    mode='outlined'
                                    label="Email"
                                    placeholder="Ingrese su email comercial aquí"
                                    style={{ marginTop: 15 }}
                                    value={formik.values?.email || ''}
                                    onChangeText={(text) => formik.setFieldValue('email', text)}
                                />
                                {formik.errors.email && <Text style={Styles.error}>{formik.errors.email}</Text>}

                                <TextInput
                                    mode='outlined'
                                    label="Slogan o lema"
                                    placeholder="Ingrese su slogan o lema comercial aquí"
                                    style={{ marginTop: 15 }}
                                    value={formik.values?.slogan || ''}
                                    onChangeText={(text) => formik.setFieldValue('slogan', text)}
                                />
                                {formik.errors.slogan && <Text style={Styles.error}>{formik.errors.slogan}</Text>}

                                <TextInput
                                    mode='outlined'
                                    label="Teléfono"
                                    placeholder="Ingrese su teléfono comercial aquí"
                                    style={{ marginTop: 15 }}
                                    value={formik.values?.phone || ''}
                                    onChangeText={(text) => formik.setFieldValue('phone', text)}
                                />
                                {formik.errors.phone && <Text style={Styles.error}>{formik.errors.phone}</Text>}

                                <TextInput
                                    mode='outlined'
                                    label="Color de fondo del Catálogo"
                                    placeholder="Ejemplo: #FFFFFF"
                                    style={{ marginTop: 15 }}
                                    value={formik.values?.background_color_catalog || ''}
                                    onChangeText={(text) => formik.setFieldValue('background_color_catalog', text)}
                                />
                                {formik.errors.background_color_catalog && <Text style={Styles.error}>{formik.errors.background_color_catalog}</Text>}

                                <View style={{ marginTop: 15 }}></View>
                                <Button
                                    icon="content-save"
                                    mode="contained"
                                    uppercase={false}
                                    loading={isLoading}
                                    disabled={isLoading}
                                    style={Styles.buttonPlus}
                                    onPress={formik.handleSubmit}
                                >
                                    Guardar
                                </Button>

                                <SparatorFooter />
                            </>

                            : <ActivityIndicator />}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}