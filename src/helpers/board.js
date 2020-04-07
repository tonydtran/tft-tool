export const countChamp = board => {
  const count = []

  Object.values(board).forEach(row => {
    count.push(Object.values(row).reduce((acc, box) => {
      if (box.champ && box.champ.id) return acc + 1
      return acc
    }, 0))
  })

  return count.reduce((acc, rowCount) => acc + rowCount, 0)
}
