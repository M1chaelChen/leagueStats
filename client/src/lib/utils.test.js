import { durationToTime, toKda } from './utils';

describe('test util functions', () => {
    it('converts duration to time', () => {
        expect(durationToTime(12345)).toBe('03:25:45');
        expect(durationToTime('54321')).toBe('15:05:21');
    });

    it('converts stats to KDA', () => {
        expect(toKda(10, 3, 5)).toBe("5.00");
        expect(toKda(13, 3, 7)).toBe("6.67");
        expect(toKda()).toBe("0.00");
    })
});
