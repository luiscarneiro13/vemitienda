import React, { useState } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { Button, TextInput, Switch } from 'react-native-paper'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'
import * as ImagePicker from 'expo-image-picker'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import * as MediaLibrary from 'expo-media-library'
import DropList from '../../components/DropDown'
import { useSelector, useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as Func from './Functions'
import { addPlant } from '../../redux/slices/plantsSlice'
import { useNavigation } from '@react-navigation/native'
import MoneyComponent from '../../components/MoneyComponent'
import SwitchComponent from '../../components/SwitchComponent'


export default function Index() {

    const [foto, setFoto] = useState(null)
    const [foto2, setFoto2] = useState(null)
    const [isSwitchOn, setIsSwitchOn] = useState(false)
    const [sending, setSending] = useState(false)
    const categories = useSelector(state => state.categories)
    const plants = useSelector(state => state.plants)
    const dispatch = useDispatch()
    const navigator = useNavigation()


    const formik = useFormik({
        initialValues: Func.initialValues(),
        validationSchema: Yup.object(Func.validationSchema()),
        onSubmit: async (data) => { await sendForm(data) }
    })

    const sendForm = async (data) => {
        setSending(true)
        try {
            const resp = await Func.handleForm(data)
            if (resp.status && (resp.status === 200)) {
                dispatch(addPlant(resp.data))
                // Func.defaultInputs.map((value, key) => { formik.setFieldValue(key, value) })
                navigator.navigate('Home')
                Alert.alert("Excelente!", "Plantita agregada con éxito")
            } else {
                Alert.alert('Error', resp.message)
            }
            setSending(false)
        } catch (error) {
            setSending(false)
            console.log("error: ", error)
        }
    }

    const pickImage = async () => {

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.cancelled) {

            const imgReducida = await manipulateAsync(
                result.uri,
                [{ resize: { width: 700, height: 700 } }],
                {
                    compress: 1,
                    format: SaveFormat.PNG,
                    base64: true
                }
            )
            const imagen = await MediaLibrary.createAssetAsync(imgReducida.uri)
            setFoto(imagen.uri)
            /* El imagen.uri es la url que se debe guardar en base de datos */
            formik.setFieldValue('image', imagen.uri)
            formik.setFieldValue('image_base64', imgReducida.base64)
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
            const imagen2 = await MediaLibrary.createAssetAsync(imgReducida2.uri)
            setFoto2(imagen2.uri)
            /* El imagen.uri es la url que se debe guardar en base de datos */
            formik.setFieldValue('image2', imagen2.uri)
            formik.setFieldValue('image2_base64', imgReducida2.base64)
        }
    }

    const selectedCategories = (item) => {

        formik.setFieldValue('category_id', item.id)
    }

    const onChangeSwitch = (item) => {
        formik.setFieldValue('share', item)
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <HeaderGrid title="Agregar Plantita" />
                    <View style={{ marginBottom: 200 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {foto ?
                                <Image mode='cover' source={{ uri: foto }} style={{ width: 120, height: 120 }} />
                                :
                                <Text>Imagen no disponible</Text>
                            }
                            {foto2 ?
                                <Image mode='cover' source={{ uri: foto2 }} style={{ width: 120, height: 120 }} />
                                :
                                <Text>Imagen no disponible</Text>
                            }
                        </View>
                        {formik.errors.image && <Text style={Styles.error}>{formik.errors.image}</Text>}

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button onPress={pickImage} mode='outlined' icon={'camera'} style={{ marginTop: 20, height: 40 }}>
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
                            value={formik.values.name}
                            onChangeText={(text) => formik.setFieldValue('name', text)}
                        />
                        {formik.errors.name && <Text style={Styles.error}>{formik.errors.name}</Text>}

                        <MoneyComponent
                            label='Precio (Opcional)'
                            value={formik.values.price}
                            onChange={item => formik.setFieldValue('price', item)}
                        />

                        <DropList
                            placeholder={'Categoría'}
                            labelField={'name'}
                            data={categories}
                            onChange={selectedCategories}
                            value={formik.values.category_id}
                        />
                        {formik.errors.category_id && <Text style={Styles.error}>{formik.errors.category_id}</Text>}

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Text style={{ marginTop: 12, marginRight: 30, color: '#818080' }}>Compartir</Text>
                            <SwitchComponent onChange={onChangeSwitch} value={formik.values.share} />
                        </View>
                        <Text style={{ color: '#818080' }}>Si habilitas compartir, la planta y su información se agregarán al pdf que podrás enviar con tus plantas</Text>

                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>

                            <Button
                                icon="content-save"
                                mode="contained"
                                uppercase={false}
                                loading={sending}
                                disabled={sending}
                                style={{ marginTop: 25, height: 40 }}
                                onPress={formik.handleSubmit}
                            >
                                Guardar
                            </Button>

                        </View>
                        <SparatorFooter />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}