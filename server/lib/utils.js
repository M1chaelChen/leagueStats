const champions = require('../static/champion.json');

exports.findChampionById = (id) => {
  let targetChampion;
  Object.keys(champions.data).forEach(key => {
    if (champions.data[key].key == id) {
      targetChampion = champions.data[key].name
    }
  })
  return targetChampion;
}