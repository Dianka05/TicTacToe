import React, { useRef, useState } from 'react'
import './TicTacToe.css';
import circle from '../assets/circle.png'
import cross from '../assets/cross.png'

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(''))
  const [isXNext, setIsXNext] = useState(true)
  const [lock, setLock] = useState(false)
  const titleRef = useRef(null)

  const toggle = (index) => { 
    if (lock || board[index]) return

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'x' : 'o'
    console.log(newBoard);
    setBoard(newBoard)
    setIsXNext(!isXNext)
    checkWin(newBoard)
  }
  const checkWin = (currentBoard) => {

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winningCombinations) {
      if (currentBoard[a] && currentBoard[a] == currentBoard[b] && currentBoard[a] == currentBoard[c]) {
        won(currentBoard[a])
        return
      }
    }
  }

  const won = (winner) => {
    setLock(true)
    titleRef.current.innerHTML = `Congratulations: <img src='${winner === 'x' ? cross : circle}' alt='${winner}' class='circle' /> Won!`;
  }
  const resetGame = () => {
    setBoard(Array(9).fill(''))
    setIsXNext(true)
    setLock(false)
    titleRef.current.innerHTML = 'Tic Tac Toe Game in <span>React</span>';
  };

  return (
    <div className='container'>
      <h1 className='title' ref={titleRef}>Tic Tac Toe Game in <span>React</span></h1>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className='boxes' onClick={() => toggle(index)}>
            {cell && <img src={cell === 'x' ? cross : circle} alt='cell' className={cell} />}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  )
}

export default TicTacToe