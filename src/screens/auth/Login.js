import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity, Button as BTN } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Card, useTheme } from 'react-native-paper'
import SvgComponent from './Svg'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loginExternal, version, logs } from '../../redux/thunks'
import { deleteToken, loadingToken } from '../../redux/slices'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import ButtonSocial from '../../components/ButtonSocial'
import { VERSION } from '../../constants/Data'

export default function Login() {

    WebBrowser.maybeCompleteAuthSession()

    const [actualizar, setActualizar] = useState(false)
    const [sending, setSending] = useState(false)
    const [showPass, setShowPass] = useState(true)
    const theme = useTheme()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.token.isLoading)

    // INICIO DE SESIÓN CON GOOGLE

    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "895842208250-ju0l1c9msodak02iqj7m1lluo9gt4cfs.apps.googleusercontent.com",
        expoClientId: "895842208250-avq22gq2ugrgillani7c4485grehl5f4.apps.googleusercontent.com",
    });

    useEffect(() => {
        if (response?.type === "success") {
            getUserInfo(response.authentication.accessToken)
        }
    }, [response])

    const getUserInfo = async (token) => {
        dispatch(loadingToken(true))
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const user = await response.json();

            setUserInfo(user);

            const params = {
                provider: 'google',
                access_token: token,
                name: user.name,
                email: user.email
            }

            // dispatch(logs({ user, params }))
            dispatch(loginExternal(params))

        } catch (error) {
            setUserInfo(null);
            // Add your own error handler here
        }
    }


    // FIN INICIO DE SESIÓN CON GOOGLE



    useEffect(() => {
        dispatch(deleteToken())
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        return () => { source.cancel() }
    }, [])

    useEffect(() => {
        const controller = new AbortController()

        return () => { controller.abort() }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const vers = await dispatch(version({ version: VERSION }))
            setActualizar(vers)
        }

        fetchData()
    }, [])

    return (

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SvgComponent />
            <View>
                {/* <Text>{ JSON.stringify(userInfo) }</Text> */}
                {/* <Image
                    source={require('../../assets/init.jpg')} style={{ width: 400, height: 300, marginTop: -310 }}
                /> */}
            </View>
            {!isLoading &&
                <Card style={{ width: '90%', marginTop: 20, borderRadius: 10 }}>
                    <Card.Content>

                        <View style={{ marginTop: 0, flexDirection: 'row', justifyContent: 'space-around' }}>

                            {actualizar ?
                                <Text>
                                    Hay una actualización disponible, por favor descárguela
                                </Text>
                                :
                                <ButtonSocial provider="google" onClick={() => promptAsync()} />}

                        </View>
                    </Card.Content>
                </Card>
            }

            {isLoading &&
                <ActivityIndicator />
            }

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                <Image source={require('../../images/icon.png')} style={{ width: 170, height: 130, marginTop: -400 }} />
                <Text style={{ color: theme.colors.primary, marginTop: -16 }}>Venezuela. Versión {VERSION}</Text>
            </View>

        </View>
    )
}