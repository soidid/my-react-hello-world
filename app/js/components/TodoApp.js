/** @jsx React.DOM */
var React = require('react');
var TodoTextInput = require('./TodoTextInput');
var TodoList = require('./TodoList');
var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');

//取得目前的資料
function getTodoState() {
  return {
    allTodos: TodoStore.getAll()
  };
}

var TodoApp =
  React.createClass({

    getInitialState: function() {
      return getTodoState();
    },

    //把 view 註冊到 stores，當 store 有改變/emit change 的時候，用 _onChange 這個 callback 處理
    componentDidMount: function() {
      TodoStore.addChangeListener(this._onChange);
    },
  
    componentWillUnmount: function() {
      TodoStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
      this.setState(getTodoState());
    },

    _onDestroyCompltedClick: function() {
      TodoActions.destroy_completed();
    },
    
    render:function(){
      return (
          <div>
          <h1>TodoApp</h1>
          <TodoTextInput />
          <TodoList allTodos={this.state.allTodos}/>
          <div className="ClearComplete" 
               onClick={this._onDestroyCompltedClick}>Clear Complete</div>
          </div>
        )
    }
  });
module.exports = TodoApp;
