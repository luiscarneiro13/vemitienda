import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import CardCustom from '../../components/CardCustom'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import { Styles } from '../../constants/Styles'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { MakePdf, MakePdfPrueba } from './Functions'
import { getProducts } from '../../redux/thunks'
import { useDispatch, useSelector } from 'react-redux'

export default function Share() {

    const [sending, setSending] = useState(false)

    const dispatch = useDispatch()
    const productsFilters = useSelector(state => state?.products.productsFilters) || []
    const company = useSelector(state => state.company?.company)
    const title = 'Productos Públicos'

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const generatePdf = async () => {
        setSending(true)
        // const result = MakePdf(productsFilters, company)
        const result = MakePdfPrueba(productsFilters, company)
        const file = await Print.printToFileAsync({
            html: result,
            base64: false
        })
        await Sharing.shareAsync(file.uri)
        setSending(false)
    }

    const onClickShare = (item) => { }


    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <HeaderGrid sending={sending} onPress={() => generatePdf()} title={title} showButton={true} titleButton={'Compartir'} iconButton={'share-variant-outline'} />
                <View style={{ marginTop: -10, marginBottom: 10 }}>
                    <Text>A continuación se mostrarán los Productos a los que colocaste la opción de compartir</Text>
                </View>
                <CardCustom onClick={onClickShare} share={true} />
            </View>
        </View>
    )
}