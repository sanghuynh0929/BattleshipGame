import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { GameContext, GameContextProps } from '../context/GameContext';

const Settings = ({navigation}) => {
    const {
        resetGame,
        isPVP,
    } = useContext(GameContext) as GameContextProps;
    return (
        <View style={styles.container}>
            <View  style={styles.subcontainer}>
                <Button title="Resume" onPress={() => navigation.goBack()} style={styles.primarybutton}/>
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
    primarybutton: {
        backgroundColor: "white",
        color: "#000",
    },
    secondarybutton: {
        backgroundColor: "black",
        color: "#fff",
    }
});

export default Settings;