import { formatCurrency } from '../../scripts/utils/money.js';

describe ('formatCurrency', () => {
   it ('Normal cents to dollars', () => {
      expect (formatCurrency(2095)).toEqual('20.95');
   });
   it ('Work with zero', () => {
      expect (formatCurrency(0)).toEqual('0.00');
   });
   it ('Rounded cents before conversion', () => {
      expect (formatCurrency(2000.5)).toEqual('20.01');
   });
});