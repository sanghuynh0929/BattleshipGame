// screens/BattleScreen.js
import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import MiniBoard from '../components/MiniBoard';
import { GameContext, GameContextProps } from '../context/GameContext';
import BattleBoard from '../components/BattleBoard';
import PowerupButton from '../components/PowerupButton';

const Battle = ({navigation}) => {
  const {
    currentPlayer,
    setCurrentPlayer,
    boardState1,
    boardState2,
    battleState1,
    setBattleState1,
    battleState2,
    setBattleState2,
  } = useContext(GameContext) as GameContextProps;

  const endGame = (boardState, battleState) => {
    // count number of cells that are both hit and have a ship using map filter reduce
    const totalHits = boardState.map((boardRow, rowIndex) =>
      boardRow.filter((cell, colIndex) =>
        cell !== null && battleState[rowIndex][colIndex] !== null
      ).length).reduce((acc, hits) => acc + hits, 0);
    return totalHits === 19;
  }

  const handleCellPress = (row, col) => {
    if (currentPlayer === 'Player1') {
      // change the cell [row][col] in battleState2 to 'hit'
      const newBoard = battleState2.map((boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) =>
          cell
        )
      );
      newBoard[row][col] = 'hit';
      setBattleState2(newBoard);
      if (boardState2[row][col] === null) {
        navigation.push('HandOver', { message: 'Player1 missed!' });
      } else {
        if (endGame(boardState2, newBoard)) {
          navigation.push('GameOver');
        } else {
          navigation.push('HandOver', { message: 'Player1 hit!' });
        }
      }
    } else {
      // change the cell [row][col] in battleState2 to 'hit'
      const newBoard = battleState1.map((boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) =>
          cell
        )
      );
      newBoard[row][col] = 'hit';
      setBattleState1(newBoard);
      if (boardState1[row][col] === null) {
        navigation.push('HandOver', { message: 'Player2 miss' });

      } else {
        if (endGame(boardState1, newBoard)) {
          navigation.push('GameOver');
        } else {
          navigation.push('HandOver', { message: 'Player1 hit!' });
        }
      }
    }
    setCurrentPlayer((currentPlayer === 'Player1') ? 'Player2' : 'Player1');
  };

  return (
    <View style={styles.container}>
        <HeaderBar
        showBackButton={true}
        showSettingsButton={true}
        onSettingsPress={() => navigation.push('Settings')}
        />
        <View style={styles.subcontainer}>
          <View style={styles.subsubcontainer}>
            <Text style={styles.subtext}>Attack the opponent board!</Text>
            <View>
              <View style={styles.powerup}>
                <PowerupButton icon="bomb" /> 
                <Text>Bomb</Text>
              </View>
              <View style={styles.powerup}>
                <PowerupButton icon="times" /> 
                <Text>Laser</Text>
              </View>
            </View> 
          </View>
          <View >
            <Text>Your board</Text>
            <MiniBoard size={10} player={currentPlayer} board={(currentPlayer === 'Player1') ? boardState1 : boardState2} 
            battle={(currentPlayer === 'Player2') ? battleState2 : battleState1}/>
          </View>

        </View>
        <Text style={styles.title}>{(currentPlayer === 'Player1') ? 'Player2' : 'Player1'}'s Board</Text>
        <BattleBoard 
          size={10} 
          player={(currentPlayer === 'Player1') ? 'Player2' : 'Player1'} 
          onCellPress={handleCellPress} 
          board={(currentPlayer === 'Player1') ? boardState2: boardState1} 
          battle={(currentPlayer === 'Player1') ? battleState2: battleState1}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subcontainer: {
    // make the two components in the subcontainer side by side
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  subsubcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    gap: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtext: {
    flex: 1,
    fontSize: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
},
  overlayText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  powerup: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});

export default Battle;
