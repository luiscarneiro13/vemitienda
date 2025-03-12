import React, { useState } from "react"
import { StyleSheet, View, Image } from "react-native"
import Header from "../../components/Header"
import { Styles } from "../../constants/Styles"
import { Text, Card, List, useTheme } from "react-native-paper"
import Atras from "../../components/Atras"
import HeaderGrid from "../../components/HeaderGrid"
import { ScrollView } from "react-native"
import DropList from "../../components/DropDown"
import { updateStatusThunk } from "../../redux/thunks/ordersThunk"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
// import { Card } from 'react-native-elements'

export default function OrderDetails(data) {

  const item = data?.route?.params?.item
  const theme = useTheme()
  const dispatch = useDispatch()
  const [status, setStatus] = useState(1)

  useEffect(() => {
    setStatus(item.status_id)
  }, [])


  const updateStatus = (value) => {

    const params = {
      order_id: item.id,
      status_id: value.id
    }

    dispatch(updateStatusThunk(params))
  }

  const RenderItem = (detail) => {

    return (
      <List.Item
        key={detail?.id}
        title={`Cant.: ${detail?.quantity}  Precio: $${detail.price}`}
        description={detail?.product?.name}
        titleStyle={{ color: theme.colors.primary }}
        descriptionStyle={{ color: theme.colors.primary }}
        left={props =>
          detail?.image ?
            <>
              {
                <Image mode='cover' source={{ uri: detail?.image }} style={{ width: 80, height: 80, zIndex: 3 }} />
              }
            </>
            :
            <Text></Text>
        }
        onPress={() => { }}
        style={{ backgroundColor: '#F3F3F3', marginTop: 5 }}
      />
    )
  }

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <Header />

      <View style={Styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Atras />
          <HeaderGrid title={`Detalles del pedido N° ${item.id}`} />
        </View>

        <Card style={{ backgroundColor:'#FFF' }}>
          <Card.Content>
            <Card.Title title="Datos del pedido" />
            <Text variant="titleLarge">{`Pedido ${item?.id}`}</Text>
            <Text variant="titleLarge">{`Cliente ${item?.name}`}</Text>
            <Text variant="titleLarge">{`Email ${item?.email}`}</Text>
            <Text variant="titleLarge">{`Teléfono ${item?.phone}`}</Text>
            <Text variant="titleLarge">{`Total a pagar $${item?.total}`}</Text>
            <View style={{ marginTop: 10 }}>
              <DropList
                label="Estado del pedido (Puede cambiarlo)"
                searchPlaceholder="Escriba aquí para buscar ..."
                labelField={"name"}
                data={[
                  { id: 1, name: 'Creado' },
                  { id: 2, name: 'En proceso' },
                  { id: 3, name: 'Finalizado' },
                ]}
                value={status}
                backgroundColor="#000"
                onChange={(value) => updateStatus(value)}
              />
            </View>
          </Card.Content>
        </Card>

        <ScrollView>
          {item.details.map(item => {
            return RenderItem(item)
          })}
        </ScrollView>
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
