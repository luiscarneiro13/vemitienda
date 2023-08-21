import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { View, Dimensions } from 'react-native'
import { Text } from 'react-native-paper'
import { FontAwesome5 as Icon } from '@expo/vector-icons'
import { TextInput } from 'react-native-paper'
import { useFormik } from "formik"
import * as Func from "./Functions2"
import * as Yup from "yup"
import { Styles } from "../../constants/Styles"
import Footer from './components/Footer'
import ViewPager from '@react-native-community/viewpager'
import { useNavigation } from '@react-navigation/native'
import { storeCompanyOnboardingThunk } from '../../redux/thunks'

const screenWidth = Dimensions.get('window').width

export default function Screen2(prop) {

  const params = prop.route.params || null;
  const image = params?.image
  const thumbnail = params?.thumbnail
  const theme_id = params?.theme_id

  const pagerRef = useRef(null)
  const navigator = useNavigation()
  const company = useSelector(state => state.company)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: Func.initialValues(company.company, image, thumbnail, theme_id),
    validationSchema: Yup.object(
      Func.validationSchema()
    ),
    onSubmit: (data) => {
      dispatch(storeCompanyOnboardingThunk(data, navigator))
    },
  })

  const previousButton = () => {
    navigator.navigate("Screen1")
  }

  return (
    <ViewPager style={{ flex: 1 }} ref={pagerRef}>
      <View key="1">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#053E66"
          }}
        >
          <Icon name='store' size={172} color="white" />
          <View style={{ marginTop: 16 }}>
            <View style={{ marginTop: 0, marginLeft: 15, paddingRight: 20, width: screenWidth * 0.8 }}>
              <TextInput
                mode='flat'
                label="Nombre de la tienda"
                value={formik.values.name}
                onChangeText={(text) => formik.setFieldValue('name', text)}
                style={{ width: '100%' }}
              />
              {formik.errors.name && <Text style={Styles.error}> {formik.errors.name}</Text>}

              <TextInput
                mode='flat'
                label="Slogan de la tienda"
                value={formik.values.slogan}
                onChangeText={(text) => formik.setFieldValue('slogan', text)}
                style={{ width: '100%', marginTop: 10 }}
              />
              {formik.errors.slogan && <Text style={Styles.error}> {formik.errors.slogan}</Text>}

              <TextInput
                mode='flat'
                label="Teléfono de la tienda"
                value={formik.values.phone}
                onChangeText={(text) => formik.setFieldValue('phone', text)}
                style={{ width: '100%', marginTop: 10 }}
              />
              {formik.errors.phone && <Text style={Styles.error}> {formik.errors.phone}</Text>}

            </View>
          </View>

        </View>
        <Footer
          loading={company.company.isLoading}
          disabledRight={(formik.values.name.length > 2 && formik.values.slogan.length > 2 && formik.values.phone.length > 2) ? false : true}
          backgroundColor="#146BA8"
          leftButtonLabel="< Atrás"
          rightButtonLabel="Finalizar"
          rightButtonPress={formik.handleSubmit}
          leftButtonPress={() => { previousButton() }}
        />
      </View>
    </ViewPager>
  )
}