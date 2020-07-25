// in terminal, do
// node async.js

const networkRquest = () => {
  setTimeout(() => {
    console.log('Async Code');
  }, 2000);
};

console.log('Hello World');

networkRquest();

console.log('The End');
