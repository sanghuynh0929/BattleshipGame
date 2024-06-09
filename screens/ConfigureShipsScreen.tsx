// screens/ConfigureShipsScreen.tsx
import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GameContext, GameContextProps } from '../context/GameContext';
import Button from '../components/Button';
import Board from '../components/Board';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import HeaderBar from '../components/HeaderBar';
import { ThemedText } from '../components/ThemedText';
import IconCell from '../components/IconCell';

type ConfigureShipsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ConfigureShips'>;

type Props = {
  navigation: ConfigureShipsScreenNavigationProp;
};

const ConfigureShipsScreen: React.FC<Props> = ({ navigation }) => {
  const {
    isPVP,
    hasFirstPlayerConfigured,
    hasSecondPlayerConfigured,
    setBattleState1,
    setBattleState2,
    configureFirstPlayer,
    configureSecondPlayer,
    resetGame,
  } = useContext(GameContext) as GameContextProps;

  // Determine which player is configuring their ships
  let player : 'Player1' | 'Player2' = 'Player2';
  if (!hasFirstPlayerConfigured) {
    resetGame();
    player = 'Player1';
  } else if (!hasSecondPlayerConfigured) {
    player = 'Player2';
  }

  const handleConfigure = (board) => {
    if (!isPVP) {
        configureFirstPlayer(board);
        navigation.navigate('Battle');
    } else if (!hasFirstPlayerConfigured) {
      configureFirstPlayer(board);
      navigation.navigate('HumanVsHuman');
    } else {
      configureSecondPlayer(board);
      navigation.navigate('HumanVsHuman');
    }
    // console.log(board);
  };

  // Board validation logic
  const [board, setBoard] = useState(Array(10).fill(Array(10).fill(null))); // [row][col]
  const [redCounter, setRedCounter] = useState(5);
  const [blueCounter, setBlueCounter] = useState(4);
  const [greenCounter, setGreenCounter] = useState(3);
  const [cyanCounter, setCyanCounter] = useState(3);
  const [yellowCounter, setYellowCounter] = useState(2);
  const [magentaCounter, setMagentaCounter] = useState(2);

  

  const [isBoardValid, setIsBoardValid] = useState(false);

  const validateBoard = (board) => {
    // Ship placement is only correct if there are no ships of different colors touching each other or diagonally adjacent
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col]) {
          if (row > 0 && board[row - 1][col] && board[row - 1][col] !== board[row][col]) {
            return false;
          } else if (row < 9 && board[row + 1][col] && board[row + 1][col] !== board[row][col]) {
            return false;
          } else if (col > 0 && board[row][col - 1] && board[row][col - 1] !== board[row][col]) {
            return false;
          } else if (col < 9 && board[row][col + 1] && board[row][col + 1] !== board[row][col]) {
            return false;
          } else if (row > 0 && col > 0 && board[row - 1][col - 1] && board[row - 1][col - 1] !== board[row][col]) {
            return false;
          } else if (row > 0 && col < 9 && board[row - 1][col + 1] && board[row - 1][col + 1] !== board[row][col]) {
            return false;
          } else if (row < 9 && col > 0 && board[row + 1][col - 1] && board[row + 1][col - 1] !== board[row][col]) {
            return false;
          } else if (row < 9 && col < 9 && board[row + 1][col + 1] && board[row + 1][col + 1] !== board[row][col]) {
            return false;
          }
        }
      }
    }
    const numRows = board.length;
    const numCols = board[0].length;
    const colors = ['red', 'green', 'blue', 'cyan', 'yellow', 'magenta'];
    for (const color of colors) {
      const colorCells = [];

      // Collect all cells of the current color
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          if (board[i][j] === color) {
            colorCells.push([i, j]);
          }
        }
      }

      if (colorCells.length === 0) continue; // No cells of this color, skip to the next color

      // Check if all cells of this color are in the same row or the same column
      const allInSameRow = colorCells.every(cell => cell[0] === colorCells[0][0]);
      const allInSameColumn = colorCells.every(cell => cell[1] === colorCells[0][1]);

      if (!allInSameRow && !allInSameColumn) return false;

      // Check adjacency
      if (allInSameRow) {
        const row = colorCells[0][0];
        const colIndices = colorCells.map(cell => cell[1]).sort((a, b) => a - b);
        for (let i = 1; i < colIndices.length; i++) {
          if (colIndices[i] !== colIndices[i - 1] + 1) {
            return false;
          }
        }
      } else if (allInSameColumn) {
        const col = colorCells[0][1];
        const rowIndices = colorCells.map(cell => cell[0]).sort((a, b) => a - b);
        for (let i = 1; i < rowIndices.length; i++) {
          if (rowIndices[i] !== rowIndices[i - 1] + 1) {
            return false;
          }
        }
      }
    }


    return true;
  };

  const validateShipCount = (board) => {
    // count colors in board manually
    let redCount = 0;
    let blueCount = 0;
    let greenCount = 0;
    let cyanCount = 0;
    let yellowCount = 0;
    let magentaCount = 0;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] === 'red') {
          redCount++;
        } else if (board[row][col] === 'blue') {
          blueCount++;
        } else if (board[row][col] === 'green') {
          greenCount++;
        } else if (board[row][col] === 'cyan') {
          cyanCount++;
        } else if (board[row][col] === 'yellow') {
          yellowCount++;
        } else if (board[row][col] === 'magenta') {
          magentaCount++;
        }
      }
    }
    if (redCount !== 5 || blueCount !== 4 || greenCount !== 3 || cyanCount !== 3 || yellowCount !== 2 || magentaCount !== 2) {
      return false;
    } else return true;
  };

  const handleBoardChange = (newBoard) => {
    if (validateBoard(newBoard)) {
      setBoard(newBoard);
      if (validateShipCount(newBoard)) {
        setIsBoardValid(true);
      } else {
        setIsBoardValid(false);
      }
      return true;
    } else {
      setIsBoardValid(false);
      return false;
    }
  };

  // Ship placing logic
  const [selectedColor, setSelectedColor] = useState(null);

  const handleCellPress = (row, col) => {
    const cellColor = board[row][col];
    let redCounterFlag = 0;
    let blueCounterFlag = 0;
    let greenCounterFlag = 0;
    let cyanCounterFlag = 0;
    let yellowCounterFlag = 0;
    let magentaCounterFlag = 0;
    if (selectedColor === 'red' && redCounter > 0 && !cellColor) {
      redCounterFlag = 1;
    } else if (selectedColor === 'blue' && blueCounter > 0 && !cellColor) {
      blueCounterFlag = 1;
    } else if (selectedColor === 'green' && greenCounter > 0 && !cellColor) {
      greenCounterFlag = 1;
    } else if (selectedColor === 'cyan' && cyanCounter > 0 && !cellColor) {
      cyanCounterFlag = 1;
    } else if (selectedColor === 'yellow' && yellowCounter > 0 && !cellColor) {
      yellowCounterFlag = 1;
    } else if (selectedColor === 'magenta' && magentaCounter > 0 && !cellColor) {
      magentaCounterFlag = 1;
    } else {
      return;
    }
    let boardChanged;
    if (selectedColor) {
      const newBoard = board.map((boardRow, rowIndex) =>
        boardRow.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? selectedColor : cell
        )
      );
      boardChanged = handleBoardChange(newBoard);
    } else return;
    if (boardChanged) {
      setRedCounter(redCounter - redCounterFlag);
      setBlueCounter(blueCounter - blueCounterFlag);
      setGreenCounter(greenCounter - greenCounterFlag);
      setCyanCounter(cyanCounter - cyanCounterFlag);
      setYellowCounter(yellowCounter - yellowCounterFlag);
      setMagentaCounter(magentaCounter - magentaCounterFlag);
    }
  };

  const handleCellLongPress = (color) => {
    const newBoard = board.map((boardRow) => boardRow.map((cell) => (cell === color ? null : cell)));
    if (color === 'red') {
      setRedCounter(5);
    } else if (color === 'blue') {
      setBlueCounter(4);
    } else if (color === 'green') {
      setGreenCounter(3);
    } else if (color === 'cyan') {
      setCyanCounter(3);
    } else if (color === 'yellow') {
      setYellowCounter(2);
    } else if (color === 'magenta') {
      setMagentaCounter(2);
    } else {
      return;
    }
    handleBoardChange(newBoard);
  };

  return (
    <View style={styles.container}>
      <HeaderBar
        showBackButton={true}
        showSettingsButton={true}
        onSettingsPress={() => navigation.push('Settings')}
      />
      <ThemedText type='default' style={styles.subtitle}>Tap the squares to configure your ships! 
      Arrange one ship at a time horizontally or vertically and leave space between ships. Hold the selection to clear that selected color.</ThemedText>
      <Button
        title="Continue"
        onPress={() => {(isBoardValid) ? handleConfigure(board): null}}
        style={!isBoardValid && styles.hiddenButton}
      />
      <Board size={10} player={player} onCellPress={handleCellPress} board={board} />

      <View style={{ flexDirection: 'column' }}>
        <View style={styles.subcontainer}>
          <IconCell color='red' icon='ship' onCellPress={() => setSelectedColor('red')} onCellLongPress={() => {handleCellLongPress('red');}}/>
          <Text style={styles.text}>{redCounter}</Text>
          <IconCell color='blue' icon='ship' onCellPress={() => setSelectedColor('blue')} onCellLongPress={() => {handleCellLongPress('blue');}}/>
          <Text style={styles.text}>{blueCounter}</Text>
          <IconCell color='green' icon='ship' onCellPress={() => setSelectedColor('green')} onCellLongPress={() => {handleCellLongPress('green');}}/>
          <Text style={styles.text}>{greenCounter}</Text>
        </View>
        <View style={styles.subcontainer}>
          <IconCell color='cyan' icon='ship' onCellPress={() => setSelectedColor('cyan')} onCellLongPress={() => {handleCellLongPress('cyan');}}/>
          <Text style={styles.text}>{cyanCounter}</Text>
          <IconCell color='yellow' icon='ship' onCellPress={() => setSelectedColor('yellow')} onCellLongPress={() => {handleCellLongPress('yellow');}}/>
          <Text style={styles.text}>{yellowCounter}</Text>
          <IconCell color='magenta' icon='ship' onCellPress={() => setSelectedColor('magenta')} onCellLongPress={() => {handleCellLongPress('magenta');}}/>
          <Text style={styles.text}>{magentaCounter}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    margin: 20,
    textAlign: 'center',
  },
  hiddenButton: {
    backgroundColor: 'white',
    color: 'white',
  },
  subcontainer: {
    flexDirection: 'row',
    gap: 10,
    margin: 10,
  }, 
  text: {
    fontSize: 20,
    marginRight: 10,
    marginVertical: 10,
  },
});

export default ConfigureShipsScreen;
