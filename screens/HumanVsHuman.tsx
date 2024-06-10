// screens/HumanVsHumanScreen.tsx
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { GameContext, GameContextProps } from '../context/GameContext';
import { ThemedText } from '../components/ThemedText';
import IconCell from '../components/IconCell';

type HumanVsHumanScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HumanVsHuman'>;

type Props = {
  navigation: HumanVsHumanScreenNavigationProp;
};

const HumanVsHuman: React.FC<Props> = ({ navigation }) => {
  const {
    hasChosenShipSize,
    setHasChosenShipSize,
    hasFirstPlayerConfigured,
    hasSecondPlayerConfigured,
    setRedSize,
    setBlueSize,
    setGreenSize,
    setCyanSize,
    setYellowSize,
    setMagentaSize,
    setCurrentPlayer,
  } = useContext(GameContext) as GameContextProps;

  const [sizes, setSizes] = useState({
    red: 5,
    blue: 4,
    green: 3,
    cyan: 3,
    yellow: 2,
    magenta: 2,
  });

  const handleCellPress = (color: keyof typeof sizes, operation: 'plus' | 'minus') => {
    setSizes((prevSizes) => {
      const newSize = operation === 'plus' ? Math.min(6, prevSizes[color] + 1) : Math.max(1, prevSizes[color] - 1);
      return { ...prevSizes, [color]: newSize };
    });
  };

  const handleContinueFromShipSize = () => {
    setRedSize(sizes.red);
    setBlueSize(sizes.blue);
    setGreenSize(sizes.green);
    setCyanSize(sizes.cyan);
    setYellowSize(sizes.yellow);
    setMagentaSize(sizes.magenta);
    setHasChosenShipSize(true);
  };
  
  if (!hasChosenShipSize) {
    return (
      <View style={styles.container}>
        <ThemedText type='title' style={{ marginVertical: 30 }}>Choose your ship sizes:</ThemedText>
        <View style={styles.subcontainer}>
          {Object.entries(sizes).map(([color, size]) => (
            <View key={color} style={stylesShip.buttonHolder}>
              <IconCell color={color} icon='ship' onCellPress={null} />
              <IconCell
                color='gray'
                icon='minus'
                onCellPress={() => handleCellPress(color as keyof typeof sizes, 'minus')}
              />
              <ThemedText type='defaultSemiBold' style={stylesShip.counter}>
                {size}
              </ThemedText>
              <IconCell
                color='gray'
                icon='plus'
                onCellPress={() => handleCellPress(color as keyof typeof sizes, 'plus')}
              />
            </View>
          ))}
          <Button title="Continue" onPress={handleContinueFromShipSize} />
        </View>
      </View>
    );
  }
  return hasSecondPlayerConfigured ? (
    <View style={[styles.container, styles.greenBackground]}>
      <Text style={styles.bannerText}>Who do you want to go first?</Text>
      <View style={styles.subcontainer}>
        <Button title="Player 1" onPress={() => { setCurrentPlayer('Player1'); navigation.navigate('Battle'); }} />
        <Button title="Player 2" onPress={() => { setCurrentPlayer('Player2'); navigation.navigate('Battle'); }} />
      </View>
    </View>
  ) : (
    <View style={[styles.container, hasFirstPlayerConfigured ? styles.redBackground : styles.blueBackground]}>
      <Text style={styles.bannerText}>
        {hasFirstPlayerConfigured
          ? "Hand the device to your friend and don't look at it :-)"
          : "Hide the screen from your friend and don't let them see it!"
        }
      </Text>
      <Button title="Confirm" onPress={() => { navigation.navigate('ConfigureShips'); }} />
    </View>
  );
};

const stylesShip = StyleSheet.create({
  buttonHolder: {
    flexDirection: 'row',
    gap: 20,
    alignContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  counter: {
    fontSize: 20,
  },
});

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
