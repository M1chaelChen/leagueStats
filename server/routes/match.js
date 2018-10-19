const express = require('express');
const LeagueJs = require("leaguejs");

const { API_KEY, PLATFORM_ID } = require('../config');
const { findChampionById, findSpellById } = require('../lib/utils');
const leagueJs = new LeagueJs(API_KEY, { PLATFORM_ID, STATIC_DATA_ROOT: './static/staticData' });
const router = express.Router();

router.get('/history/:accountName', async (req, res, next) => {
  try {
    const { accountName } = req.params;
    // get account data
    const accountData = await leagueJs.Summoner.gettingByName(accountName);

    // get match list by accountId
    const matchList = await leagueJs.Match.gettingListByAccount(accountData.accountId);

    const latestMatches = matchList.matches.slice(0, 5);

    // get match data from latestMatches
    const latestMatchesData = [];

    for (let match of latestMatches) {
      const matchData = await leagueJs.Match.gettingById(match.gameId)

      // find user's participant data
      const { participantId } = matchData.participantIdentities.find(p => p.player.accountId === accountData.accountId)
      const participantData = matchData.participants.find(p => p.participantId === participantId);

      // format data
      const formattedData = {
        ...participantData,
        championName: findChampionById(participantData.championId),
        spell1Img: findSpellById(participantData.spell1Id),
        spell2Img: findSpellById(participantData.spell2Id),
        gameDuration: matchData.gameDuration
      }
  
      latestMatchesData.push(formattedData);
    }

    return res.success({ latestMatchesData });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;