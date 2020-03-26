const fs = require('fs')
const settings = require('../settings')
const championsDataset = require('../riot_data/champions.json')
const itemsDataset = require('../riot_data/items.json')
const traitsDataset = require('../riot_data/traits.json')
const recommendedItems = require('../src/data/recommendedItems.json')

// ITEMS
const items = itemsDataset.reduce((acc, item) => {
  const imageId = item.id < 10 ? `0${item.id}` : item.id
  const image = `/assets/items/${imageId}.png`

  return {
    ...acc,
    [item.id]: { ...item, image }
  }
}, {})

// TRAITS
const traits = traitsDataset.reduce((acc, trait) => {
  let formattedName = trait.name.toLowerCase()
  if (formattedName.includes("-")) formattedName = formattedName.replace("-", '')
  if (formattedName.includes(' ')) formattedName = formattedName.replace(' ', '')

  const image = `/assets/traits/${formattedName}.png`

  return {
    ...acc,
    [formattedName]: { id: formattedName, image, ...trait }
  }
}, {})

const traitsData = JSON.stringify(traits, null, 2)
fs.writeFileSync(settings.PROJECT_DIR + '/src/data/traits.json', traitsData)
console.log('Traits dataset generated!')

const itemsData = JSON.stringify(items, null, 2)
fs.writeFileSync(settings.PROJECT_DIR + '/src/data/items.json', itemsData)
console.log('Items dataset generated!')

// CHAMPION LIST
const championList = championsDataset.map(champion => {
  let formattedName = champion.name.toLowerCase()
  if (formattedName.includes("'")) formattedName = formattedName.replace("'", '')
  if (formattedName.includes(' ')) formattedName = formattedName.replace(' ', '')

  return formattedName
})

const championListData = JSON.stringify(championList, null, 2)
fs.writeFileSync(settings.PROJECT_DIR + '/src/data/championList.json', championListData)
console.log('Champion list generated!')

// CHAMPIONS WITH DATA
const champions = championsDataset.reduce((acc, champion) => {
  let formattedName = champion.name.toLowerCase()
  if (formattedName.includes("'")) formattedName = formattedName.replace("'", '')
  if (formattedName.includes(' ')) formattedName = formattedName.replace(' ', '')

  const champTraits = champion.traits.map(trait => {
    let formattedTrait = trait.toLowerCase()
    if (formattedTrait.includes("-")) formattedTrait = formattedTrait.replace("-", '')
    if (formattedTrait.includes(' ')) formattedTrait = formattedTrait.replace(' ', '')

    // TODO: Check next update if typo error is fixed by Riot
    if (champion.name === 'Ekko' && formattedTrait === 'infiltrato') {
      formattedTrait = 'infiltrator'
    }

    return formattedTrait
  })

  const image = `/assets/champions/${formattedName}.png`

  return {
    ...acc,
    [formattedName]: {
      id: formattedName,
      name: champion.name,
      championId: champion.championId,
      cost: champion.cost,
      traits: champTraits,
      image,
      recommended: recommendedItems[formattedName]
    }
  }
}, {})

const championsData = JSON.stringify(champions, null, 2)
fs.writeFileSync(settings.PROJECT_DIR + '/src/data/champions.json', championsData)
console.log('Champions dataset generated!')
