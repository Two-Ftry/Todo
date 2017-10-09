import React from 'react';

import indexedDBUtil from '../../db/indexedDBUtil';

const databaseName = 'my-record';
const storeName = 'record-item';

class AddTodo extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            text: '',
          duration: 0,
          date: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.clear = this.clear.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentWillMount () {
      let date = '';
      const d = new Date();
      date += d.getFullYear();
      date += '-';
      date += (d.getMonth() + 1);
      date += '-';
      date += d.getDate();
      this.setState({
        date: date
      });
    }

    render () {
        return (
            <div className="add-todo-box">
              <label htmlFor="">名称:</label>
              <input type="text" onChange={this.handleChange} value={this.state.text}/>
              <br />
              <label htmlFor="">时长(分钟):</label>
              <input type="text" onChange={this.handleDurationChange} value={this.state.duration}/>
              <br />
              <label htmlFor="">日期:</label>
              <input type="text" onChange={this.handleDateChange} value={this.state.date}/>
              <br />
                <button onClick={this.handleClick}>Add todo</button>
            </div>
        );
    }

    handleClick () {
        this.props.handleAddTodo && this.props.handleAddTodo(this.state.text);
        indexedDBUtil.add(databaseName, storeName, {
          id: Date.now() + '',
          name: this.state.text,
          duration: this.state.duration,
          date: this.state.date,
          startTime: -1,
          endTime: -1,
          isCompleted: false,
          remark: ''
        }, 'id');
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

  handleDurationChange (e) {
    if (isNaN(e.target.value)) {
      alert('请输入数字')
      return;
    }
    let val = parseFloat(e.target.value);
    this.setState({
      duration: val
    });
  }

  handleDateChange (e) {
    this.setState({
      date: e.target.value
    });
  }
}

export default AddTodo;
