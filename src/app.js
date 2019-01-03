import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'normalize.css/normalize.css'
import './styles/styles.scss';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import AppRouter , {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
import {firebase} from './firebase/firebase';
import {login , logout} from './actions/auth';


const store = configureStore();

// store.dispatch(addExpense({description : 'water bill' , amount : 4500 }));
// store.dispatch(addExpense({description : 'gas bill'  , createdAt: 1000}));
// store.dispatch(addExpense({description : 'Rent' , amount : 109500}));

const jsx = (

  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if(!hasRendered){
    ReactDOM.render(jsx , document.getElementById('app'));
    hasRendered = true;
  }
}

ReactDOM.render(<p>Loading...</p> , document.getElementById('app'));



firebase.auth().onAuthStateChanged((user) => {
  if(user){
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
    });
    if(history.location.pathname === '/'){
      history.push('/dashboard');
    }

  }
  else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});