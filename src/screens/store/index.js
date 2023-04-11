import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { View, ScrollView, Text, ActivityIndicator, Alert, Image } from 'react-native'
import { Button, TextInput, useTheme } from 'react-native-paper'
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
    const [imagenCargada, setImagenCargada] = useState(false)
    const [labelFoto, setLabelFoto] = useState('Tomar Foto')
    const [labelLibrary, setLabelLibrary] = useState('Galería')
    const [sending, setSending] = useState(false)
    const dispatch = useDispatch()
    const company = useSelector(state => state.company)
    const isLoading = useSelector(state => state.company?.isLoading)
    const themes = useSelector(state => state.themes?.themes)
    const navigator = useNavigation()
    const theme = useTheme()
    const [themeLocal, setThemeLocal] = useState(company.company.theme ? company.company.theme.hexadecimal : '#ffffff')
    
    useEffect(() => {
        if (company?.company?.logo?.thumbnail) {
            if (company.company.logo.thumbnail.includes('file:')) {
                setFoto(company.company.logo.thumbnail)
            } else {
                setFoto(DIGITALOCEAN + company.company.logo.thumbnail)
            }
        }
    }, [])

    const logout = async () => {
        dispatch(deleteToken())
    }

    const formik = useFormik({
        initialValues: Func.initialValues(company.company),
        validationSchema: Yup.object(Func.validationSchema({ imagenCargada, foto })),
        onSubmit: (data) => {
            (
                async () => {
                    data.imagenCargada = imagenCargada
                    data.foto = foto
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
        let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 4], quality: 1 });

        if (!result.cancelled) {
            dispatch(loadingCompany(true))

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
            setImagenCargada(true)
            formik.setFieldValue('thumbnail', { uri: thumbnail.uri, name: 'imageNombre', type: 'image/png' }).then(() => {
                dispatch(loadingCompany(false))
            })
        }
    }

    const pickImageLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 4], quality: 1 })

        if (!result.cancelled) {
            dispatch(loadingCompany(true))

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
            setImagenCargada(true)

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

                    <View style={{ marginTop: 10 }}>
                        <>
                            <Text>Ésta configuración estará en el pdf que genera la App</Text>

                            <TextInput
                                mode='flat'
                                label="Nombre comercial"
                                placeholder="Ingrese su nombre comercial aquí"
                                value={formik.values?.name || ''}
                                onChangeText={(text) => formik.setFieldValue('name', text)}
                                outlineColor={theme.colors.primary}
                                color={theme.colors.primary}
                                theme={{ colors: { text: theme.colors.primary } }}
                                style={{ marginTop: 10, marginBottom: 10, backgroundColor: '#FFF' }}
                            />
                            {formik.errors.name && <Text style={Styles.error}>{formik.errors.name}</Text>}

                            <TextInput
                                mode='flat'
                                label="Email"
                                placeholder="Ingrese su email comercial aquí"
                                value={formik.values?.email || ''}
                                onChangeText={(text) => formik.setFieldValue('email', text)}
                                outlineColor={theme.colors.primary}
                                color={theme.colors.primary}
                                theme={{ colors: { text: theme.colors.primary } }}
                                style={{ marginBottom: 10, backgroundColor: '#FFF' }}
                            />
                            {formik.errors.email && <Text style={Styles.error}>{formik.errors.email}</Text>}

                            <TextInput
                                mode='flat'
                                label="Slogan o lema"
                                placeholder="Ingrese su slogan o lema comercial aquí"
                                value={formik.values?.slogan || ''}
                                onChangeText={(text) => formik.setFieldValue('slogan', text)}
                                outlineColor={theme.colors.primary}
                                color={theme.colors.primary}
                                theme={{ colors: { text: theme.colors.primary } }}
                                style={{ marginBottom: 10, backgroundColor: '#FFF' }}
                            />
                            {formik.errors.slogan && <Text style={Styles.error}>{formik.errors.slogan}</Text>}

                            <TextInput
                                mode='flat'
                                label="Teléfono"
                                placeholder="Ingrese su teléfono comercial aquí"
                                value={formik.values?.phone || ''}
                                onChangeText={(text) => formik.setFieldValue('phone', text)}
                                outlineColor={theme.colors.primary}
                                color={theme.colors.primary}
                                theme={{ colors: { text: theme.colors.primary } }}
                                style={{ marginBottom: 10, backgroundColor: '#FFF' }}
                            />
                            {formik.errors.phone && <Text style={Styles.error}>{formik.errors.phone}</Text>}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ backgroundColor: themeLocal, width: 30, height: 30 }}></View>
                                <View style={{ width: '80%' }}>
                                    <DropList
                                        label="Tema para la tienda"
                                        placeholder="Color de la tienda"
                                        searchPlaceholder="Escriba aquí para buscar ..."
                                        labelField={"spanish"}
                                        data={themes}
                                        value={formik.values.theme_id || ""}
                                        backgroundColor="#000"
                                        onChange={(value) => {
                                            setThemeLocal(value.hexadecimal)
                                            formik.setFieldValue("theme_id", value.id)
                                        }}
                                    />
                                </View>
                            </View>
                            {formik.errors.theme_id && (
                                <Text style={Styles.error}>{formik.errors.theme_id}</Text>
                            )}

                            {/* <TextInput
                                mode='flat'
                                label="Color de fondo del Catálogo"
                                placeholder="Ejemplo: #FFFFFF"
                                value={formik.values?.background_color_catalog || ''}
                                onChangeText={(text) => formik.setFieldValue('background_color_catalog', text)}
                                outlineColor={theme.colors.primary}
                                color={theme.colors.primary}
                                theme={{ colors: { text: theme.colors.primary } }}
                                style={{ marginBottom: 10, backgroundColor: '#FFF' }}
                            />
                            {formik.errors.background_color_catalog && <Text style={Styles.error}>{formik.errors.background_color_catalog}</Text>} */}

                            <View style={{ marginBottom: 20 }}>
                                {/* <Text>{JSON.stringify(foto)}</Text> */}
                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
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
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {formik.errors.image && <Text style={Styles.error}> {formik.errors.image}</Text>}
                                </View>
                            </View>

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