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

export const BOARD = ROWS.reduce((acc, rowLetter) => {
  return {
    ...acc,
    [rowLetter]: row(rowLetter)
  }
}, {})
