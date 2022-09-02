import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { THEME } from './src/constants/Theme'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider, useDispatch, useSelector } from 'react-redux'
import TabNavigator from './src/navigations/TabNavigator'
import store from './src/redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from './src/constants/Config'
import Loading from './src/components/Loading'
import AuthNavigator from './src/navigations/AuthNavigator'
import { addToken } from './src/redux/slices/tokenSlice'

const RootNavigation = () => {

  const token = useSelector(state => state.token) || ''
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      if (token.length === 0) {
        const findToken = await AsyncStorage.getItem('@token')
        if (findToken) {
          dispatch(addToken(findToken))
        } else {
          await AsyncStorage.setItem('@token', '')
        }
      }
    })()
  })

  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

  /* Tuve que usar el interceptor, porque el token tarda para montarse en el estado de redux */
  axios.interceptors.request.use(
    config => { return config },
    error => { Promise.reject(error) }
  )

  axios.interceptors.response.use(function (response) {
    /* Si todo va bien, se devuelve todo tal cual */
    if (response?.data?.errors) {
      Alert.alert("Error", Object.values(response.data.errors)[0][0]);
    } else {
      return response
    }
  }, function (error) {
    /* Si hay un código diferente a 2xx, entonces busco a ver si es 403, de ser así lo envío al login */
    if (error?.response?.data?.status === 403 && token) {

      // dispatch(logoutUserInformation())
      // dispatch(deleteCargaInicial())
      // dispatch(logoutUsuario())
      AsyncStorage.clear()
    }
  })

  return (
    <PaperProvider theme={THEME}>
      <NavigationContainer>
        {
          token.length > 0 ? <TabNavigator /> : <AuthNavigator />
        }
      </NavigationContainer>
    </PaperProvider>
  )
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setIsLoaded(true)
    }, 5000)
  }, [])


  return (
    <Provider store={store}>
      {isLoaded ? <RootNavigation /> : <Loading />}
    </Provider>
  )
}
