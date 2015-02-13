var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
/**
 * 這是一個 singleton 物件
 */
var TodoActions = {

  create: function(text) {

    //定義每個 action 要送出去的資料
    AppDispatcher.dispatch({

      //actionType 要和 TodoContants 定義的一致
      actionType: TodoConstants.TODO_CREATE,
      //如果需要其他資料就寫在這裡
      text: text
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY,
      id: id
    });
  },

  destroy_completed: function() {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_DESTROY_COMPLETED
    });
  },

  toggle_complete: function(item) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_TOGGLE_COMPLETE,
      item: item
    });
  }

};

module.exports = TodoActions;
