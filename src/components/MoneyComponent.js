import React from 'react'
import { TextInput } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'

export default function MoneyComponent({ label, onChange, value }) {

    return (
        <>
            <TextInput
                label={label}
                mode='outlined'
                value={value}
                maxLength={5}
                render={props =>
                    <TextInputMask
                        {...props}
                        type={'only-numbers'}
                        onChangeText={text => { onChange(text) }}
                    />
                }
            />
        </>
    )
}