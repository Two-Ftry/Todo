/**
 * Created by jfhuang on 17/9/3.
 */

import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  render () {
    const list = this.props.todos.map((item) => {
      // return (<li key={item.id} data-id={item.id} >{item.name}</li>);
      return (<TodoItem key={item.id} todoItem={item} />);
    });
    return (
      <div className="todo-list-box">
        <ul onClick={this.handleItemClick}>
          {list}
        </ul>
      </div>
    );
  }

  handleItemClick = (e) => {
    const data = e.target.dataset;
    this.props.onToSetCompleted({
      id: data.id,
      isCompleted: !(data.iscompleted === 'true')
    });
  }

}

export default TodoList;
