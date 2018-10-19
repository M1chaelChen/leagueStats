const champions = require('../static/champion.json');
const spells = require('../static/summoner.json');

exports.findChampionById = (id) => {
  let targetChampion;
  Object.keys(champions.data).forEach(key => {
    if (champions.data[key].key == id) {
      targetChampion = champions.data[key]
    }
  })
  return targetChampion;
}

exports.findSpellById = (id) => {
  let targetSpell;
  Object.keys(spells.data).forEach(key => {
    if (spells.data[key].key == id) {
      targetSpell = spells.data[key].image.full
    }
  })
  return targetSpell;
}