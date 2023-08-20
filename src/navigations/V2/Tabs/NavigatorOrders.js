import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Orders from '../../screens/orders/Orders'
import OrderDetails from '../../screens/orders/OrderDetails'


const Stack = createStackNavigator()

export default function NavigatorShare() {
  return (
    <Stack.Navigator screenOptions={opciones}>
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  )
}

const opciones = {
  headerShown: false
}