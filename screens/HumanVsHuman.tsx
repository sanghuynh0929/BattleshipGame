// screens/HumanVsHumanScreen.tsx
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GameContext, GameContextProps } from '../context/GameContext';

type HumanVsHumanScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HumanVsHuman'>;

type Props = {
  navigation: HumanVsHumanScreenNavigationProp;
};

const HumanVsHuman: React.FC<Props> = ({ navigation }) => {
  const {
    hasFirstPlayerConfigured,
    hasSecondPlayerConfigured,
    setCurrentPlayer,
  } = useContext(GameContext) as GameContextProps;
  return ((hasSecondPlayerConfigured) ? 
    (<View style={[styles.container, styles.greenBackground]}>
      <Text style={styles.bannerText}>
          {"Who do you want to go first?"}
      </Text>
      <View style={styles.subcontainer}>
        <Button title="Player 1" onPress={() => {setCurrentPlayer('Player1'); navigation.navigate('Battle');}}/>
        <Button title="Player 2" onPress={() => {setCurrentPlayer('Player2'); navigation.navigate('Battle');} }/>
      </View> 
      </View>) : 
    (
    <View style={[styles.container, (hasFirstPlayerConfigured ? styles.redBackground : styles.blueBackground)]}>
      <Text style={styles.bannerText}>
        {hasFirstPlayerConfigured
          ? "Hand the device to your friend and don't look at it :-)"
          : ((hasSecondPlayerConfigured) ? "Who do you want to go first?" : "Hide the screen from your friend and don't let them see it!")
        }
      </Text>
      <Button title="Confirm" onPress={() => {navigation.navigate('ConfigureShips')} }/>
    </View>)
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueBackground: {
    backgroundColor: 'blue',
  },
  redBackground: {
    backgroundColor: 'red',
  },
  greenBackground: {
    backgroundColor: 'green',
  },
  bannerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 50,
  },
  subcontainer: {
    flexDirection: 'column',
    gap: 10,
  },
});

export default HumanVsHuman;
