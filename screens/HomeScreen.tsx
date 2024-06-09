import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import Button from '../components/Button';
import { GameContext,GameContextProps } from '../context/GameContext';

const HomeScreen = ({ navigation }) => {
  const {
    setIsPVP,
    resetGame,
  } = useContext(GameContext) as GameContextProps;
  return (
    <View style={styles.container}>
        <Logo />
        <View  style={styles.subcontainer}>
            <Button title="Human vs Human" onPress={() => { resetGame(); setIsPVP(true); navigation.navigate('HumanVsHuman')}} style={styles.primarybutton} />
            {/* <Button title="Human vs Computer" onPress={() => { resetGame(); setIsPVP(false); navigation.navigate('HumanVsComputer');}} style={styles.primarybutton}/> */}
            <Button title="Rules" onPress={() => navigation.navigate('Rules')}  style={styles.secondarybutton}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  subcontainer: {
    flexDirection: 'column',
    gap: 10,
  },
  primarybutton: {
    backgroundColor: "black",
  },
  secondarybutton: {
    backgroundColor: "darkblue",
  },
});

export default HomeScreen;
