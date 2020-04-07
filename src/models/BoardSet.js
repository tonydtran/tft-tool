import { v4 as uuidv4 } from 'uuid'

const ROWS = ['a', 'b', 'c', 'd']
const BOXES_BY_ROW = 7

const box = (row, index) => {
  return { id: `${row}${index}`, row, champ: {}, items: [], carry: false }
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

export default function BoardSet(boardSet) {
  return {
    id: uuidv4(),
    board: boardSet ? boardSet.board : emptyBoard,
    title: boardSet ? boardSet.title : 'New board',
    text: boardSet ? boardSet.text : '',
    traits: boardSet ? boardSet.traits : []
  }
}
