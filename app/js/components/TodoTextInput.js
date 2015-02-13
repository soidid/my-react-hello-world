/** @jsx React.DOM */
var React = require('react');

var TodoActions = require('../actions/TodoActions');

var TodoTextInput =
    React.createClass({
    
    getInitialState:function(){
        return {
            text:""
        }
    },
    _onChange:function(event){
    	/*
    	  取得 input 的輸入值得方式有幾種

    	  第一種：透過 event.target 取得值
    	  event.target.value

    	  第二種：透過 refs 取得值
    	  this.refs.textInput.getDOMNode().value
    	  
    	  第三種：透過 id 或 class 取得，用 js 或 jQuery 的方式去抓
    	  例如 Jeremy 的範例是在 componet mount 之後，綁定
    	  componentDidMount: function(){
      		this.$input = $('#todo-input');
  		  }
    	  
        */	
        this.setState({
        	text: event.target.value
        });
    },
    _onSave:function(event){
        TodoActions.create(this.state.text);
        this.setState({
        	text: ""
        });
    },
    render:function(){
    	/*
    	  對應上述方式，input 長相：

    	  第一種 <input onChange={this._onChange}/>
          第二種 <input ref="textInput" onChange={this._onChange}/>
          第三種 <input id="todo-input" ref="textInput" onChange={this._onChange}/>
    	*/

        return (
      	  <div>
          	<input onChange={this._onChange}
          	       value={this.state.text}/>
          	<button onClick={this._onSave}>Add</button>
          	<div className="TodoInput-preview">Your input: {this.state.text}</div>
          </div>
        )
    }

  });
module.exports = TodoTextInput;