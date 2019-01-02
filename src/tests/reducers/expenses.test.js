import expenseReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state' , () => {
  const state = expenseReducer(undefined , {type: '@@INIT'});
  expect(state).toEqual([]);
});

test('should remove expense by id' , () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  }

  const state = expenseReducer(expenses , action);
  expect(state).toEqual([expenses[0] , expenses[2]]);
});

test('should not remove expense if id not found' , () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  }
  const state = expenseReducer(expenses , action);
  expect(state).toEqual(expenses);
});

test('should add an expense' , () => {
  const expense = {
    id: '4',
    description: 'Cigs',
    note:'Bad for you',
    amount: 2000,
    createadAt: 0
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expenseReducer(expenses , action);
  expect(state).toEqual([...expenses , expense]);
});

test('should edit an existing expense' , () =>{
  const updates = {
    note: 'Updated note',
    amount: 9999
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: '3',
    updates
  }
  const state = expenseReducer(expenses , action);
  expect(state[2]).toEqual({
    ...expenses[2],
    ...updates
  });
});

test('should not edit expense if the id is not valid.' , () => {
  const updates = {
    note: 'Updated note',
    amount: 9999
  }
  const action = {
    type: 'EDIT_EXPENSE',
    id: '4',
    updates
  }
  const state = expenseReducer(expenses , action);
  expect(state).toEqual(expenses);
});

test('should set expenses' , () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses
  }
  const state = expenseReducer({hello:'Hello'} , action);
  expect(state).toEqual(expenses);
});