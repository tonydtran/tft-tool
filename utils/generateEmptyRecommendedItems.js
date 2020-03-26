const fs = require('fs')
const settings = require('../settings')
const championsDataset = require('../riot_data/champions.json')

const champions = championsDataset.reduce((acc, champion) => {
  let formattedName = champion.name.toLowerCase()
  if (formattedName.includes("'")) formattedName = formattedName.replace("'", '')
  if (formattedName.includes(' ')) formattedName = formattedName.replace(' ', '')

  return {
    ...acc,
    [formattedName]: []
  }
}, {})

const championsData = JSON.stringify(champions, null, 2)
fs.writeFileSync(settings.PROJECT_DIR + '/src/data/recommendedItems.json', championsData)
console.log('Empty recommendedItems data generated!')
