import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../api'
import { addCategories } from '../redux/slices/categoriesSlice'
import { addToken } from '../redux/slices/tokenSlice'
import { addUserInformation } from '../redux/slices/userInformationSlice'

export default function Loading() {

    const dispatch = useDispatch()
    const token = useSelector(state => state.token) || ''

    useEffect(() => {
        (
            async () => {

                if (token.length === 0) {
                    const findToken = await AsyncStorage.getItem('@token')
                    if (findToken) {
                        /** Se coloca el token en la cabecera de una vez, porque redux tarda en hacerlo */
                        axios.defaults.headers.common['Authorization'] = `Bearer ${findToken}`
                        dispatch(addToken(findToken))

                        const response2 = await getAll('user-information')
                        const status2 = await response2?.data.status

                        if (status2 && status2 == 200) {
                            const userInformation = await response2.data?.data
                            dispatch(addUserInformation(userInformation))
                        }

                        const response3 = await getAll('categorias')
                        const resp3 = await response3?.data?.data || []
                        dispatch(addCategories(resp3))
                    } else {
                        await AsyncStorage.setItem('@token', '')
                    }
                }
            }
        )()

    }, [])


    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../images/icon.png')} />
            <Animatable.Text animation="bounceInLeft" duration={5000} style={styles.text}>¡Crea, personaliza y Comparte!</Animatable.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c77c3'
    },
    image: {
        width: '85%',
        resizeMode: 'contain',
        marginTop: -380
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginTop: -350
    }
})
