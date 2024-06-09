import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 


const IconCell = ({ color, icon, onCellPress, onCellLongPress }) => {
  return (
    <TouchableOpacity onPress={onCellPress} onLongPress={onCellLongPress} style={[styles.cell, { backgroundColor: color }]} >
        <FontAwesome5 name={icon} size={20} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    margin: 1,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconCell;
