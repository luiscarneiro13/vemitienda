import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import { Styles } from "../../constants/Styles";
import HeaderGrid from "../../components/HeaderGrid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Button, List, useTheme } from "react-native-paper";
import { FlatList } from "react-native";
import { Badge } from 'react-native-elements'
import { getOrdersThunk } from "../../redux/thunks/ordersThunk";


export default function Orders() {

  const orders = useSelector(state => state.orders.orders) || []
  const theme = useTheme()
  const navigator = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrdersThunk())
  }, [])

  const goDetails = (item) => {
    navigator.navigate('OrderDetails', { item })
  }

  const renderItem = ({ item }) => {
    let color = ''
    switch (item.status_id) {
      case 1:
        color = 'error'
        break;
      case 2:
        color = 'warning'
        break;
      case 3:
        color = 'success'
        break;
    }


    return (
      <List.Item
        key={`list${item.id}`}
        title={`Pedido N° ${item.id}. Total: $${item.total}`}
        description={`Cliente: ${item.name}. Tlf.: ${item.phone} \nCorreo: ${item.email}`}
        titleStyle={{ color: theme.colors.primary }}
        descriptionStyle={{ color: theme.colors.primary }}
        onPress={() => goDetails(item)}
        style={{ backgroundColor: '#F3F3F3', marginTop: 5 }}
        right={props => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Badge value={item?.status?.name} status={color} />
            <Button icon="magnify" mode="text" color={theme.colors.primary}></Button>
          </View>
        )}
      />
    )
  }

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <Header />

      <View style={Styles.container}>
        <View style={{ flexDirection: "row" }}>
          <HeaderGrid title={"Pedidos"} />
        </View>

        <FlatList
          // style={style || null}
          data={orders}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

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
