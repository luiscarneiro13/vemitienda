import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import Header from '../../components/Header'
import Search from '../../components/Search'
import CardCustom from '../../components/CardCustom'
import ScrollHorizontal from '../../components/ScrollHorizontal'
import { Styles } from '../../constants/Styles'
import { useSelector, useDispatch } from 'react-redux'
import { addCategories } from '../../redux/slices/categoriesSlice'
import { useNavigation } from '@react-navigation/native'


export default function Index() {

    const [query, setQuery] = useState('')

    const categories = useSelector(state => state.categories) || []
    const userInfo = useSelector(state => state) || []
    const products = useSelector(state => state?.userInformation?.products) || []

    const onClickCardCustom = () => {
        console.log("")
    }
    return (
        <View style={{ backgroundColor: "#FFF", flex: 1 }}>
            <Header />
            <View style={Styles.container}>
                <Search query={query} onChange={(item) => console.log("")} />
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <ScrollHorizontal categories={categories} filterCategory={(item) => console.log("")} />
                </View>
                <CardCustom data={products} onClick={onClickCardCustom} />
            </View>
        </View>
    )
}