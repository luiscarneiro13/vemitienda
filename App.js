import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { THEME } from './src/constants/Theme'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import TabNavigator from './src/navigations/TabNavigator'
import { CrearTablas } from './src/constants/DataBase'
import store from './src/redux/store'

const RootNavigation = () => {
  return (
    <PaperProvider theme={THEME}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </PaperProvider>
  )
}

export default function App() {
  useEffect(() => {
    CrearTablas()
  }, [])

  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  )
}
