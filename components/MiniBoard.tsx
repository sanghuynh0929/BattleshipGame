import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { GameContext, GameContextProps } from '../context/GameContext';


const MiniCell = ({ row, col, color, icon }) => {
    const handlePress = () => {
      console.log(`Cell pressed: (${row}, ${col})`);
    };
    return (
    <View style={[styles.cell, { backgroundColor: color }]}>
      <FontAwesome5 name={icon} size={8} color="black" />
    </View>
    
    );
  };
  

const MiniBoard = ({ size, player, board, battle }) => {
  const {
    redSize,
    blueSize,
    greenSize,
    cyanSize,
    yellowSize,
    magentaSize,
  } = useContext(GameContext) as GameContextProps;


  let color = (player === 'Player1') ? 'lightblue' : 'lightpink';

    // check if a ship is totally destroyed
      // if so, set the color of the cell to that ship's color
      // otherwise, use the default color
      let countRed = redSize
      let countBlue = blueSize;
      let countGreen = greenSize;
      let countCyan = cyanSize;
      let countYellow = yellowSize;
      let countMagenta = magentaSize;
      // red is destroyed if total count of hit red cells = 5

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (board[i][j] === 'red' && battle[i][j] === 'hit') {
            countRed--;
          }
          if (board[i][j] === 'green' && battle[i][j] === 'hit') {
            countGreen--;
          }
          if (board[i][j] === 'blue' && battle[i][j] === 'hit') {
            countBlue--;
          }
          if (board[i][j] === 'cyan' && battle[i][j] === 'hit') {
            countCyan--;
          }
          if (board[i][j] === 'yellow' && battle[i][j] === 'hit') {
            countYellow--;
          }
          if (board[i][j] === 'magenta' && battle[i][j] === 'hit') {
            countMagenta--;
          }
        }
      }

        
    // battle is an array, where battle[row][col] !== null if that cell is hit by a missile
    // if the missile hit water, we show a splash
    // if the missile hit a ship, we show a fire icon

    const renderRow = (rowIndex) => {
        // if red, green, blue, cyan, yellow, magenta are destroyed, set the color of the cell to that ship's color
        return (
            <View style={styles.row} key={rowIndex}>
                {Array(size).fill(null).map((_, colIndex) => (
                <MiniCell
                    key={`${rowIndex}-${colIndex}`}
                    color={(countRed === 0 && board[rowIndex][colIndex] == 'red') ? 'red' : (countGreen === 0 && board[rowIndex][colIndex] == 'green') ? 'green' : (countBlue === 0 && board[rowIndex][colIndex] == 'blue') ? 'blue' : (countCyan === 0 && board[rowIndex][colIndex] == 'cyan') ? 'cyan' : (countYellow === 0 && board[rowIndex][colIndex] == 'yellow') ? 'yellow' : (countMagenta === 0 && board[rowIndex][colIndex] == 'magenta') ? 'magenta' : color}
                    row={rowIndex}
                    col={colIndex}
                    icon={(board[rowIndex][colIndex] !== null && battle[rowIndex][colIndex] === 'hit') ? 'fire' : (battle[rowIndex][colIndex] === 'hit') ? 'water' : null}
                />
                ))}
            </View>
        );
    }

  return (
    <View style={styles.board}>
      {Array(size).fill(null).map((_, rowIndex) => renderRow(rowIndex))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 10,
    height: 10,
    margin: 1,
    borderRadius: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MiniBoard;
