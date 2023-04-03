import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';

export const DropList = (items) => {

    const { value, labelField, valueField, label, placeholder, searchPlaceholder, iconName, data, onChange, color } = items

    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <View>
                    <Text style={[styles.labelFondo, { color: 'white' }]}>
                        {label}
                    </Text>
                    <Text style={[styles.label, isFocus && { color: '#0c77c3' }]}>
                        {label}
                    </Text>
                </View>
            );
        }
        return null;
    }

    return (
        <View style={styles.container}>
            {renderLabel()}
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#0c77c3', borderWidth: 2 }]}
                placeholderStyle={iconName ? styles.placeholderStyle : { ...styles.placeholderStyle, marginLeft: 4 }}
                selectedTextStyle={iconName ? styles.selectedTextStyle : null}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField={labelField ? labelField : 'nombre'}
                itemTextStyle={{ color: color ? color : '#000' }}
                valueField={valueField ? valueField : 'id'}
                placeholder={!isFocus ? `${placeholder}` : '...'}
                searchPlaceholder={searchPlaceholder}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => { onChange(item) }}
                renderLeftIcon={() => iconName ? <TextInput.Icon name={iconName} /> : null}
                backgroundColor={'rgba(52, 52, 52, 0.8)'}
            />

        </View>
    )
}


module.exports = DropList

const styles = StyleSheet.create({
    container: {
        marginTop: 6,
        zIndex: -2,
        elevation: -2
    },
    dropdown: {
        height: 55,
        border: 5,
        borderColor: '#818080',
        borderWidth: 1,
        borderRadius: 1,
        paddingHorizontal: 8,
        backgroundColor: '#FFF'
    },
    icon: {
        marginRight: 25,
    },
    labelFondo: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 5,
        top: -5,
        zIndex: 1,
        elevation: 1,
        paddingHorizontal: 4,
        fontSize: 12,
        color: '#818080',
        marginLeft: 5,
        height: 10
    },
    label: {
        position: 'absolute',
        backgroundColor: 'transparent',
        left: 5,
        top: -8,
        zIndex: 999,
        elevation: 999,
        paddingHorizontal: 4,
        fontSize: 12,
        color: '#818080',
        marginLeft: 5
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#818080',
        marginLeft: 35,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 35
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})