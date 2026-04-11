import { useState, useEffect, useCallback } from 'react'
import './App.css'

const HOLES = 9
const GAME_DURATION = 30

function WhackAMole() {
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [running, setRunning] = useState(false)
  const [activeMole, setActiveMole] = useState<number | null>(null)
  const [whacked, setWhacked] = useState<number | null>(null)
  const [message, setMessage] = useState('press start to play')

  const getSpeed = useCallback((currentScore: number) => {
    return Math.max(400, 1200 - currentScore * 25)
  }, [])

  useEffect(() => {
    if (!running) return
    const timer = setTimeout(() => {
      setActiveMole(Math.floor(Math.random() * HOLES))
    }, getSpeed(score))
    return () => clearTimeout(timer)
  }, [running, activeMole, score, getSpeed])

  useEffect(() => {
    if (!running) return
    const countdown = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setRunning(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(countdown)
  }, [running])

  useEffect(() => {
    if (!running && timeLeft === 0) {
      setActiveMole(null)
      setScore(prev => {
        setBest(b => Math.max(b, prev))
        setMessage(
          prev >= 15 ? `great job! scored ${prev}` :
          prev >= 8 ? `nice! scored ${prev}` :
          `scored ${prev} — try again!`
        )
        return prev
      })
    }
  }, [running, timeLeft])

  const startGame = () => {
    setScore(0)
    setTimeLeft(GAME_DURATION)
    setActiveMole(null)
    setWhacked(null)
    setMessage('whack the hedgehog!')
    setRunning(true)
  }

  const whack = (i: number) => {
    if (!running || i !== activeMole) return
    setWhacked(i)
    setActiveMole(null)
    setScore(s => s + 1)
    setTimeout(() => setWhacked(null), 300)
  }

  return (
    <div className="game">
      <div className="scorebar">
        <div className="stat"><span className="stat-label">score</span><span className="stat-val">{score}</span></div>
        <div className="stat"><span className="stat-label">time</span><span className="stat-val">{timeLeft}</span></div>
        <div className="stat"><span className="stat-label">best</span><span className="stat-val">{best}</span></div>
      </div>
      <div className="grid">
        {Array.from({ length: HOLES }, (_, i) => (
          <div
            key={i}
            className={`hole ${activeMole === i ? 'active' : ''} ${whacked === i ? 'whacked' : ''}`}
            onClick={() => whack(i)}
          >
            {activeMole === i && <span className="mole">🦔</span>}
            {whacked === i && <span className="mole">💥</span>}
          </div>
        ))}
      </div>
      <p className="msg">{message}</p>
      <button className="btn" onClick={startGame} disabled={running}>
        {running ? 'playing...' : timeLeft === 0 ? 'play again' : 'start'}
      </button>
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
              <span className="stage-desc">ESLint code quality</span>
            </div>
            <div className="arrow">→</div>
            <div className="stage">
              <span className="stage-icon">🔷</span>
              <span className="stage-name">Type check</span>
              <span className="stage-desc">TypeScript validation</span>
            </div>
            <div className="arrow">→</div>
            <div className="stage">
              <span className="stage-icon">🏗️</span>
              <span className="stage-name">Build</span>
              <span className="stage-desc">Vite production build</span>
            </div>
            <div className="arrow">→</div>
            <div className="stage">
              <span className="stage-icon">🚀</span>
              <span className="stage-name">Deploy</span>
              <span className="stage-desc">GitHub Pages</span>
            </div>
          </div>
        </section>

        <section className="game-section">
          <h2>Whack-a-mole</h2>
          <p className="game-intro">Built with React + TypeScript. Speed increases as your score goes up.</p>
          <WhackAMole />
        </section>
      </main>
    </div>
  )
}

export default App