import { useState } from 'react'
import './App.css'

type Player = 'X' | 'O'
type Cell = Player | null

const WINS: number[][] = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

function getWinner(board: Cell[]): Player | null {
  for (const [a,b,c] of WINS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player
    }
  }
  return null
}

function getWinLine(board: Cell[]): number[] | null {
  for (const line of WINS) {
    const [a,b,c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return line
  }
  return null
}

function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null))
  const [xTurn, setXTurn] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })

  const winner = getWinner(board)
  const winLine = getWinLine(board)
  const isDraw = !winner && board.every(Boolean)

  const move = (i: number) => {
    if (winner || isDraw || board[i]) return
    const next = [...board]
    next[i] = xTurn ? 'X' : 'O'
    const nextWinner = getWinner(next)
    const nextDraw = !nextWinner && next.every(Boolean)
    if (nextWinner) {
      setScores(s => ({ ...s, [nextWinner]: s[nextWinner] + 1 }))
    } else if (nextDraw) {
      setScores(s => ({ ...s, draw: s.draw + 1 }))
    }
    setBoard(next)
    setXTurn(!xTurn)
  }

  const restart = () => {
    setBoard(Array(9).fill(null))
    setXTurn(true)
  }

  const status = winner
    ? `${winner === 'X' ? '✖' : '〇'} wins!`
    : isDraw
    ? "it's a draw!"
    : xTurn ? '✖ your turn' : '〇 your turn'

  return (
    <div className="game-card">
      <div className="scores">
        <div className="sc"><span className="sc-label">✖ wins</span><span className="sc-val">{scores.X}</span></div>
        <div className="sc"><span className="sc-label">draws</span><span className="sc-val">{scores.draw}</span></div>
        <div className="sc"><span className="sc-label">〇 wins</span><span className="sc-val">{scores.O}</span></div>
      </div>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((cell, i) => (
          <div
            key={i}
            className={[
              'cell',
              cell ? `taken ${cell.toLowerCase()}` : '',
              winLine?.includes(i) ? 'win' : ''
            ].join(' ')}
            onClick={() => move(i)}
          >
            {cell === 'X' ? '✖' : cell === 'O' ? '〇' : ''}
          </div>
        ))}
      </div>
      <button className="btn" onClick={restart}>new game</button>
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <header className="hero">
        <h1>CI/CD Demo</h1>
        <p className="subtitle">Group Assignment 6 — Turku AMK SEPM 2026</p>
      </header>

      <main>
        <section className="pipeline-section">
          <h2>Pipeline overview</h2>
          <div className="pipeline">
            <div className="stage">
              <span className="stage-icon">🔍</span>
              <span className="stage-name">Lint</span>
              <span className="stage-desc">ESLint</span>
            </div>
            <div className="arrow">→</div>
            <div className="stage">
              <span className="stage-icon">🔷</span>
              <span className="stage-name">Type check</span>
              <span className="stage-desc">TypeScript</span>
            </div>
            <div className="arrow">→</div>
            <div className="stage">
              <span className="stage-icon">🏗️</span>
              <span className="stage-name">Build</span>
              <span className="stage-desc">Vite</span>
            </div>
            <div className="arrow">→</div>
            <div className="stage">
              <span className="stage-icon">🚀</span>
              <span className="stage-name">Deploy</span>
              <span className="stage-desc">GH Pages</span>
            </div>
          </div>
        </section>

        <section className="game-section">
          <h2>tic-tac-toe</h2>
          <TicTacToe />
        </section>
      </main>
    </div>
  )
}

export default App