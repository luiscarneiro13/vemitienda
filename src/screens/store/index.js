import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { View, ScrollView, Text, ActivityIndicator, Alert, Image } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'
import { deleteToken, loadingCompany } from '../../redux/slices'
import { storeCompanyThunk } from '../../redux/thunks'
import * as Func from './Functions'
import * as Yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import DropList from '../../components/DropDown'
import { useNavigation } from '@react-navigation/native'
import { DIGITALOCEAN } from '../../constants/Data'

export default function Index() {

    const [foto, setFoto] = useState(null)
    const [labelFoto, setLabelFoto] = useState('Tomar Foto')
    const [labelLibrary, setLabelLibrary] = useState('Galería')
    const [sending, setSending] = useState(false)
    const dispatch = useDispatch()
    const company = useSelector(state => state.company)
    const isLoading = useSelector(state => state.company?.isLoading)
    const navigator = useNavigation()
      
    useEffect(() => {
        if (company?.company?.logo?.thumbnail) {
            if (company.company.logo.thumbnail.includes('file:')) {
                setFoto(company.company.logo.thumbnail)
                console.log("Entro en logo file")
            } else {
                setFoto(DIGITALOCEAN + company.company.logo.thumbnail)
                console.log("Entro en logo digitalocean")
            }
        }
    },[])

    const logout = async () => {
        dispatch(deleteToken())
    }

    const formik = useFormik({
        initialValues: Func.initialValues(company.company),
        validationSchema: Yup.object(Func.validationSchema()),
        onSubmit: (data) => {
            (
                async () => {
                    try {
                        dispatch(storeCompanyThunk(data, navigator))
                    } catch (error) {
                        console.log("ERROR CAPTURADO AL ENVIAR")
                    }
                }
            )()
        }
    })

    const pickImage = async () => {
        dispatch(loadingCompany(true))
        let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 4], quality: 1 });

        if (!result.cancelled) {

            const imgReducida = await manipulateAsync(
                result.uri,
                [{ resize: { width: 700, height: 700 } }],
                { compress: 1, format: SaveFormat.PNG, base64: true }
            )

            /* El imagen.uri es la url que se debe guardar en base de datos */
            formik.setFieldValue('image', { uri: imgReducida.uri, name: 'imageNombre', type: 'image/png' })

            const thumbnail = await manipulateAsync(
                result.uri,
                [{ resize: { width: 250, height: 250 } }],
                { compress: 1, format: SaveFormat.PNG, base64: true }
            )

            setFoto(thumbnail.uri)

            formik.setFieldValue('thumbnail', { uri: thumbnail.uri, name: 'imageNombre', type: 'image/png' }).then(() => {
                dispatch(loadingCompany(false))
            })
        }
    }

    const pickImageLibrary = async () => {
        dispatch(loadingCompany(true))
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 4], quality: 1 })

        if (!result.cancelled) {

            const imgReducida = await manipulateAsync(
                result.uri,
                [{ resize: { width: 700, height: 700 } }],
                { compress: 1, format: SaveFormat.PNG, base64: true }
            )

            formik.setFieldValue('image', { uri: imgReducida.uri, name: 'imageNombre', type: 'image/png' })

            const thumbnail = await manipulateAsync(
                result.uri,
                [{ resize: { width: 250, height: 250 } }],
                { format: SaveFormat.PNG, base64: true }
            )

            setFoto(thumbnail.uri)

            formik.setFieldValue('thumbnail', { uri: thumbnail.uri, name: 'imageNombre', type: 'image/png' }).then(() => {
                dispatch(loadingCompany(false))
            })

        }
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <HeaderGrid sending={sending} onPress={logout} title="Mi Tienda" showButton={true} titleButton='Salir' iconButton='logout' />
                    <View style={{ marginBottom: 20 }}>
                        {/* <Text>{JSON.stringify(foto)}</Text> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {foto ?
                                <Image mode='cover' source={{ uri: foto }} style={{ width: 120, height: 120 }} />
                                :
                                <Text>Sin Imagen</Text>
                            }
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                            <Button onPress={pickImage} mode='outlined' icon={'camera'} style={Styles.buttonPlus}>
                                {labelFoto}
                            </Button>
                            <Button onPress={pickImageLibrary} mode='outlined' icon={'image'} style={Styles.buttonPlus}>
                                {labelLibrary}
                            </Button>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>{formik.errors.image1 && <Text style={Styles.error}>{formik.errors.image1}</Text>}</View>
                    </View>
                    <View style={{ marginTop: 10 }}>
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

                            <DropList
                                label='Plantilla de Catálogo'
                                placeholder='Seleccione el tipo de plantilla'
                                searchPlaceholder='Escriba aquí para buscar ...'
                                labelField={'name'}
                                data={company.templates}
                                value={formik.values.template_catalog_id || ''}
                                backgroundColor='#000'
                                onChange={value => formik.setFieldValue('template_catalog_id', value.id)}
                            />
                            {formik.errors.template_catalog_id && <Text style={Styles.error}>{formik.errors.template_catalog_id}</Text>}

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
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}