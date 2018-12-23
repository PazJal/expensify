import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

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

setTimeout(() => {
  store.dispatch(setTextFilter('bill'));
} , 3000);

const state = store.getState();

console.log("Results: " , getVisibleExpenses(state.expenses , state.filters ));

const jsx = (

  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx , document.getElementById('app'));
