import selectExpensesTotal from '../../selectors/selectExpensesTotal';

import expenses from '../fixtures/expenses';

test('should return 0 if no expnses were passed' , () => {
  const result = selectExpensesTotal([]);
  expect(result).toBe(0);
});

//Always expecting an array ?

test('should account properly for a single expense.' , () => {
  const result = selectExpensesTotal([expenses[1]]);
  expect(result).toBe(expenses[1].amount);
});

test('should correctly add up multiple expenses' , () => {
  const result = selectExpensesTotal(expenses);
  expect(result).toBe(114195);
});

test('should throw an error if the passed item is not an array.' , () => {
  expect(() => selectExpensesTotal().toThrow('Expected an array to be passed'));
});