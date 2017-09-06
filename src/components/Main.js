require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import VisibleAddTodo from './todo/VisibleAddTodo';
import VisibleTodoList from './todo/VisibleTodoList';
import VisibleFilter from './todo/VisibleFiler';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <VisibleAddTodo />
        <VisibleTodoList />
        <VisibleFilter />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
