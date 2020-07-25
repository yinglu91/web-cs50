const second = () => {
  console.log('Hello there!');
};

const first = () => {
  console.log('Hi there!');
  second();
  console.log('The End');
};

first();
