/**
 * Created by jfhuang on 17/9/3.
 */

import React from 'react';
// import ReactDOM from 'react-dom';

class TodoList extends React.Component {
  render () {
    return (
      <div className="todo-list-box">
        <ul>
          <li>todo-001</li>
          <li>todo-002</li>
          <li>todo-003</li>
        </ul>
      </div>
    );
  }
}

export default TodoList;
