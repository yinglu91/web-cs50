// JavaScript - Lecture 5 - CS50's Web Programming with Python and JavaScript
// 33:00/1:47  Mar 6, 2018 CS50

document.addEventListener('DOMContentLoaded', function() {
  console.log('>>>>>test0');
  document.querySelector('button').onclick = count;
}); // 100 buttons to add click event - use case?

counter = 0;

function count() {
  console.log('>>>>>test1');
  counter++;
  document.querySelector('#counter').innerHTML = counter;

  if (counter % 10 === 0) {
    alert(`Counter is at ${counter}!`);
  }
}
