import { startAddExpense, addExpense , editExpense , 
  removeExpense, setExpenses, startSetExpenses, 
  startRemoveExpense , startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';

import database from '../../firebase/firebase';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const uid = 'SoMeFaKEuId';
const defaultAuthState = {
  auth: {
    uid
  }
}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({id , description , note , amount , createdAt}) => {
    expensesData[id] = {description , note , amount, createdAt}
  });
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object' , () => {
  const action = removeExpense({id: '123abc'});
  expect(action).toEqual({
    type:'REMOVE_EXPENSE',
    id:'123abc'
  });
});

test('should setup the edit expense action object' , () => {
  const action = editExpense('testID' ,{
    note: 'Test note value'
  });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'testID',
    updates: {
      note: 'Test note value'
    }
  });
});

test('should setup add expense action object with provided values.' , () => {
  const action = addExpense(expenses[1]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenses[1],
      id: expect.any(String)
    }
  });

});

test('should add expense to database and store' , (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });

});

test('should add expense with defaults to database and store' , (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefaults = {
      description: '' , 
      note: '' , 
      amount: 0 , 
      createdAt: 0
  }
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

test('should set up set expense action object with data' , () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch data from firebase' , (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should remove an expense from firebase' , (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({id})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
  }).then(() => {
    database.ref(`users/${uid}/expenses/${id}`).once('value').then((snapshot) => {
      expect(snapshot.val()).toBe(null);
      done();
    });
    
  });
});

test('should edit an existing expense on firebase' , (done) => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[1].id;
  const updates ={
    description: 'New description',
    note: 'new note',
    createdAt: 0,
    amount: 9999
  }
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`users/${uid}/expenses/${id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(updates);
    done();
  });
});