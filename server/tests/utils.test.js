const { findChampionById, findRuneById } = require('../lib/utils');

describe('test utility functions', () => {
    it('finds the target champion', () => {
        expect(findChampionById(84).name).toBe('Akali');
        expect(findChampionById(22).name).toBe('Ashe');
    });

    it('finds the target rune', () => {
        expect(findRuneById(8100)).toBe('perk-images/Styles/7200_Domination.png')
    })
});