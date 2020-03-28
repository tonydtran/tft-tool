const ROWS = ['a', 'b', 'c', 'd']
const BOXES_BY_ROW = 7

const box = (row, index) => {
  return { id: `${row}${index}`, row, champ: null, items: [], carry: false }
}

const row = letter => {
  const newRow = {}
  for (let i = 1; i <= BOXES_BY_ROW; i++) {
    newRow[`${letter}${i}`] = box(letter, i)
  }

  return newRow
}

const emptyBoard = ROWS.reduce((acc, rowLetter) => {
  return {
    ...acc,
    [rowLetter]: row(rowLetter)
  }
}, {})

export default function BoardSet(board) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    board: board ? board : emptyBoard
  }
}
