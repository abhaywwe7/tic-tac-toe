import React, { useState } from 'react';
import Board from '../src/components/Board';
import './styles/root.css';
import StatusMessage from './components/StatusMessage';
import History from './components/History';
import { calculateWinner } from './winnerCalc';
const App = () => {
  const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setcurrentMove] = useState(0);
  const current = history[currentMove];

  const { winner, winningSquares } = calculateWinner(current.board);

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
  const onNewGame = () => {
    setHistory(NEW_GAME);
    setcurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        Tic <span className="text-green">Tac</span> Toe
      </h1>
      <StatusMessage winner={winner} current={current} />
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start new game
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
};

export default App;
