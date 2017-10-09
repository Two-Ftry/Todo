/**
 * Created by jfhuang on 17/10/9.
 */

import React, { Component } from 'react';
import indexedDBUtil from '../../db/indexedDBUtil';

const databaseName = 'my-record';
const storeName = 'record-item';


class SearchList extends Component {
  constructor (props) {
    super(props);
    this.state = {
        list: [],
        keywod: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount () {
    indexedDBUtil.getListByText(databaseName, storeName, 'name', '').then((data) => {
      this.setState({
        list: data
      });
    }, (event) => {
      console.log('event', event);
    })
  }
  render () {
    // 列表
    const list = [];
    this.state.list.forEach((item) => {
      list.push(<li key={item.id}>{item.name}</li>);
    });
    return (
      <div>
        <div>
          <input type="text" onChange={this.handleInputChange} value={this.keyword}/>
          <button type="button" onClick={this.handleClick}>查询</button>
        </div>
        <ul>
          {list}
        </ul>
      </div>
    );
  }

  handleInputChange (event) {
    this.setState({
      keyword: event.target.value
    });
  }

  handleClick () {
    indexedDBUtil.getListByText(databaseName, storeName, 'name', this.state.keyword).then((data) => {
      this.setState({
        list: data
      });
    }, (event) => {
      console.log('event', event);
    })
  }
}


export default SearchList;
