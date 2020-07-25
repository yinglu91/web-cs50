// in terminal, do
// node promise3.js

console.log('Script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

new Promise((resolve, reject) => {
  resolve('Promise 1 resolved');
}).then(res => console.log(res));

new Promise((resolve, reject) => {
  resolve('Promise 2 resolved');
})
  .then(res => {
    console.log(res);
    return new Promise((resolve, reject) => {
      resolve('Promise 3 resolved');
    });
  })
  .then(res => console.log(res));

console.log('Script End');
