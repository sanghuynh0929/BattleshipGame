import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import HeaderBar from '../components/HeaderBar';
import MiniBoard from '../components/MiniBoard';
import { GameContext, GameContextProps } from '../context/GameContext';
import BattleBoard from '../components/BattleBoard';
import PowerupButton from '../components/PowerupButton';

const Battle = ({ navigation }) => {
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
  const [turnInProgress, setTurnInProgress] = useState(false);
  const [sound, setSound] = useState(null);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/attack.wav') // Replace with the path to your sound file
    );
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const endGame = (boardState, battleState) => {
    const totalHits = boardState.map((boardRow, rowIndex) =>
      boardRow.filter((cell, colIndex) =>
        cell !== null && battleState[rowIndex][colIndex] !== null
      ).length).reduce((acc, hits) => acc + hits, 0);
    return totalHits === redSize + blueSize + greenSize + cyanSize + yellowSize + magentaSize;
  };

  const handleCellPress = (row, col) => {
    if (turnInProgress) return;
    setTurnInProgress(true);
    playSound();

    const applyPowerup = (newBoard, isPlayer1) => {
      if (endGame(isPlayer1 ? boardState2 : boardState1, newBoard)) {
        setTimeout(() => navigation.push('GameOver'), 1000);
      } else {
        setTimeout(() => {
          // rewrite the below code using typescript if else syntax
          if (currentPlayer === 'Player1') {
            navigation.push('HandOver', { message: 'Player1 used ' + (powerup || 'normal hit') + '!' });
            setCurrentPlayer('Player2');
          } else {
            navigation.push('HandOver', { message: 'Player2 used ' + (powerup || 'normal hit') + '!' });
            setCurrentPlayer('Player1');
          }
          setTurnInProgress(false);
        }, 1000);
      }
    };

    if (currentPlayer === 'Player1') {
      let newBoard;
      if (!powerup) {
        newBoard = battleState2.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? 'hit' : cell
          )
        );
        setBattleState2(newBoard);
      } else if (powerup === "bomb") {
        newBoard = battleState2.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) => {
            if (rowIndex >= Math.max(0, row - 1) && rowIndex <= Math.min(9, row + 1) &&
              colIndex >= Math.max(0, col - 1) && colIndex <= Math.min(9, col + 1)) {
              return 'hit';
            }
            return cell;
          })
        );
        setBattleState2(newBoard);
        setHasFirstPersonUsedPowerup(true);
        setPowerup(null);
      } else if (powerup === "laser") {
        const isRow = Math.random() < 0.5;
        newBoard = battleState2.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) => {
            if ((isRow && rowIndex === row) || (!isRow && colIndex === col)) {
              return 'hit';
            }
            return cell;
          })
        );
        setBattleState2(newBoard);
        setHasFirstPersonUsedPowerup(true);
        setPowerup(null);
      }
      applyPowerup(newBoard, true);
    } else {
      let newBoard;
      if (!powerup) {
        newBoard = battleState1.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? 'hit' : cell
          )
        );
        setBattleState1(newBoard);
      } else if (powerup === "bomb") {
        newBoard = battleState1.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) => {
            if (rowIndex >= Math.max(0, row - 1) && rowIndex <= Math.min(9, row + 1) &&
              colIndex >= Math.max(0, col - 1) && colIndex <= Math.min(9, col + 1)) {
              return 'hit';
            }
            return cell;
          })
        );
        setBattleState1(newBoard);
        setHasSecondPersonUsedPowerup(true);
        setPowerup(null);
      } else if (powerup === "laser") {
        const isRow = Math.random() < 0.5;
        newBoard = battleState1.map((boardRow, rowIndex) =>
          boardRow.map((cell, colIndex) => {
            if ((isRow && rowIndex === row) || (!isRow && colIndex === col)) {
              return 'hit';
            }
            return cell;
          })
        );
        setBattleState1(newBoard);
        setHasSecondPersonUsedPowerup(true);
        setPowerup(null);
      }
      applyPowerup(newBoard, false);
    }
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
            <View style={{ gap: 10 }}>
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
            battle={(currentPlayer === 'Player2') ? battleState2 : battleState1} />
        </View>
      </View>
      <Text style={styles.title}>{(currentPlayer === 'Player1') ? 'Player2' : 'Player1'}'s Board</Text>
      <BattleBoard
        size={10}
        player={(currentPlayer === 'Player1') ? 'Player2' : 'Player1'}
        onCellPress={handleCellPress}
        board={(currentPlayer === 'Player1') ? boardState2 : boardState1}
        battle={(currentPlayer === 'Player1') ? battleState2 : battleState1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  subcontainer: {
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