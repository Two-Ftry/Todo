/**
 * Created by jfhuang on 17/9/3.
 */

import { connect } from 'react-redux';
import TodoList from './TodoList';

import * as todoAction from '../../actions/todoAction';

function getVisibleTodos (todos, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'COMPLETED':
      const completedTodos = todos.filter((todo) => {
        return todo.isCompleted;
      });
      return completedTodos;
    case 'ACTIVE':
      const activeTodos = todos.filter((todo) => {
        return !todo.isCompleted;
      });
      return activeTodos;
    default:
      return todos;
  }
}

const mapStateToProps = (store) => {
  return {
    todos: getVisibleTodos(store.todos, store.visibleFilter)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToSetCompleted: ({id, isCompleted}) => {
      dispatch(todoAction.setCompleted({id, isCompleted}));
    }
  };
}

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
