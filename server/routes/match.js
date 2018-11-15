const express = require('express');

const leagueJs = require('../lib/league');
const { findChampionById, findSpellById, findRuneById, getLatestMatches, getTotalCreeps } = require('../lib/utils');
const router = express.Router();

router.get('/history/:accountName', async (req, res, next) => {
  try {
    const { accountName } = req.params;
    // get account data
    const accountData = await leagueJs.Summoner.gettingByName(accountName);

    // get match list by accountId
    const matchList = await leagueJs.Match.gettingListByAccount(accountData.accountId);

    const latestMatches = getLatestMatches(matchList);

    // get match data from latestMatches
    const latestMatchesData = [];

    for (let match of latestMatches) {
      const matchData = await leagueJs.Match.gettingById(match.gameId)
      const matchTimelineData = await leagueJs.Match.gettingTimelineById(match.gameId)

      // find user's participant data
      const { participantId } = matchData.participantIdentities
        .find(p => p.player.accountId === accountData.accountId)
      const participantData = matchData.participants
        .find(p => p.participantId === participantId);

      // find user's timeline data then calculate total creeps
      const { minionsKilled, jungleMinionsKilled } = matchTimelineData.frames
        .map(f => f.participantFrames[participantId])
        .pop();

      const totalCreeps = getTotalCreeps(minionsKilled, jungleMinionsKilled);

      // find champion data
      const championData = findChampionById(participantData.championId);

      // format data
      const formattedData = {
        ...participantData,
        championName: championData.name,
        championImg: championData.image.full,
        spell1Img: findSpellById(participantData.spell1Id),
        spell2Img: findSpellById(participantData.spell2Id),
        primaryRune: findRuneById(participantData.stats.perkPrimaryStyle),
        secondaryRune: findRuneById(participantData.stats.perkSubStyle),
        gameDuration: matchData.gameDuration,
        totalCreeps
      }
  
      latestMatchesData.push(formattedData);
    }

    return res.success({ latestMatchesData });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;