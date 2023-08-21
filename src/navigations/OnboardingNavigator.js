import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Screen1 from '../screens/onboarding/Screen1'
import Screen2 from '../screens/onboarding/Screen2'

const Stack = createStackNavigator()

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      // headerTransparent: true,
    }}>
      <Stack.Screen name="Screen1" component={Screen1} />
      <Stack.Screen name="Screen2" component={Screen2} />
    </Stack.Navigator>
  )
}