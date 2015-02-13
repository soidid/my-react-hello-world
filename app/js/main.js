/** @jsx React.DOM */
var TodoApp = require('./components/TodoApp');
var React = require('react');

React.renderComponent(
  <TodoApp />,
  document.getElementById('main'));