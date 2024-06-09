import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'; 
import { ThemedText } from '../components/ThemedText';

const Rules = ({navigation}) => {
  return (
    <View>
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>BATTLESHIP</ThemedText>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name="home" size={24} color="black" />
          </TouchableOpacity>
      </View>
      <ScrollView style={{backgroundColor: "#fff"}}>
        <ThemedText style={styles.title}>Rules of the Game</ThemedText>
        <ThemedText style={styles.subtitle}>Objective</ThemedText>
        <ThemedText style={styles.body}>The objective of the game is to sink all of your opponent's ships before they sink yours.</ThemedText>
        <ThemedText style={styles.subtitle}>Gameplay</ThemedText>
        <ThemedText style={styles.body}>The game is played on a 10x10 grid. Each player has 5 ships: a Carrier (5 spaces), a Battleship (4 spaces), a Cruiser (3 spaces), a Submarine (3 spaces), and a Destroyer (2 spaces).</ThemedText>
        <ThemedText style={styles.body}>Players take turns calling out coordinates on the grid. If a player's call hits a ship, the opponent must say "hit". If a player's call misses, the opponent must say "miss".</ThemedText>
        <ThemedText style={styles.subtitle}>Winning</ThemedText>
        <ThemedText style={styles.body}>The game is won by the player who sinks all of their opponent's ships first.</ThemedText>
      </ScrollView>
    </SafeAreaView>
    </View>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff', 
  },
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    margin: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  body: {
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});


export default Rules;