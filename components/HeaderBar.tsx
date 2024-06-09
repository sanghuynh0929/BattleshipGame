import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { ThemedText } from './ThemedText';

export default function HeaderBar({ showBackButton, showSettingsButton, onSettingsPress }) {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
      <ThemedText style={styles.title}>BATTLESHIP</ThemedText>
      {showSettingsButton && (
        <TouchableOpacity onPress={onSettingsPress}>
          <MaterialIcons name="settings" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  </SafeAreaView>
  );
}

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
  },
});
