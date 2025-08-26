import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import NavigatorHome from "./Tabs/NavigatorHome";
import NavigatorCategories from "./Tabs/NavigatorCategories";
import NavigatorPremium from "./Tabs/NavigatorPremium";
import NavigatorStore from "./Tabs/NavigatorStore";
import NavigatorOrders from "./Tabs/NavigatorOrders";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";

MIcon.loadFont();

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const theme = useTheme();
  const textColorGlobal = theme.colors.primary;

  const Header = ({ icon, title, textColor }) => {
    return (
      <>
        <MIcon name={icon} size={30} color={textColor} />
        <Text style={{ color: textColor ? textColor : "#333", fontSize: 12 }}>
          {title}
        </Text>
      </>
    );
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          headerTransparent: true,
          tabBarStyle: {
            backgroundColor: "#F3F3F3",
            height: 110,
            marginBottom: -30,
          },
        }}
      >
        <Tab.Screen
          name="HomeNavigator"
          component={NavigatorHome}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <Header
                textColor={textColorGlobal}
                icon={"package-variant"}
                title="Productos"
              />
            ),
          }}
        />

        <Tab.Screen
          name="CategoriesNavigator"
          component={NavigatorCategories}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <Header
                textColor={textColorGlobal}
                icon={"shape"}
                title="Categorías"
              />
            ),
          }}
        />

        <Tab.Screen
          name="StoreNavigator"
          component={NavigatorStore}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <Header
                textColor={textColorGlobal}
                icon={"store"}
                title="Mi tienda"
              />
            ),
          }}
        />


      </Tab.Navigator>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F3F3F3",
          marginBottom: 5,
        }}
      >
        <Text style={{ color: "#04304f", fontSize: 10 }}>
          Sitio web: https://vemitienda.com.ve
        </Text>
      </View>
    </>
  );
}
