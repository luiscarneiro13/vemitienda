import { View, Text } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export default function Atras() {

    const navigator = useNavigation()

    return (
        <IconButton
            icon="arrow-left"
            size={20}
            onPress={() => navigator.goBack()}
        />
    )
}