const LeagueJs = require('leaguejs');

const { API_KEY, PLATFORM_ID } = require('../config');
const leagueJs = new LeagueJs(API_KEY, { PLATFORM_ID });

module.exports = leagueJs;