import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Categories from '../../screens/categories'
import CategoriesDetails from '../../screens/categories/DetailScreen'

const Stack = createStackNavigator()

export default function NavigatorCategories() {
  return (
    <Stack.Navigator screenOptions={opciones}>
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="CategoriesDetails" component={CategoriesDetails} />
    </Stack.Navigator>
  )
}

const opciones = {
  headerShown: false
}