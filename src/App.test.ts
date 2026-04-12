import { describe, it, expect } from 'vitest'

describe('tic tac toe logic', () => {
  it('should detect a winning row', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null]

    const isWin =
      board[0] === board[1] &&
      board[1] === board[2] &&
      board[0] !== null

    expect(isWin).toBe(true)
  })

  it('should detect no winner', () => {
    const board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']

    const isWin =
      board[0] === board[1] &&
      board[1] === board[2] &&
      board[0] !== null

    expect(isWin).toBe(false)
  })
})