import formatCurrency from '../../../scripts/utils/money.js';

describe('moneyTest', () => {
    it('Rounds down', () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });
    it('Rounds up', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
    it('Handle negative', () => {
        expect(formatCurrency(-500)).toEqual('-5.00');
    })
});