// components/BattleBoard.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

const BattleBoard = ({ size, player, onCellPress, board, battle }) => {
  let color = (player === 'Player1') ? 'lightblue' : 'lightpink';

    // battle is an array, where battle[row][col] !== null if that cell is hit by a missile
    // if the missile hit water, we show a splash
    // if the missile hit a ship, we show a fire icon

    // check if a ship is totally destroyed
      // if so, set the color of the cell to that ship's color
      // otherwise, use the default color
      let countRed = 5;
      let countBlue = 4;
      let countGreen = 3;
      let countCyan = 3;
      let countYellow = 2;
      let countMagenta = 2;
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

    const renderRow = (rowIndex) => {
        return (
            <View style={styles.row} key={rowIndex}>
                {Array(size).fill(null).map((_, colIndex) => (
                <Cell
                    key={`${rowIndex}-${colIndex}`}
                    color={(countRed === 0 && board[rowIndex][colIndex] == 'red') ? 'red' : (countGreen === 0 && board[rowIndex][colIndex] == 'green') ? 'green' : (countBlue === 0 && board[rowIndex][colIndex] == 'blue') ? 'blue' : (countCyan === 0 && board[rowIndex][colIndex] == 'cyan') ? 'cyan' : (countYellow === 0 && board[rowIndex][colIndex] == 'yellow') ? 'yellow' : (countMagenta === 0 && board[rowIndex][colIndex] == 'magenta') ? 'magenta' : color}
                    row={rowIndex}
                    col={colIndex}
                    onPress={onCellPress}
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
});

export default BattleBoard;
