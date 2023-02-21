import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import { Styles } from "../../constants/Styles";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Card, Text, useTheme } from "react-native-paper";
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

export default function Index() {
  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <Header />

      <View style={Styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Atras />
          <HeaderGrid title={"Información"} />
        </View>

        <Card>
          <Card.Title title="Contacto" />
          <Card.Content>
            <Text variant="titleLarge">Sitio web: https://vemitienda.online</Text>
            <Text variant="titleLarge">Email: info@vemitienda.online</Text>
            <Text variant="titleLarge">Teléfono: 0424 849 68 99</Text>
          </Card.Content>
        </Card>

        <Card>
          <Card.Title title="Plan Premium (10$ anuales)" />
          <Card.Content>
            <Text variant="titleLarge">
              El costo del plan premium es de 10$ por 12 meses y podrás tener
              todos los productos que sean necesarios en tu catálogo y podrás
              compartir el catálogo de forma ilimitada. Contáctanos para adquirir el plan premium
            </Text>
          </Card.Content>
        </Card>
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
