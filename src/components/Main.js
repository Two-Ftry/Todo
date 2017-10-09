require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import VisibleAddTodo from './todo/VisibleAddTodo';
import VisibleTodoList from './todo/VisibleTodoList';
import VisibleFilter from './todo/VisibleFiler';
import Clock from './Clock';
import SearchList from './search/SearchList';

class AppComponent extends React.Component {
  render () {
    return (
      <div className="index">
        <VisibleAddTodo />
        <VisibleTodoList />
        <VisibleFilter />
        <Clock />
        <SearchList />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
