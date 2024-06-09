import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';


const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/icon.png')} style={styles.logo} />
      <ThemedText type="title">BATTLESHIP</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center', 
    marginBottom: 50,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default Logo;

