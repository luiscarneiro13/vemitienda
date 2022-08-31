import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, StyleSheet, Text } from 'react-native'
import NavigatorHome from './Tabs/NavigatorHome'
import NavigatorAdd from './Tabs/NavigatorAdd'
import NavigatorCategories from './Tabs/NavigatorCategories'
import NavigatorShare from './Tabs/NavigatorShare'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {

    const Header = ({ icon, title }) => {
        return (
            <>
                <Image
                    source={icon}
                    style={styles.icono}
                />
                <Text style={{ color: '#333' }}>{title}</Text>
            </>
        )
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 55,
                    justifyContent: "center",
                    paddingVertical: -25,
                    backgroundColor: "#eff4f0",
                }
            }}
        >
            <Tab.Screen
                name="HomeNavigator"
                component={NavigatorHome}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => <Header icon={require('../images/misplantitas.png')} title='Plantitas' />
                }}
            />

            <Tab.Screen
                name="AddNavigator"
                component={NavigatorAdd}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => <Header icon={require('../images/plantas.png')} title='Agregar' />
                }}
            />

            <Tab.Screen
                name="CategoriesNavigator"
                component={NavigatorCategories}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => <Header icon={require('../images/categories.png')} title='Categorías' />
                }}
            />

            <Tab.Screen
                name="ShareNavigator"
                component={NavigatorShare}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => <Header style={{ height: 10, width: 10 }} icon={require('../images/share.png')} title='Compartir' />
                }}
            />
        </Tab.Navigator >
    );
};

const styles = StyleSheet.create({
    icono: { height: 40, width: 40 }
})