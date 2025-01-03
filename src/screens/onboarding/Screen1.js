import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import { Styles } from "../../constants/Styles";
import Footer from './components/Footer';
import { useFormik } from "formik"
import * as Func from "./Functions1"
import * as Yup from "yup"
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator"
import DropList from '../../components/DropDown'
import { getCompanyThunk, getTemplatesThunk, getThemesThunk, userInfoThunk } from '../../redux/thunks';

export default function Screen1() {

  const pagerRef = useRef(null);
  const navigator = useNavigation()

  const [foto, setFoto] = useState(null)
  const [labelFoto, setLabelFoto] = useState("Tomar Foto");
  const [labelLibrary, setLabelLibrary] = useState("Galería");
  const [imagenCargada, setImagenCargada] = useState(false)
  const dispatch = useDispatch()
  const themes = useSelector(state => state.themes.themes)
  const company = useSelector(state => state.company)
  const [themeLocal, setThemeLocal] = useState(company?.company?.theme ? company.company.theme.hexadecimal : '#ffffff')

  useEffect(() => {
    dispatch(userInfoThunk())
    dispatch(getCompanyThunk())
    dispatch(getThemesThunk())
    dispatch(getTemplatesThunk())
  }, [])

  const formik = useFormik({
    initialValues: Func.initialValues(company.company),
    validationSchema: Yup.object(
      Func.validationSchema({ imagenCargada, foto })
    ),
    onSubmit: (data) => {
      const datos = { image: data.image, thumbnail: data.image, theme_id: data.theme_id }
      navigator.navigate("Screen2", datos)
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri
      const imgReducida = await convertImage(uri, 700, 700);
      mountFormik("image", imgReducida)
      const thumbnail = await convertImage(uri, 250, 250);
      setFoto(thumbnail);
      setImagenCargada(true);
      mountFormik("thumbnail", thumbnail)
    }
  }

  const mountFormik = (control, uri) => {
    formik
      .setFieldValue(control, { uri: uri, name: "imageNombre.png", type: "image/png" })
      .then(() => {
        return false
      })
    return true
  }

  const convertImage = async (uri, width, height) => {
    const image = await manipulateAsync(uri, [{ resize: { width, height } }], { compress: 1, format: SaveFormat.PNG })
    return image.uri
  }

  const pickImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri
      const imgReducida = await convertImage(uri, 700, 700);
      mountFormik("image", imgReducida)
      const thumbnail = await convertImage(uri, 250, 250);
      setFoto(thumbnail);
      setImagenCargada(true);
      mountFormik("thumbnail", thumbnail)
    }
  }

  return (
    <PagerView style={{ flex: 1 }} ref={pagerRef}>
      <View key="1">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "#053E66"
          }}
        >
          {foto ?
            <Image mode='cover' source={{ uri: foto }} style={{ width: 120, height: 120 }} />
            :
            <Icon name="image" size={172} color="white" />
          }

          <View>
            <View style={{ marginBottom: 10, marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', opacity: 0.8 }}>
                Cargue su logo:
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginRight: 15, }}>
              <Button onPress={pickImage} mode='outlined' icon={'camera'} style={{ backgroundColor: 'white', marginLeft: 15 }}>
                {labelFoto}
              </Button>
              <Button onPress={pickImageLibrary} mode='outlined' icon={'image'} style={{ backgroundColor: 'white', marginLeft: 15 }}>
                {labelLibrary}
              </Button>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              {formik.errors.image && <Text style={Styles.error}> {formik.errors.image}</Text>}
            </View>
          </View>

          <View style={{ marginTop: 60 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', opacity: 0.8 }}>
                Seleccione un tema:
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ backgroundColor: themeLocal, width: 30, height: 30 }}></View>
              <View style={{ width: '80%' }}>
                <DropList
                  label="Tema para la tienda"
                  placeholder="Color de la tienda"
                  searchPlaceholder="Escriba aquí para buscar ..."
                  labelField={"spanish"}
                  data={themes}
                  value={formik.values.theme_id || ""}
                  backgroundColor="#000"
                  onChange={(value) => {
                    setThemeLocal(value.hexadecimal)
                    formik.setFieldValue("theme_id", value.id)
                  }}
                />
                {formik.errors.theme_id && <Text style={Styles.error}> {formik.errors.theme_id}</Text>}
              </View>
            </View>
          </View>
        </View>
        <Footer
          disabledRight={(Object.keys(formik.values.image).length === 0 && !(formik.values.theme_id > 0)) ? true : false}
          backgroundColor="#146BA8"
          rightButtonLabel="Siguiente >"
          rightButtonPress={formik.handleSubmit}
        />
      </View>
    </PagerView>
  )
}