import traitSet from '../data/traits.json'

const tiers = {
  bronze: 1,
  silver: 2,
  gold: 3
}

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

  return Object.entries(traits).map(tupple => ({
    id: tupple[0],
    count: tupple[1]
  }))
    .sort((a, b) => b.count - a.count)
    .map(trait => {
      const dataTrait = traitSet[trait.id]
      const levels = dataTrait.sets.map(level => {
        let isActive = false
        if (trait.count >= level.min) {
          isActive = true

          if (level.max) {
            isActive = trait.count <= level.max
          }
        }

        const style = level.style || 'gold'

        return {
          style,
          min: level.min,
          isActive
        }
      })

      let tier = 0
      const activeLevel = levels.find(level => level.isActive)
      if (activeLevel) tier = tiers[activeLevel.style]

      return {
        ...dataTrait,
        levels,
        count: trait.count,
        tier
      }
    })
    .sort((a, b) => b.tier - a.tier)
}
