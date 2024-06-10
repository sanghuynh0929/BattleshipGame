import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import HumanVsHuman from '../screens/HumanVsHuman';
import HumanVsComputer from '../screens/HumanVsComputer';
import Rules from '../screens/Rules';
import Settings from '../screens/SettingScreen';
import ConfigureShips from '../screens/ConfigureShipsScreen';
import Battle from '../screens/BattleScreen';
import GameOver from '../screens/GameOverScreen';
import HandOver from '../screens/HandOverScreen';

export type RootStackParamList = {
  Home: undefined;
  HumanVsHuman: undefined;
  HumanVsComputer: undefined;
  ConfigureShips: undefined;
  Battle: undefined;
  Rules: undefined;
  Settings: undefined;
  GameOver: undefined;
  HandOver: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, animation: "fade"}} />
      <Stack.Screen name="HumanVsHuman" component={HumanVsHuman} options={{headerShown: false, animation: "fade"}} />
      <Stack.Screen name="HumanVsComputer" component={HumanVsComputer} options={{headerShown: false, animation: "fade"}} />
      <Stack.Screen name="ConfigureShips" component={ConfigureShips} options={{headerShown: false, animation: "fade"}}/>
      <Stack.Screen name="Battle" component={Battle} options={{headerShown: false, animation: "fade"}}/>
      <Stack.Screen name="Rules" component={Rules} options={{headerShown: false, animation: "fade"}} />
      <Stack.Screen name="Settings" component={Settings} options={{headerShown: false, animation: "slide_from_bottom"}} />
      <Stack.Screen name="GameOver" component={GameOver} options={{headerShown: false, animation: "fade"}} />
      <Stack.Screen name="HandOver" component={HandOver} options={{headerShown: false, animation: "fade"}} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
