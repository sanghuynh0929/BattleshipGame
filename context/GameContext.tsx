// context/GameContext.tsx
import React, { createContext, useState, FC, ReactNode } from 'react';

type BoardState = (string | null)[][];

interface GameContextProps {
  boardState1: BoardState;
  boardState2: BoardState;
  battleState1: BoardState;
  battleState2: BoardState;
  isPVP: boolean;
  hasFirstPlayerConfigured: boolean;
  hasSecondPlayerConfigured: boolean;
  currentPlayer: 'Player1' | 'Player2';
  hasFirstPersonUsedPowerup: boolean;
  hasSecondPersonUsedPowerup: boolean;
  configureFirstPlayer: (board: BoardState) => void;
  configureSecondPlayer: (board: BoardState) => void;
  setBoardState1: (board: BoardState) => void;
  setBoardState2: (board: BoardState) => void;
  setBattleState1: (board: BoardState) => void;
  setBattleState2: (board: BoardState) => void;
  setIsPVP: (isPVP: boolean) => void;
  setCurrentPlayer: (currentPlayer: 'Player1' | 'Player2') => void;
  resetGame: () => void; 
  setHasFirstPersonUsedPowerup: (hasFirstPersonUsedPowerup: boolean) => void;
  setHasSecondPersonUsedPowerup: (hasSecondPersonUsedPowerup: boolean) => void;
}

const initialBoardState: BoardState = Array(10).fill(Array(10).fill(null));

const GameContext = createContext(undefined);

const GameProvider = ({ children }) => {
  const [boardState1, setBoardState1] = useState<BoardState>(initialBoardState);
  const [boardState2, setBoardState2] = useState<BoardState>(initialBoardState);
  const [battleState1, setBattleState1] = useState<BoardState>(initialBoardState);
  const [battleState2, setBattleState2] = useState<BoardState>(initialBoardState);
  const [hasFirstPlayerConfigured, setHasFirstPlayerConfigured] = useState<boolean>(false);
  const [hasSecondPlayerConfigured, setHasSecondPlayerConfigured] = useState<boolean>(false);
  const [isPVP, setIsPVP] = useState<boolean>(true);
  const [currentPlayer, setCurrentPlayer] = useState<'Player1' | 'Player2'>('Player1');
  const [hasFirstPersonUsedPowerup, setHasFirstPersonUsedPowerup] = useState<boolean>(false);
  const [hasSecondPersonUsedPowerup, setHasSecondPersonUsedPowerup] = useState<boolean>(false);


  const configureFirstPlayer = (board: BoardState) => {
    setBoardState1(board);
    setHasFirstPlayerConfigured(true);
  };

  const configureSecondPlayer = (board: BoardState) => {
    setBoardState2(board);
    setHasSecondPlayerConfigured(true);
  };

  const resetGame = () => {
    setBoardState1(initialBoardState);
    setBoardState2(initialBoardState);
    setHasFirstPlayerConfigured(false);
    setHasSecondPlayerConfigured(false);
    setBattleState1(initialBoardState);
    setBattleState2(initialBoardState);
    setHasFirstPersonUsedPowerup(false);
    setHasSecondPersonUsedPowerup(false);
  };

  return (
    <GameContext.Provider
      value={{
        boardState1,
        boardState2,
        battleState1,
        battleState2,
        hasFirstPlayerConfigured,
        hasSecondPlayerConfigured,
        isPVP,
        currentPlayer,
        hasFirstPersonUsedPowerup,
        hasSecondPersonUsedPowerup,
        setHasFirstPersonUsedPowerup,
        setHasSecondPersonUsedPowerup,
        setBoardState1,
        setBoardState2,
        setBattleState1,
        setBattleState2,
        configureFirstPlayer,
        configureSecondPlayer,
        resetGame,
        setIsPVP,
        setCurrentPlayer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider, GameContextProps };