import React from 'react';
import Board from '../src/components/Board';
import './styles/root.css';
const App = () => {
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
};

export default App;
