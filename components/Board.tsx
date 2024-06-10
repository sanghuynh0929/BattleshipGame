import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

const Board = ({ size, player, onCellPress, board }) => {
  let color = (player === 'Player1') ? 'lightblue' : 'lightpink';


  const renderRow = (rowIndex) => {
    return (
      <View style={styles.row} key={rowIndex}>
        {Array(size).fill(null).map((_, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            color={board[rowIndex][colIndex] || color}
            row={rowIndex}
            col={colIndex}
            onPress={onCellPress}
            icon={(board[rowIndex][colIndex]) ? 'ship' : null}
          />
        ))}
      </View>
    );
  };

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

export default Board;
