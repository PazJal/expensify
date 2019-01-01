import * as firebase from 'firebase';
import moment from 'moment';

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

database.ref('expenses').on('child_removed' , (snapshot) => {
  console.log(snapshot.key , snapshot.val());
});

database.ref('expenses').on('child_changed' , (snapshot) => {
  console.log('changed', snapshot.key , snapshot.val());
});

database.ref('expenses').on('child_added' , (snapshot) => {
  console.log('added', snapshot.key , snapshot.val());
});


// database.ref('expenses').on('value' , (snapshot) => {
//   const expenses = [];
//   snapshot.forEach((childSnap) => {
//     expenses.push({
//       id: childSnap.key,
//       ...childSnap.val()
//     });
//   });
//   console.log(expenses);
// });



// database.ref('expenses').push({
//   id: '1',
//   description: 'Gum',
//   note: '',
//   amount: 195,
//   createdAt: 0
// });

// database.ref('expenses').push({
//   id: '2',
//   description: 'Rent',
//   note: '',
//   amount: 109500,
//   createdAt: moment(0).subtract(3, 'days').valueOf()
// });

// database.ref('expenses').push({
//   id: '3',
//   description: 'Credit Card',
//   note: '',
//   amount: 4500,
//   createdAt: moment(0).add(4, 'days').valueOf()
// });

// database.ref('notes').push({
//   title: 'Coures Topics',
//   body: 'React coures for Native.'
// });

// const firebaseNotes = {
//   notes: {

//   }
// }

// const notes = [{
//   id: '12',
//   body:'this is my note',
//   title: 'First note'
// },
// {
//   id: '13',
//   body:'this is some  note',
//   title: 'Second note'
// }];

// database.ref('notes').set(notes);



// database.ref().on('value' , (snapshot) => {
//   const data = snapshot.val();
//   console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`);
// } , (e) => {
//   console.log('An error has occured.' , e);
// });


// const onValueChange = database.ref().on('value' , (snapshot) => {
//   console.log('snap', snapshot.val());
// } , (e) => {
//   console.log('Error with data fetching.' ,e);
// });

// setTimeout(() => {
//   database.ref('age').set(27);
// }, 3500);

// setTimeout(() => {
//   database.ref().off(onValueChange);
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(29);
// }, 10500);
// database.ref('location/city').once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch((err) => {
//     console.log('Error: ', err);
//   });

// database.ref().set({
//   name: 'Paz Jal',
//   age:30,
//   stressLevel: 7,
//   job: {
//     title: 'developer',
//     company: 'Google'
//   },
//   location: {
//     city: 'haifa',
//     country: 'israel'
//   }
// }).then(() => {
//   console.log('Data was saved.');
// }).catch((e) => {
//   console.log('This failed' , e);
// });

// database.ref().update({
//   stressLevel: 9,
//   'job/company' : 'Amazon',
//   'location/city' : 'Seatlle' 
// }); 

// database.ref('isSingle').set(null);

// database.ref().remove().then(() => {
//   console.log('isSingle was removed.');
// }).catch(() => {
//   console.log('isSingle was not removed.');
// });