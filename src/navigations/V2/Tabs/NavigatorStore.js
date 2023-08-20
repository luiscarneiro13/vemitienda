import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Store from '../../screens/store'

const Stack = createStackNavigator()

export default function NavigatorStore() {
  return (
    <Stack.Navigator screenOptions={opciones}>
      <Stack.Screen name="Store" component={Store} />
    </Stack.Navigator>
  )
}

const opciones = {
  headerShown: false
}