/** @jsx React.DOM */
var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList =
  React.createClass({
    
    render:function(){
      console.log(this.props.allTodos);
      var allTodos = this.props.allTodos;
      var todos = [];
      for (var key in allTodos) {
      	todos.push(<TodoItem key={key} item={allTodos[key]} />);
      }
      return (
          <div>
            <h1>All Todos</h1>
             {todos}
          </div>
        )
    }
  });
module.exports = TodoList;
