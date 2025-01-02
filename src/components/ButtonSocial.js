import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { Styles } from '../constants/Styles'
import { Avatar } from 'react-native-elements'
import { useSelector } from 'react-redux'

export default function ButtonSocial({ provider, onClick }) {

    const startLoadingToken = useSelector(state => state.token.isLoading)

    const Google = () => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { onClick() }} disabled={startLoadingToken}>
                    <Avatar
                        size={48}
                        rounded
                        icon={{ name: "google", type: "font-awesome" }}
                        containerStyle={Styles.buttonGoogle}
                    />
                </TouchableOpacity>
                <Text>Ingresar con Google</Text>
            </View>
        )
    }

    const SwitchSocialButton = () => {
        switch (provider) {
            case 'google':
                return Google()
                break;

            default:
                break;
        }
    }

    return (
        <>
            {SwitchSocialButton()}
        </>
    )
}