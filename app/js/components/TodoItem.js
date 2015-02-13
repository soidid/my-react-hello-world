/** @jsx React.DOM */
var React = require('react');
var TodoActions = require('../actions/TodoActions');

var TodoItem =
  React.createClass({

    _onDestroyClick: function() {
      TodoActions.destroy(this.props.item.id);
    },

    _onToggleCompleteClick: function() {
      TodoActions.toggle_complete(this.props.item);
    },

    render:function(){
      //如果寫 onClick={TodoActions.destroy(this.props.item.id)}
      //會出現以下錯誤訊息
      //Uncaught Error: Invariant Violation: replaceState(...): Cannot update during an existing state transition (such as within `render`).
      //This could potentially cause an infinite loop so it is forbidden.

      //寫在 onClick 裡，和寫在 render 的意思很不一樣
      //在 onClick 的話實際上類似  onClick=function () { TodoActions.destroy(this.props.item.id) }
      //寫在 render，意思是 render 的時候就要執行 TodoActions.destroy()，
      //只會執行一次，然後並且把結果接在 onClick event listener
      
      var doneClass = this.props.item.complete? "TodoItem TodoItem--done" : "TodoItem";
      var doneText = this.props.item.complete? "undo" : "done";
      return (
          <div className={doneClass}>
            {this.props.item.text}
            <div className="TodoItem-buttonSection">
              <button className="TodoItem-button"
                      onClick={this._onToggleCompleteClick}>{doneText}</button>
              <button className="TodoItem-button"
                      onClick={this._onDestroyClick}>delete</button>
            </div>
          </div>
        )
    }
  });
module.exports = TodoItem;
