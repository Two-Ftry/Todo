/**
 * Created by jfhuang on 17/9/3.
 */

import { connect } from 'react-redux';
import TodoList from './TodoList';

function getVisibleTodos (todos, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
      break;
    case 'COMPLETED':
      return todos.map((todo) => {
        if (todo.isCompleted) {
          return todo;
        } else {
          return undefined;
        }
      });
      break;
    case 'ACTIVE':
      return todos.map((todo) => {
        if (!todo.isCompleted) {
          return todo;
        } else {
          return undefined;
        }
      });
      break;
    default:
      return todos;
  }
}

const mapStateToProps = (todos, filter) => {
  return {
    todos: getVisibleTodos(todos, filter)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      // todo dispath an action
    }
  };
}

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
