import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import Header from '../../components/Header'
import HeaderGrid from '../../components/HeaderGrid'
import SparatorFooter from '../../components/SparatorFooter'
import { Styles } from '../../constants/Styles'

export default function index() {

    const [sending, setSending] = useState(false)

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <ScrollView >
                    <HeaderGrid title="Agregar Plantita" showButton={true} />
                    <View style={{ marginTop: -180 }}>
                        <TextInput
                            mode='outlined'
                            label="Nombre"
                        />


                        <SparatorFooter />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}