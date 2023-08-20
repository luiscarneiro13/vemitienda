import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Home from '../../screens/home'
import HomeDetails from '../../screens/home/DetailScreen'
import Share from '../../screens/home/Share'

const Stack = createStackNavigator()

export default function NavigatorHome() {
    return (
        <Stack.Navigator screenOptions={opciones}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="HomeDetails" component={HomeDetails} />
            <Stack.Screen name="Share" component={Share} />
        </Stack.Navigator>
    )
}

const opciones = {
    headerShown: false
}