import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function Footer({ label, onPress, disabled, loading }) {
  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center' }}
      onPress={onPress}
      disabled={disabled}
    >
      {
        loading ?
          <ActivityIndicator size="small" color="white" />
          :
          <Text style={[{ fontSize: 22, fontWeight: 'bold' }, disabled ? { color: 'gray' } : { color: 'white' }]}>
            {label}
          </Text>
      }
    </TouchableOpacity>
  )
}