import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Styles } from '../../constants/Styles'
import HeaderGrid from '../../components/HeaderGrid'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import * as Func from './Functions'
import { useNavigation } from '@react-navigation/native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { addCategory, deleteCategory, updateCategory } from '../../redux/slices/categoriesSlice'
import Atras from '../../components/Atras'

export default function DetailScreen(item) {

    const params = item.route.params || null
    const props = item.route.params.item || null
    const title = params?.update ? 'Actualizar Categoría' : 'Agregar Categoría'
    const accion = params?.update ? 'Update' : 'Create'

    const [sending, setSending] = useState(false)
    const [visible, setVisible] = useState(false)
    const navigator = useNavigation()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: Func.initialValues(props),
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

    const hideDialog = () => setVisible(false)

    const handleConfirm = () => { setVisible(true) }

    const handleDelete = async () => {
        hideDialog()
        setSending(true)
        try {
            const resp = await Func.handleDelete(props)
            if (resp.status && (resp.status === 200)) {
                dispatch(deleteCategory(resp.data))
                navigator.navigate('Categories')
                Alert.alert("Excelente!", "Categoría eliminada con éxito")
            } else {
                Alert.alert('Error', resp.message)
            }
            setSending(false)
        } catch (error) {
            setSending(false)
            console.log("error: ", error)
        }
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Atras />
                    <HeaderGrid title={title} showButton={false} />
                </View>
                <View style={{ marginTop: 20, marginBottom: 50 }}>
                    <TextInput
                        mode='outlined'
                        label="Nombre de la Categoría"
                        value={formik.values.name}
                        onChangeText={(text) => formik.setFieldValue('name', text)}
                    />
                    {formik.errors.name && <Text style={Styles.error}>{formik.errors.name}</Text>}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

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

                    {accion === 'Update' &&
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
                    }

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
            </View>
        </View>
    )
}