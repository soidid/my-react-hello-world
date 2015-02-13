// Store 是資料改變的地方，single source of truth，指的就是所有的狀態都應該被保存在 store
var AppDispatcher = require('../dispatcher/AppDispatcher');

// 需要 dispatcher，因為 dispatcher 廣播不同的東西，store 必須 reigster 並且決定如何處理
var TodoConstants = require('../constants/TodoConstants');

// 因為 store 改變之後要通知 view，所以需要有廣播的能力
var EventEmitter = require('events').EventEmitter;

// 讓 store 繼承 EventEmitter 一樣有幾種不同寫法，merge, assign 或是 jQuery 的 .$extend
var merge = require('react/lib/merge');
var assign = require('object-assign');

// store 改變之後廣播出去的內容
var CHANGE_EVENT = 'change';


// Store 分成三個大部分：private, public, register self

//========================================================================
//
// Private vars & method

// 定義 store 需要的變數和 method，外界看不到
// 現在只有新增 & 刪除

var _todos = {};

function _create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _todos[id]={
    id: id,
    complete: false,
    text: text
  };
}

//利用 assign 做部分 update
//updates 為需要更新的部分, {key: value}
//assign (target, ...sources)
function _update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

function _destroy(id) {
  delete _todos[id]
}

function _destroyCompleted() {
  for(var key in _todos){
    if(_todos[key].complete)
        delete _todos[key];
  }
 
}

//========================================================================
//
// Public API 外界可以呼叫的方法

var TodoStore = merge(EventEmitter.prototype, {
// assign 的寫法
// var TodoStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _todos;
  },
  
  //為什麼這個要定義成 public ?
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

//========================================================================
//
// event handlers

/**
 * 向 Dispatcher 註冊自已，才能偵聽到系統發出的事件
 */

AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        //用 private 方法處理，更新資料/真理
        _create(text);
      }
      //處理好之後廣播處去，讓 view 可以更新
      TodoStore.emitChange();
      break;
    
    case TodoConstants.TODO_DESTROY:
      _destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      _destroyCompleted();
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE:
      //console.log(action.item);
      _update(action.item.id, {complete: !action.item.complete});
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TodoStore;
