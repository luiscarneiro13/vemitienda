import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import CardCustom from '../../components/CardCustom'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import { selectDB } from '../../constants/DataBase'
import { Styles } from '../../constants/Styles'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { MakePdf } from './Functions'

export default function Share() {

    const [sending, setSending] = useState(false)

    const [html, setHtml] = useState()
    const name = 'Nombre de ejemplo para el pdf'
    const [plants, setPlants] = useState([])
    const title = 'Plantitas'
    const select = `Select plants.*, categories.name as category from plants INNER JOIN categories ON plants.category_id = categories.id where plants.share=1;`



    useFocusEffect(
        useCallback(() => {
            selectDB(select, [], (rows) => {
                setPlants(rows)
            })
        }, [])
    )

    const generatePdf = async () => {
        setSending(true)
        const result = MakePdf(plants)
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
                    <Text>A continuación se mostrarán las Plantitas a las que les colocaste la opción de compartir</Text>
                </View>
                <CardCustom data={plants} onClick={onClickShare} compartir={true}/>
            </View>
        </View>
    )
}