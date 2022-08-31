import React, { useState } from 'react';
import { Switch } from 'react-native-paper';

export default function SwitchComponent({ value = 0, onChange }) {

    const [isSwitchOn, setIsSwitchOn] = useState(value === 1 ? true : false)

    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
        if (!isSwitchOn) {
            value = 1
        } else {
            value = 0
        }
        onChange(value)
    }

    return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
}