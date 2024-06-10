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
    hasFirstPersonUsedPowerup,
    setHasFirstPersonUsedPowerup,
    hasSecondPersonUsedPowerup,
    setHasSecondPersonUsedPowerup,
    boardState1,
    boardState2,
    battleState1,
    setBattleState1,
    battleState2,
    setBattleState2,
    redSize,
    blueSize,
    greenSize,
    cyanSize,
    yellowSize,
    magentaSize,
  } = useContext(GameContext) as GameContextProps;


  const [powerup, setPowerup] = useState(null);

  const endGame = (boardState, battleState) => {
    // count number of cells that are both hit and have a ship using map filter reduce
    const totalHits = boardState.map((boardRow, rowIndex) =>
      boardRow.filter((cell, colIndex) =>
        cell !== null && battleState[rowIndex][colIndex] !== null
      ).length).reduce((acc, hits) => acc + hits, 0);
    return totalHits === redSize + blueSize + greenSize + cyanSize + yellowSize + magentaSize;
  }

  const handleCellPress = (row, col) => {
    if (currentPlayer === 'Player1') {
      if (!powerup) {
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
      } else if (powerup === "bomb") {
        // change the 3x3 cells around [row][col] in battleState2 to 'hit'
        const newBoard = battleState2.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) =>
            cell
          )
        );
        for (let i = Math.max(0, row - 1); i < Math.min(10, row + 2); i++) {
          for (let j = Math.max(0, col - 1); j < Math.min(10, col + 2); j++) {
            newBoard[i][j] = 'hit';
          }
        }
        setBattleState2(newBoard);
        if (endGame(boardState2, newBoard)) {
          navigation.push('GameOver');
        } else {
          navigation.push('HandOver', { message: 'Player1 used bomb powerup' });
        }
        setHasFirstPersonUsedPowerup(true);
        setPowerup(null);
      } else {
        // change the cells in the same row or column as [row][col] in battleState2 to 'hit'
        // choose randomly row or column
        const newBoard = battleState2.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) =>
            cell
          )
        );
        const isRow = Math.random() < 0.5;
        for (let i = 0; i < 10; i++) {
          if (isRow) {
            newBoard[row][i] = 'hit';
          } else {
            newBoard[i][col] = 'hit';
          }
        }
        setBattleState2(newBoard);
        if (endGame(boardState2, newBoard)) {
          navigation.push('GameOver');
        } else {
          navigation.push('HandOver', { message: 'Player1 used laser powerup' });
        }
        setHasFirstPersonUsedPowerup(true);
        setPowerup(null);
      }
      
    } else {
      if (!powerup) {
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
            navigation.push('HandOver', { message: 'Player2 hit!' });
          }
        }
      } else if (powerup === "bomb") {
        // change the 3x3 cells around [row][col] in battleState2 to 'hit'
        const newBoard = battleState1.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) =>
            cell
          )
        );
        for (let i = Math.max(0, row - 1); i < Math.min(10, row + 2); i++) {
          for (let j = Math.max(0, col - 1); j < Math.min(10, col + 2); j++) {
            newBoard[i][j] = 'hit';
          }
        }
        setBattleState1(newBoard);
        if (endGame(boardState1, newBoard)) {
          navigation.push('GameOver');
        } else {
          navigation.push('HandOver', { message: 'Player2 used bomb powerup' });
        }
        setHasSecondPersonUsedPowerup(true);
        setPowerup(null);
      } else {
        // change the cells in the same row or column as [row][col] in battleState2 to 'hit'
        // choose randomly row or column
        const newBoard = battleState1.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) =>
            cell
          )
        );
        const isRow = Math.random() < 0.5;
        for (let i = 0; i < 10; i++) {
          if (isRow) {
            newBoard[row][i] = 'hit';
          } else {
            newBoard[i][col] = 'hit';
          }
        }
        setBattleState1(newBoard);
        if (endGame(boardState1, newBoard)) {
          navigation.push('GameOver');
        } else {
          navigation.push('HandOver', { message: 'Player2 used laser powerup' });
        }
        setHasSecondPersonUsedPowerup(true);
        setPowerup(null);
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
            {((currentPlayer === 'Player1') ? !hasFirstPersonUsedPowerup : !hasSecondPersonUsedPowerup) ? 
            <View style={{gap:10}}>
              <View style={styles.powerup}>
                <PowerupButton icon="bomb" handlePress={() => setPowerup('bomb')} /> 
                <Text>Bomb</Text>
              </View>
              <View style={styles.powerup}>
                <PowerupButton icon="times" handlePress={() => setPowerup("laser")} /> 
                <Text>Laser</Text>
              </View>
            </View> : null
            }
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
