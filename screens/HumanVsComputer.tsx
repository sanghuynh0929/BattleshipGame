import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GameContext, GameContextProps } from '../context/GameContext';
import Button from '../components/Button';

type HumanVsComputerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HumanVsComputer'>;

type Props = {
  navigation: HumanVsComputerScreenNavigationProp;
};

const HumanVsComputer = ({ navigation }) => {
  const {
    hasFirstPlayerConfigured,
  } = useContext(GameContext) as GameContextProps;
  return (
    <View style={[styles.container, hasFirstPlayerConfigured ? styles.redBackground : styles.blueBackground]}>
      <Text style={styles.bannerText}>
        Configure your ships and get ready to battle the computer!
      </Text>
      <Button title="Confirm" onPress={() => navigation.navigate('ConfigureShips')} />
    </View>
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
  bannerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 50,
    paddingHorizontal: 50,
  },
});

export default HumanVsComputer;