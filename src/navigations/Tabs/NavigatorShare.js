import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
// import Share from '../../screens/share'

const Stack = createStackNavigator()

export default function NavigatorShare() {
  return (
    <Stack.Navigator screenOptions={opciones}>
      <Stack.Screen name="Share" component={Share} />
    </Stack.Navigator>
  )
}

const opciones = {
  headerShown: false
}