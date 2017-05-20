import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor()
  {
    super();
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      isXNext: true,
      currentMove: 0
    }
  }

  render() {
    const history = this.state.history;
    const currentSquares = history[this.state.currentMove];
    const winner = calculateWinner(currentSquares.squares);
    const status = winner ? 'the winner is ' + winner : 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
    const moves = history.map((move, index) => {
        const description = index !== 0 ? 'Move #'+index : 'Start of game';
        return (
            <li key={index}>
                <a className={index === this.state.currentMove ? "bold" : ""} href='#' onClick={()=>this.jumpTo(index)}>{description}</a>
            </li>
        );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares.squares} onClick={(i)=>this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  jumpTo(stepNumber)
  {
      this.setState({
          isXNext: (stepNumber % 2) === 0 ? true : false,
          currentMove: stepNumber
      });
  }

  handleClick(i)
  {
    const history = this.state.history.slice(0, this.state.currentMove + 1);
    const currentSquares = history[history.length - 1].squares;

    if (calculateWinner(currentSquares) || currentSquares[i]) return;
     
    const squares = currentSquares.slice();
    squares[i] = this.state.isXNext ? 'X' : 'O';
    this.setState(
      {
        history: history.concat({squares:squares}),
        isXNext: !this.state.isXNext,
        currentMove: history.length
    });
  }
}

export default Game;


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
