const express = require('express');
const LeagueJs = require("leaguejs");

const { API_KEY, PLATFORM_ID } = require('../config');
const leagueJs = new LeagueJs(API_KEY, { PLATFORM_ID });
const router = express.Router();

router.get('/history/:accountName', async (req, res, next) => {
  try {
    const { accountName } = req.params;
    // get account data
    const accountData = await leagueJs.Summoner.gettingByName(accountName);

    // get match list by accountId
    const matchList = await leagueJs.Match.gettingListByAccount(accountData.accountId);

    const latestMatches = matchList.matches.slice(0, 10);

    // get match data from latestMatches
    const latestMatchesData = [];

    for (let match of latestMatches) {
      console.log(match.gameId);
      const matchData = await leagueJs.Match.gettingById(match.gameId)
      latestMatchesData.push(matchData);
    }

    return res.success({ latestMatchesData });
  } catch (e) {
    return next(err);
  }
});

module.exports = router;