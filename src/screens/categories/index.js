import React, { useEffect, useState } from 'react'
import { View, Text, Alert } from 'react-native'
import Header from '../../components/Header'
import { Styles } from '../../constants/Styles'
import HeaderGrid from '../../components/HeaderGrid'
import List from '../../components/List'
import { conectar, selectDB } from '../../constants/DataBase'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { addCategories } from '../../redux/slices/categoriesSlice'

const db = conectar()

export default function Index() {

    const categories = useSelector(state => state?.categories) || []
    const navigator = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!categories.length) {
            selectDB(`Select * from categories where;`, [], (rows) => {
                dispatch(addCategories(rows))
            })
        }
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
                <List title="Lista" data={categories} onClick={goDetail} />
            </View>
        </View>
    )
}