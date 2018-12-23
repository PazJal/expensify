import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css/normalize.css'
import './styles/styles.scss';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.dispatch(addExpense({description : 'water bill' , amount : 100 , createdAt: -1000}));
store.dispatch(addExpense({description : 'gas bill' , amount : 100 , createdAt: 1000}));

store.dispatch(setTextFilter('water'));

const state = store.getState();

console.log("Results: " , getVisibleExpenses(state.expenses , state.filters ));

ReactDOM.render(<AppRouter /> , document.getElementById('app'));
