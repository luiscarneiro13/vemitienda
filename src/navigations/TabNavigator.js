import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, StyleSheet, Text } from 'react-native'
import NavigatorHome from './Tabs/NavigatorHome'
import NavigatorAdd from './Tabs/NavigatorAdd'
import NavigatorCategories from './Tabs/NavigatorCategories'
import NavigatorShare from './Tabs/NavigatorShare'
import NavigatorStore from './Tabs/NavigatorStore'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'

MIcon.loadFont()

const Tab = createBottomTabNavigator()

export default function TabNavigator() {

    const textColorGlobal = '#FFFFFF'

    const Header = ({ icon, title, textColor }) => {
        return (
            <>
                <MIcon name={icon} size={30} color={textColor} />
                <Text style={{ color: textColor ? textColor : '#333', fontSize: 12 }}>{title}</Text>
            </>
        )
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                headerTransparent: true,
                tabBarStyle: {
                    backgroundColor: "#0c77c3",
                    height: 70,
                    marginBottom: -10
                }
            }}
        >
            {/* <Tab.Screen
                name="HomeNavigator"
                component={NavigatorHome}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => <Header textColor={textColorGlobal} icon={'package-variant'} title='Productos' />
                }}
            /> */}

            <Tab.Screen
                name="CategoriesNavigator"
                component={NavigatorCategories}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => <Header textColor={textColorGlobal} icon={'shape'} title='Categorías' />
                }}
            />

            {/* <Tab.Screen
                name="ShareNavigator"
                component={NavigatorShare}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => <Header textColor={textColorGlobal} icon={'share-variant'} title='Compartir' />
                }}
            />

            <Tab.Screen
                name="StoreNavigator"
                component={NavigatorStore}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => <Header textColor={textColorGlobal} icon={'store'} title='Tienda' />
                }}
            /> */}

        </Tab.Navigator >
    )
}