//把所有的 action 放在 constants
module.exports = {
  TODO_CREATE: 'TODO_CREATE',
  TODO_COMPLETE: 'TODO_TOGGLE_COMPLETE',
  TODO_DESTROY: 'TODO_DESTROY',
  TODO_DESTROY_COMPLETED: 'TODO_DESTROY_COMPLETED'
};


/* 
   另外一種做法，使用 keyMirror 

var keyMirror = require('keymirror');
// Constructs an enumeration with keys equal to their value.
// 也就是讓 hash 的 key 與 value 值一樣
// 不然原本 value 都是 null
// 不過既然如此，為何不乾脆用 set 之類只有key 的就好

module.exports = keyMirror({
  TODO_CREATE: null,
  TODO_COMPLETE: null,
  TODO_DESTROY: null 
});

*/
