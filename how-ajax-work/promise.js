// in terminal, do
// node promise.js

console.log('Script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

new Promise((resolve, reject) => {
  resolve('Promise resolved');
})
  .then(res => console.log(res))
  .catch(err => console.log(err));

console.log('Script End');
