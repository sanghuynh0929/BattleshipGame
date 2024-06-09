import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { GameContext, GameContextProps } from '../context/GameContext';
import { ThemedText } from '../components/ThemedText';

const HandOver = ({ route, navigation }) => {
    // Extract the message from the route parameters
    const { message } = route.params;

    return (
        <View style={styles.container}>
            <ThemedText type="defaultSemiBold" style={styles.title}>{message}</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.title}>Hand over the device</ThemedText>
            <View style={styles.subcontainer}>
                <Button title="Continue" onPress={() => { navigation.pop() }} style={styles.primarybutton}/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'darkblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subcontainer: {
        flexDirection: 'column',
        gap: 10,
    },
    title : {
        fontSize: 24,
        marginBottom: 20,
        color: 'white',
    },
    primarybutton: {
        backgroundColor: "white",
        color: "#000",
    },
    secondarybutton: {
        backgroundColor: "black",
        color: "#fff",
    }
});

export default HandOver;