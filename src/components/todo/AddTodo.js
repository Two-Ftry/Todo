import React from 'react';

import indexedDBUtil from '../../db/indexedDBUtil';

const databaseName = 'my-record';
const storeName = 'record-item';

class AddTodo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render () {
        return (
            <div className="add-todo-box">
                <input type="text" onChange={this.handleChange} value={this.state.text}/>
                <button onClick={this.handleClick}>Add todo</button>
            </div>
        );
    }

    handleClick () {
        this.props.handleAddTodo && this.props.handleAddTodo(this.state.text);
        indexedDBUtil.add(databaseName, storeName, {
          id: Date.now() + '',
          name: this.state.text
        }, 'id');
        // indexedDBUtil.getListByText(databaseName, storeName, 'name', '1').then((data) => {
        //   console.log('@@data@@', data);
        // }, (event) => {
        //   console.log('event', event);
        //   alert('error on getListByText')
        // })
        this.clear();
    }

    handleChange (e) {
        this.setState({
            text: e.target.value
        });
    }

    clear () {
        this.setState({
            text: ''
        });
    }
}

export default AddTodo;
