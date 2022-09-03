import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import Header from '../../components/Header'
import { Styles } from '../../constants/Styles'
import HeaderGrid from '../../components/HeaderGrid'
import List from '../../components/List'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addCategories } from '../../redux/slices/categoriesSlice'
import { getAll } from '../../api'
import { ActivityIndicator } from 'react-native-paper'

export default function Index() {

    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(true)
    const categories = useSelector(state => state?.categories) || []
    const navigator = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        (
            async () => {
                if (categories.length === 0) {
                    setSending(true)
                    try {
                        const response = await getAll('categorias')
                        const status = await response?.data?.status || null
                        const resp = await response.data?.data || null

                        if (status && status == 200) {

                            dispatch(addCategories(resp))
                            setSending(false)
                            setLoading(false)
                        } else {

                            setSending(false)
                            Alert.alert('Error', response.data.message)

                        }

                    } catch (error) {
                        setSending(false)
                    }
                }else{
                    setLoading(false)
                }
            }
        )()
    }, [])

    const goDetail = (item) => {
        navigator.navigate('CategoriesDetails', { item: { ...item }, update: true })
    }

    const goAdd = () => {
        navigator.navigate('CategoriesDetails', { update: false })
    }

    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <HeaderGrid title="Categorías" showButton={true} onPress={() => goAdd()} />
                {!loading ? <List title="Lista" data={categories} onClick={goDetail} /> : <ActivityIndicator />}
            </View>
        </View>
    )
}