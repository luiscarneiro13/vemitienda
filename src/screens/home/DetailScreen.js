import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { Button, TextInput, Switch, Portal, Dialog, IconButton } from 'react-native-paper'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'
import DropList from '../../components/DropDown'
import { useSelector, useDispatch } from 'react-redux'
import { deletePlant } from '../../redux/slices/plantsSlice'
import { useNavigation } from '@react-navigation/native'
import Atras from '../../components/Atras'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as Func from './Functions'
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import * as MediaLibrary from 'expo-media-library'

export default function Index(props) {

    const item = props?.route?.params?.item || null
    const [foto, setFoto] = useState(null)
    const [foto2, setFoto2] = useState(null)
    const [isSwitchOn, setIsSwitchOn] = useState(false)
    const [sending, setSending] = useState(false)
    const categories = useSelector(state => state.categories)
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const navigator = useNavigation()

    const hideDialog = () => setVisible(false)
    const handleConfirm = () => { setVisible(true) }

    const formik = useFormik({
        initialValues: Func.initialValues(item),
        validationSchema: Yup.object(Func.validationSchema()),
        onSubmit: (data) => {
            (
                async () => {
                    setSending(true)
                    try {
                        const resp = await Func.handleForm(data, accion, props)
                        if (resp.status && (resp.status === 200)) {
                            if (accion === 'Update') {
                                dispatch(updateCategory(resp.data))
                            } else {
                                dispatch(addCategory(resp.data))
                            }
                            navigator.navigate('Categories')
                            Alert.alert("Excelente!", "Categoría agregada con éxito")
                        } else {
                            Alert.alert('Error', resp.message)
                        }
                        setSending(false)
                    } catch (error) {
                        setSending(false)
                        console.log("error: ", error)
                    }
                }
            )()
        }
    })

    const handleDelete = async () => {
        hideDialog()
        setSending(true)
        try {
            const resp = await Func.handleDelete(item)
            if (resp.status && (resp.status === 200)) {
                dispatch(deletePlant(resp.data))
                navigator.navigate('Home')
                Alert.alert("Excelente!", "Planta eliminada con éxito")
            } else {
                Alert.alert('Error', resp.message)
            }
            setSending(false)
        } catch (error) {
            setSending(false)
            console.log("error: ", error)
        }
    }

    const pickImage1 = async () => {

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.cancelled) {

            const imgReducida1 = await manipulateAsync(
                result.uri,
                [{ resize: { width: 700, height: 700 } }],
                {
                    compress: 1,
                    format: SaveFormat.PNG,
                    base64: true
                }
            )
            setFoto(imgReducida1.uri)
            /* El imagen.uri es la url que se debe guardar en base de datos */
            formik.setFieldValue('image1', imgReducida1.uri)
            formik.setFieldValue('image1_base64', imgReducida1.base64)
        }
    }
    const pickImage2 = async () => {

        let result2 = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result2.cancelled) {

            const imgReducida2 = await manipulateAsync(
                result2.uri,
                [{ resize: { width: 700, height: 700 } }],
                {
                    compress: 1,
                    format: SaveFormat.PNG,
                    base64: true
                }
            )
            setFoto2(imgReducida2.uri)
            /* El imagen.uri es la url que se debe guardar en base de datos */
            formik.setFieldValue('image2', imgReducida2.uri)
            formik.setFieldValue('image2_base64', imgReducida2.base64)
        }
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <View style={{ flexDirection: 'row' }}>
                        <Atras />
                        <HeaderGrid title={item ? item : "Agregar Producto"} />
                    </View>
                    <View style={{ marginBottom: 200 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {foto ?
                                <Image mode='cover' source={{ uri: foto }} style={{ width: 120, height: 120 }} />
                                :
                                <Text>Sin Imagen</Text>
                            }
                            {foto2 ?
                                <Image mode='cover' source={{ uri: foto2 }} style={{ width: 120, height: 120 }} />
                                :
                                <Text>Sin Imagen</Text>
                            }
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button onPress={pickImage1} mode='outlined' icon={'camera'} style={{ marginTop: 20, height: 40 }}>
                                Foto 1
                            </Button>
                            <Button onPress={pickImage2} mode='outlined' icon={'image'} style={{ marginTop: 20, height: 40 }}>
                                Foto 2
                            </Button>
                        </View>
                    </View>
                    <View style={{ marginTop: -180 }}>
                        <TextInput
                            mode='outlined'
                            label="Nombre"
                            value={item?.name || ''}
                        />

                        <TextInput
                            mode='outlined'
                            label="Descripción"
                            value={item?.description || ''}
                        />

                        <TextInput
                            mode='outlined'
                            label="Precio"
                            value={item?.price.toString() || '0'}
                        />

                        <TextInput
                            mode='outlined'
                            label="Compartir"
                            value={item?.share === 1 ? 'Si' : 'No'}
                        />

                        <DropList
                            label='Categoría'
                            placeholder='Categoría'
                            labelField={'name'}
                            data={categories}
                            value={item?.category_id || ''}
                        />

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>

                            <Button
                                icon="delete"
                                mode="contained"
                                uppercase={false}
                                loading={sending}
                                disabled={sending}
                                style={{ marginTop: 25, height: 40, backgroundColor: '#EA5A28' }}
                                onPress={handleConfirm}
                            >
                                Eliminar
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