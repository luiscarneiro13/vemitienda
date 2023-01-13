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


export default function Index(prop) {

    const params = prop.route.params || null
    const props = params?.item || null
    const title = params?.update ? 'Actualizar Producto o Servicio' : 'Agregar Producto o Servicio'
    const accion = params?.update ? 'Update' : 'Create'

    const [foto, setFoto] = useState(null)
    const [sending, setSending] = useState(false)
    const categories = useSelector(state => state.categories.categories)
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const navigator = useNavigation()

    const hideDialog = () => setVisible(false)
    const handleConfirm = () => { setVisible(true) }

    const formik = useFormik({
        initialValues: Func.initialValues(props),
        validationSchema: Yup.object(Func.validationSchema()),
        onSubmit: (data) => {
            (
                async () => {
                    if (accion === 'Update') {
                        Alert.alert(accion)
                        // data.id = props.id
                        // dispatch(updateCategoryThunk(data))
                    } else {
                        Alert.alert(accion)
                        // dispatch(storeCategoryThunk(data))
                    }
                    navigator.navigate('Categories')
                }
            )()
        }
    })

    console.log("formik", formik)
    // const formik = useFormik({
    //     initialValues: Func.initialValues(props),
    //     validationSchema: Yup.object(Func.validationSchema()),
    //     onSubmit: (data) => {
    //         (
    //             async () => {
    //                 setSending(true)
    //                 try {
    //                     Alert.alert("HOLA")
    //                 } catch (error) {
    //                     setSending(false)
    //                     console.log("error: ", error)
    //                 }
    //             }
    //         )()
    //     }
    // })

    const handleDelete = async () => {

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

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <View style={{ flexDirection: 'row' }}>
                        <Atras />
                        <HeaderGrid title={title} />
                    </View>
                    <View style={{ marginBottom: 200 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            {foto ?
                                <Image mode='cover' source={{ uri: foto }} style={{ width: 120, height: 120 }} />
                                :
                                <Text>Sin Imagen</Text>
                            }
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <Button onPress={pickImage1} mode='outlined' icon={'camera'} style={Styles.buttonPlus}>
                                Foto
                            </Button>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>{formik.errors.image1 && <Text style={Styles.error}>{formik.errors.image1}</Text>}</View>
                    </View>
                    <View style={{ marginTop: -180 }}>
                        <TextInput
                            mode='outlined'
                            label="Nombre"
                            value={formik.values.name}
                        />
                        {formik.errors.name && <Text style={Styles.error}>{formik.errors.name}</Text>}

                        <TextInput
                            mode='outlined'
                            label="Descripción"
                            value={formik.values.description}
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
                        />
                        {formik.errors.category_id && <Text style={Styles.error}>{formik.errors.category_id}</Text>}

                        <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ width: '50%' }}>
                                <Text style={{ marginTop: 7 }}>Compartir en Catálogo</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <SwitchSelector
                                    options={[
                                        { label: "No", value: "0" },
                                        { label: "Si", value: "1" }
                                    ]}
                                    initial={formik.values.share}
                                    buttonColor={'#0c77c3'}
                                    borderColor='#000'
                                    borderWidth={1}
                                    backgroundColor={'#EEEEEE'}
                                    accessibilityLabel="gender-switch-selector"
                                    onPress={value => formik.setFieldValue('share', value)}
                                />
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>

                            {accion === 'Update' &&
                                <Button
                                    icon="delete"
                                    mode="outlined"
                                    uppercase={false}
                                    loading={sending}
                                    disabled={sending}
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
                                loading={sending}
                                disabled={sending}
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