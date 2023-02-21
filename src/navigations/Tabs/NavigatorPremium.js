import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Premium from '../../screens/plans/Premium'

const Stack = createStackNavigator()

export default function NavigatorShare() {
  return (
    <Stack.Navigator screenOptions={opciones}>
      <Stack.Screen name="Premium" component={Premium} />
    </Stack.Navigator>
  )
}

const opciones = {
  headerShown: false
}