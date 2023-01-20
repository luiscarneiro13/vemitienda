import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { Button, TextInput, Portal, Dialog } from 'react-native-paper'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'
import DropList from '../../components/DropDown'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Atras from '../../components/Atras'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as Func from './Functions'
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import * as MediaLibrary from 'expo-media-library'
import MoneyComponent from '../../components/MoneyComponent'
import SwitchSelector from "react-native-switch-selector"
import { destroyProductThunk, storeProductThunk, updateProductThunk } from '../../redux/thunks/productsThunk'
import { loadingProducts } from '../../redux/slices'
import { DIGITALOCEAN } from '../../constants/Data'


export default function Index(prop) {

    const params = prop.route.params || null
    const props = params?.item || null
    const title = params?.update ? 'Actualizar Producto o Servicio' : 'Agregar Producto o Servicio'
    const accion = params?.update ? 'Update' : 'Create'

    const [foto, setFoto] = useState(null)
    const [imagenCargada, setImagenCargada] = useState(false)
    const [labelFoto, setLabelFoto] = useState('Tomar Foto')
    const [labelLibrary, setLabelLibrary] = useState('Galería')
    const categories = useSelector(state => state.categories.categories)
    const isLoading = useSelector(state => state.products.isLoading)
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const navigator = useNavigation()

    useEffect(() => {
        if (props) {
            if (!foto && props?.image?.length) {
                if (props.image[0].thumbnail.includes('file:')) {
                    setFoto(props.image[0].thumbnail)
                } else {
                    setFoto(DIGITALOCEAN + props.image[0].thumbnail)
                }
            }
        }
    })

    const hideDialog = () => setVisible(false)
    const handleConfirm = () => { setVisible(true) }

    const formik = useFormik({
        initialValues: Func.initialValues(props),
        validationSchema: Yup.object(Func.validationSchema({ imagenCargada })),
        onSubmit: (data) => {
            (
                async () => {
                    try {
                        data.imagenCargada = imagenCargada
                        if (accion === 'Update') {
                            data.id = props.id
                            data.image_id = props?.image[0]?.id
                            dispatch(updateProductThunk(data, navigator))
                        } else {
                            dispatch(storeProductThunk(data, navigator))
                        }
                    } catch (error) {
                        console.log("ERROR CAPTURADO AL ENVIAR")
                    }
                }
            )()
        }
    })


    const handleDelete = async () => {
        dispatch(loadingProducts(true))
        dispatch(destroyProductThunk(props.id))
        navigator.navigate('Home')
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 4], quality: 1 });

        if (!result.cancelled) {
            dispatch(loadingProducts(true))

            const imgReducida = await manipulateAsync(
                result.uri,
                [{ resize: { width: 700, height: 700 } }],
                { compress: 1, format: SaveFormat.PNG }
            )

            /* El imagen.uri es la url que se debe guardar en base de datos */
            formik.setFieldValue('image', { uri: imgReducida.uri, name: 'imageNombre', type: 'image/png' })

            const thumbnail = await manipulateAsync(
                result.uri,
                [{ resize: { width: 250, height: 250 } }],
                { compress: 1, format: SaveFormat.PNG }
            )

            setFoto(thumbnail.uri)
            setImagenCargada(true)
            formik.setFieldValue('thumbnail', { uri: thumbnail.uri, name: 'imageNombre', type: 'image/png' }).then(() => {
                dispatch(loadingProducts(false))
            })
        }
    }

    const pickImageLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [4, 4], quality: 1 })

        if (!result.cancelled) {
            dispatch(loadingProducts(true))

            const imgReducida = await manipulateAsync(
                result.uri,
                [{ resize: { width: 700, height: 700 } }],
                { compress: 1, format: SaveFormat.PNG }
            )

            formik.setFieldValue('image', { uri: imgReducida.uri, name: 'imageNombre', type: 'image/png' })

            const thumbnail = await manipulateAsync(
                result.uri,
                [{ resize: { width: 250, height: 250 } }],
                { compress: 1, format: SaveFormat.PNG }
            )

            setFoto(thumbnail.uri)
            setImagenCargada(true)

            formik.setFieldValue('thumbnail', { uri: thumbnail.uri, name: 'imageNombre', type: 'image/png' }).then(() => {
                dispatch(loadingProducts(false))
            })

        }
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <View style={{ flexDirection: 'row' }}>
                        <Atras />
                        <HeaderGrid title={title} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TextInput
                            mode='outlined'
                            label="Nombre"
                            value={formik.values.name}
                            onChangeText={(text) => formik.setFieldValue('name', text)}
                        />
                        {formik.errors.name && <Text style={Styles.error}>{formik.errors.name}</Text>}

                        <TextInput
                            mode='outlined'
                            label="Descripción"
                            value={formik.values.description}
                            onChangeText={(text) => formik.setFieldValue('description', text)}
                        />
                        {formik.errors.description && <Text style={Styles.error}>{formik.errors.description}</Text>}

                        <MoneyComponent
                            label='Precio (Opcional)'
                            value={formik.values.price.toString()}
                            onChange={value => formik.setFieldValue('price', value)}
                        />
                        {formik.errors.price && <Text style={Styles.error}>{formik.errors.price}</Text>}

                        <DropList
                            label='Categoría'
                            placeholder='Categoría'
                            searchPlaceholder='Escriba aquí para buscar ...'
                            labelField={'name'}
                            data={categories}
                            value={formik.values.category_id || ''}
                            backgroundColor='#000'
                            onChange={value => formik.setFieldValue('category_id', value.id)}
                        />
                        {formik.errors.category_id && <Text style={Styles.error}>{formik.errors.category_id}</Text>}

                        <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ marginTop: 7 }}>Compartir en Catálogo</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <SwitchSelector
                                    options={[
                                        { label: "No", value: 0 },
                                        { label: "Si", value: 1 }
                                    ]}
                                    initial={parseInt(formik.values.share)}
                                    buttonColor={'#0c77c3'}
                                    borderColor='#000'
                                    borderWidth={1}
                                    backgroundColor={'#EEEEEE'}
                                    accessibilityLabel="gender-switch-selector"
                                    onPress={value => formik.setFieldValue('share', value)}
                                />
                            </View>
                        </View>

                        <View style={{ marginBottom: 50 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 20 }}>
                                {foto ?
                                    <Image mode='cover' source={{ uri: foto }} style={{ width: 100, height: 100 }} />
                                    :
                                    <Text>Agregar Imagen</Text>
                                }
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Button onPress={pickImage} mode='outlined' icon={'camera'} style={Styles.buttonPlus}>
                                    {labelFoto}
                                </Button>
                                <Button onPress={pickImageLibrary} mode='outlined' icon={'camera'} style={Styles.buttonPlus}>
                                    {labelLibrary}
                                </Button>
                            </View>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                {formik.errors.image && <Text style={Styles.error}>{formik.errors.image}</Text>}
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                            {accion === 'Update' &&
                                <Button
                                    icon="delete"
                                    mode="outlined"
                                    uppercase={false}
                                    loading={isLoading}
                                    disabled={isLoading}
                                    onPress={handleConfirm}
                                    style={Styles.buttonPlus}
                                >
                                    Eliminar
                                </Button>
                            }

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

                            <Portal>
                                <Dialog visible={visible} onDismiss={hideDialog}>
                                    <Dialog.Title style={Styles.center}>¿Está seguro de eliminar?</Dialog.Title>
                                    <Dialog.Content>
                                    </Dialog.Content>
                                    <Dialog.Actions style={{ justifyContent: 'space-between' }}>
                                        <Button onPress={hideDialog}>No</Button>
                                        <Button onPress={handleDelete}>Si, Estoy seguro</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </View>
                        <SparatorFooter />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}