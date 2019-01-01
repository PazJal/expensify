const promise = new Promise((resolve , reject) => {
  setTimeout(() => {
    // resolve('This is my resoloved data.');
    reject('Something went wrong!');
  } , 3000);
});

console.log('before');

promise.then((data) => {
  console.log(data);
}).catch((data) => {
  console.log(data);
});

console.log('after');