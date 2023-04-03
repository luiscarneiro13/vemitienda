import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
} from "react-native";
import Header from "../../components/Header";
import { Styles } from "../../constants/Styles";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, useTheme } from "react-native-paper";
import {
  getCategoriesThunk,
  getCompanyThunk,
  getProducts,
  getTemplatesThunk,
} from "../../redux/thunks";
import { productsFilters } from "../../redux/slices";
import DropList from "../../components/DropDown";
import Atras from "../../components/Atras";
import HeaderGrid from "../../components/HeaderGrid";
import { Share } from "react-native";
import { URL_BASE } from "../../constants/Data";

export default function Index() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState(0);
  const theme = useTheme();
  const navigator = useNavigation();
  const company = useSelector((state) => state.company.company) || [];
  const categoriesStore = useSelector((state) => state.categories.categories) || [];
  let categories = [{ id: 0, name: "Todos los productos" }];
  const productsStore = useSelector((state) => state?.products.products) || [];
  const planId = useSelector((state) => state?.token.plan_id) || [];
  const dispatch = useDispatch();
  const [catSelected, setCatSelected] = useState(0);
  const [shopSelected, setShopSelected] = useState((company.is_shop === 1) ? 2 : 1);

  categoriesStore.map((item) => {
    categories.push({ id: item.id, name: item.name });
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCompanyThunk());
    dispatch(getCategoriesThunk());
    dispatch(getTemplatesThunk());
  }, []);

  useFocusEffect(() => {
    changeSearch(query);
  });

  const onClickCardCustom = (item) => {
    navigator.navigate("HomeDetails", { item: { ...item }, update: true });
  };

  const goAdd = () => {
    navigator.navigate("HomeDetails", { update: false });
  };

  const changeSearch = (query) => {
    setQuery(query);

    if (query.length) {
      const filtrado = productsStore.filter((item) => {
        if (
          item?.name?.includes(query) ||
          item?.category?.name?.includes(query) ||
          item?.description?.includes(query)
        ) {
          return item;
        }
      });

      dispatch(productsFilters(filtrado));
    } else {
      dispatch(productsFilters(productsStore));
    }
  };

  const filterCategory = (query) => {
    changeSearch(query);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const clickHandlerShare = async () => {
    if (planId > 1) {
      if (!company?.url_tienda) {
        navigator.navigate("Store")
        Alert.alert(
          "Mensaje",
          "Debe agregar la información de su tienda para poder compartir el catálogo"
        );
      } else {
        let base = ''
        switch (shopSelected) {
          case 1:
            base = company.url_tienda
            break;
          case 2:
            base = URL_BASE + company.slug
            break;
        }

        const message = `${base}?cat=${cat}`
        navigator.navigate("Home");
        await Share.share({ message });

      }
    } else {
      Alert.alert(
        "Mensaje",
        "Debe activar el plan premium para compartir su Catálogo"
      );
    }
  };

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <Header />

      <View style={Styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Atras />
          <HeaderGrid title={"Compartir"} />
        </View>
        <DropList
          label="Tipo"
          placeholder="Que va a compartir?"
          searchPlaceholder="Escriba aquí para buscar ..."
          labelField={"name"}
          data={company.is_shop === 1 ? [
            { id: 1, name: 'Catálogo' },
            { id: 2, name: 'Tienda Online' },
          ] : [
            { id: 1, name: 'Catálogo' },
          ]}
          value={shopSelected}
          backgroundColor="#000"
          onChange={(value) => setShopSelected(value.id)}
        />

        <DropList
          label="Categoría"
          placeholder="Seleccione una categoría"
          searchPlaceholder="Escriba aquí para buscar ..."
          labelField={"name"}
          data={categories}
          value={catSelected}
          backgroundColor="#000"
          onChange={(value) => setCatSelected(value.id)}
        />

        <View style={{ marginTop: 50 }}>
          <Button
            icon="share"
            mode="contained"
            uppercase={false}
            loading={categories.isLoading}
            disabled={categories.isLoading}
            style={Styles.buttonPlus}
            onPress={clickHandlerShare}
          >
            Compartir
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPlus: {
    borderRadius: 10,
    height: 40,
    borderColor: "#053e66",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
