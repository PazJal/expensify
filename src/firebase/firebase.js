import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyC7LmDYVOPPSZiAxY_OhOCcU5ckMfizFZs",
  authDomain: "expensify-4848e.firebaseapp.com",
  databaseURL: "https://expensify-4848e.firebaseio.com",
  projectId: "expensify-4848e",
  storageBucket: "expensify-4848e.appspot.com",
  messagingSenderId: "421651987100"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref().set({
  name: 'Paz Jal',
  age:30,
  isSingle: false,
  location: {
    city: 'haifa',
    country: 'israel'
  }
});

// database.ref().set('This is my data');

database.ref('age').set(27);
database.ref('location/city').set('Tel-Aviv');

database.ref('attributes').set({
  height: 175,
  weight: 190
});