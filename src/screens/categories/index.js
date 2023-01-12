import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import Header from '../../components/Header'
import { Styles } from '../../constants/Styles'
import HeaderGrid from '../../components/HeaderGrid'
import List from '../../components/List'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native-paper'
import { getCategoriesThunk } from '../../redux/thunks'

export default function Index() {

    const state = useSelector(state => state?.categories) || []
    const navigator = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategoriesThunk())
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
                {!state.isLoading ? <List title="Lista" data={state.categories} onClick={goDetail} /> : <ActivityIndicator />}
            </View>
        </View>
    )
}