import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Add from '../../screens/add'

const Stack = createStackNavigator()

export default function NavigatorAdd() {
  return (
    <Stack.Navigator screenOptions={opciones}>
      <Stack.Screen name="Add" component={Add} />
    </Stack.Navigator>
  )
}

const opciones = {
  headerShown: false
}