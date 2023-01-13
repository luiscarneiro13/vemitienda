import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Styles } from '../../constants/Styles'
import HeaderGrid from '../../components/HeaderGrid'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { Button, Dialog, Portal, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, loadingCategories } from '../../redux/slices/categoriesSlice'
import Atras from '../../components/Atras'
import * as Func from './Functions'
import { destroyCategoryThunk, storeCategoryThunk, updateCategoryThunk } from '../../redux/thunks'

export default function DetailScreen(item) {

    const categories = useSelector(state => state?.categories)
    const params = item.route.params || null
    const props = params.item || null
    const title = params?.update ? 'Actualizar Categoría' : 'Agregar Categoría'
    const accion = params?.update ? 'Update' : 'Create'

    const [visible, setVisible] = useState(false)
    const navigator = useNavigation()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: Func.initialValues(props),
        validationSchema: Yup.object(Func.validationSchema()),
        onSubmit: (data) => {
            (
                async () => {
                    if (accion === 'Update') {
                        data.id = props.id
                        dispatch(updateCategoryThunk(data))
                    } else {
                        dispatch(storeCategoryThunk(data))
                    }
                    navigator.navigate('Categories')
                }
            )()
        }
    })

    const hideDialog = () => setVisible(false)

    const handleConfirm = () => { setVisible(true) }

    const handleDelete = async () => {
        hideDialog()
        dispatch(loadingCategories(true))
        dispatch(destroyCategoryThunk(props.id))
        navigator.navigate('Categories')
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
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>

                    {accion === 'Update' &&
                        <Button
                            icon="delete"
                            mode="outlined"
                            uppercase={false}
                            loading={categories.isLoading}
                            disabled={categories.isLoading}
                            style={Styles.buttonPlus}
                            onPress={handleConfirm}
                        >
                            Eliminar
                        </Button>
                    }

                    <Button
                        icon="content-save"
                        mode="contained"
                        uppercase={false}
                        loading={categories.isLoading}
                        disabled={categories.isLoading}
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
            </View>
        </View>
    )
}