const leagueJs = require('../lib/league');
const { findChampionById, findRuneById, getLatestMatches, getTotalCreeps } = require('../lib/utils');

describe('test utility functions', () => {
    it('finds the target champion', () => {
        expect(findChampionById(84).name).toBe('Akali');
        expect(findChampionById(22).name).toBe('Ashe');
    });

    it('finds the target rune', () => {
        expect(findRuneById(8100)).toBe('perk-images/Styles/7200_Domination.png')
    });

    it('gets five latest matches', () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8];
        expect(getLatestMatches(array)).toHaveLength(5);
        expect(getLatestMatches(array)).toEqual([1, 2, 3, 4, 5]);
    });

    it('sum total creeps', () => {
        expect(getTotalCreeps(15, 35)).toBe(50);
    })
});

describe('test Riot APIs', () => {
    let accountId;
    it('fetch account data', async () => {
        expect.assertions(2);
        const accountData = await leagueJs.Summoner.gettingByName('M1chaelChen');
        expect(accountData).toBeDefined();
        expect(accountData.accountId).toBeDefined();

        accountId = accountData.accountId;
    });

    it('fetch match list', async () => {
        const matchList = await leagueJs.Match.gettingListByAccount(accountId);
        expect(matchList.matches.length).toBeTruthy();
    })
})