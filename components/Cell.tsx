import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Cell = ({ row, col, color, onPress, icon=null }) => {
  const handlePress = () => {
    onPress(row, col);
  };
  if (icon) {
    return (
      <TouchableOpacity style={[styles.cell, { backgroundColor: color }]} onPress={handlePress}>
        <FontAwesome5 name={icon} size={24} color="black" />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={[styles.cell, { backgroundColor: color }]} onPress={handlePress}>
        {/* <Text>{`${row}-${col}`}</Text> */}
      </TouchableOpacity>
    );
  }
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

export default Cell;
