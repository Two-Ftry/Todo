import React from 'react';

class TodoItem extends React.Component {
    render () {
        const todo = this.props.todoItem;
        const styleObj = {};
        styleObj['textDecoration'] = todo.isCompleted ? 'line-through' : '';
        styleObj['cursor'] = 'pointer';
        return (
            <li data-id={todo.id} data-iscompleted={todo.isCompleted}
                style={styleObj}
            >{todo.name}</li>
        );
    }
}

export default TodoItem;