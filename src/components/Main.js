require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import TodoList from './todo/TodoList';

// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <TodoList />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
