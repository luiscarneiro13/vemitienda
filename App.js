import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { THEME } from './src/constants/Theme'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider, useSelector } from 'react-redux'
import TabNavigator from './src/navigations/TabNavigator'
import store from './src/redux/store'
import axios from 'axios'
import Loading from './src/components/Loading'
import AuthNavigator from './src/navigations/AuthNavigator'
import OnboardingNavigator from './src/navigations/OnboardingNavigator'
import { URL_PRODUCTION } from './src/constants/Data'
import { Alert } from 'react-native'

const RootNavigation = () => {

  const token = useSelector(state => state?.token.token) || null
  const onboarding = useSelector(state => state?.userInfo.onboarding)

  axios.defaults.baseURL = URL_PRODUCTION

  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

  /* Tuve que usar el interceptor, porque el token tarda para montarse en el estado de redux */
  axios.interceptors.request.use(
    config => { return config },
    error => { Promise.reject(error) }
  )

  axios.interceptors.response.use(function (response) {
    /* Si todo va bien, se devuelve todo tal cual */
    if (response?.data?.errors) {
      const key = Object.keys(response.data.errors)[0]
      const message = response?.data?.errors[key][0]
      Alert.alert(response?.data?.errors?.message[0], message);
    } else {
      return response
    }
  }, function (error) {
    /* Si hay un código diferente a 2xx, entonces busco a ver si es 403, de ser así lo envío al login */
    if (error?.response?.data?.status === 403 && token) {
      // dispatch(logoutUserInformation())
      // dispatch(deleteCargaInicial())
      // dispatch(logoutUsuario())
      // AsyncStorage.clear()
    }
    // if (error?.response?.data?.status === 400 && response?.data?.errors) {
    //   Alert.alert(response?.data?.errors?.message[0], response?.data?.errors?.name[0]);
    // }
    // throw error
  })

  let componentToRender = null

  if (!token && !onboarding) {
    componentToRender = <AuthNavigator />
  }else if(token && onboarding){
    componentToRender = <TabNavigator />
  }else{
    componentToRender = <OnboardingNavigator />
  }

  // if (token && onboarding) {
  //   componentToRender = <TabNavigator />
  // } else if (token && !onboarding) {
  //   componentToRender = <OnboardingNavigator />
  // } else {
  //   componentToRender = <AuthNavigator />
  // }

  return (
    <PaperProvider theme={THEME}>
      <NavigationContainer>
        {componentToRender}
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