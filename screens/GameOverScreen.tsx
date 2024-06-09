import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { GameContext, GameContextProps } from '../context/GameContext';
import { ThemedText } from '../components/ThemedText';

const GameOver = ({navigation}) => {
    const {
        currentPlayer,
        resetGame,
        isPVP,
    } = useContext(GameContext) as GameContextProps;
    return (
        <View style={styles.container}>
            <ThemedText type="defaultSemiBold" style={styles.title}>GAME OVER</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.title}>{currentPlayer} wins!</ThemedText>
            <View  style={styles.subcontainer}>
                <Button title="Restart" onPress={() => {resetGame(); (isPVP) ? navigation.navigate('HumanVsHuman') : navigation.navigate('HumanVsComputer'); }} style={styles.primarybutton}/>
                <Button title="Menu" onPress={() => {resetGame(); navigation.navigate('Home'); }} style={styles.secondarybutton}/>
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

export default GameOver;