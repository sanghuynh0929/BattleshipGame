import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const PowerupButton = ({ handlePress, icon=null }) => {
  // make unclickable if not enabled
  return (
    <TouchableOpacity style={[styles.cell]} onPress={handlePress} >
      <FontAwesome5 name={icon} size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    margin: 1,
    borderRadius: 5,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PowerupButton;
