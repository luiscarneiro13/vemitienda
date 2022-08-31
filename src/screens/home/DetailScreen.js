import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { Button, TextInput, Switch, Portal, Dialog } from 'react-native-paper'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'
import DropList from '../../components/DropDown'
import { useSelector, useDispatch } from 'react-redux'
import * as Func from '../add/Functions'
import { deletePlant } from '../../redux/slices/plantsSlice'
import { useNavigation } from '@react-navigation/native'


export default function Index(props) {

    const item = props?.route?.params?.item || null
    const [foto, setFoto] = useState(null)
    const [isSwitchOn, setIsSwitchOn] = useState(false)
    const [sending, setSending] = useState(false)
    const categories = useSelector(state => state.categories)
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const navigator = useNavigation()

    const hideDialog = () => setVisible(false)
    const handleConfirm = () => { setVisible(true) }

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


    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <HeaderGrid title="Detalles de la Plantita" />
                    <View style={{ marginBottom: 200 }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {item.image ?
                                <Image mode='cover' source={{ uri: item.image }} style={{ width: 150, height: 150 }} />
                                :
                                <Text>Imagen no disponible</Text>
                            }
                            {item.image2 ?
                                <Image mode='cover' source={{ uri: item.image2 }} style={{ width: 150, height: 150 }} />
                                :
                                <Text>Imagen no disponible</Text>
                            }
                        </View>
                    </View>
                    <View style={{ marginTop: -180 }}>
                        <TextInput
                            mode='outlined'
                            label="Nombre"
                            value={item.name || ''}
                        />

                        <TextInput
                            mode='outlined'
                            label="Precio"
                            value={item.price.toString() || '0'}
                        />

                        <TextInput
                            mode='outlined'
                            label="Compartir"
                            value={item.share === 1 ? 'Si' : 'No'}
                        />

                        <DropList
                            label='Categoría'
                            placeholder='Categoría'
                            labelField={'name'}
                            data={categories}
                            value={item.category_id || ''}
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