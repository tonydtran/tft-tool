export const countChamp = board => {
  return Object.values(board).reduce((acc, row) => {
    let count = acc
    Object.values(row).forEach(box => {
      if (box.champ && box.champ.id) count = count + 1
    })

    return count
  }, 0)
}

export const countTraits = board => {
  const traits = Object.values(board).reduce((acc, row) => {
    Object.values(row).forEach(box => {
      if (box.champ && box.champ.id) {
        box.champ.traits.forEach(trait => {
          acc[trait] ? acc[trait] = acc[trait] + 1 : acc[trait] = 1
        })
      }
    })

    return acc
  }, {})

  return Object.entries(traits).map(tupple => {
    return { [tupple[0]]: tupple[1] }
  }).sort((a, b) => {
    if (Object.values(a) < Object.values(b)) return 1
    if (Object.values(b) < Object.values(a)) return -1
    return 0
  })
}
