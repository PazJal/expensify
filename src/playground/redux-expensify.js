import { createStore , combineReducers } from 'redux';

const demoState  = {
  expenses : [{
    id: '1234123412',
    description: 'Test desc',
    note: 'This is some more information.',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'more',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
};