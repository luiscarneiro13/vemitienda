import { View, Text, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

export default function CaptureImage() {

    const image = require('../images/4.png')

    return (
        <View style={{ marginBottom: 200 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image mode='cover' source={image} style={{ width: 200, height: 200 }} />
                <Button mode='outlined' icon={'camera'} style={{ marginTop: 20, height: 40 }}>
                    Tomar Foto
                </Button>
            </View>
        </View>
    )
}