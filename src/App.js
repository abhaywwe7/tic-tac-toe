import React, { useState } from 'react';
import Board from '../src/components/Board';
import './styles/root.css';
import History from './components/History';
import { calculateWinner } from './winnerCalc';
const App = () => {
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);
  const [currentMove, setcurrentMove] = useState(0);
  const current = history[currentMove];

  const winner = calculateWinner(current.board);
  const message = winner
    ? `Winner is ${winner}`
    : `Next player is ${current.isXNext ? 'X' : 'O'}`;

  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setcurrentMove(prev => prev + 1);
  };

  const moveTo = move => {
    setcurrentMove(move);
  };
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <h2>{message}</h2>
      <Board board={current.board} handleSquareClick={handleSquareClick} />
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
    </div>
  );
};

export default App;
