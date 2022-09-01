import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import ForgotPassword from '../screens/auth/ForgotPassword'

const Stack = createStackNavigator()

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      // headerTransparent: true,
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  )
}