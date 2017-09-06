require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Picker from './Picker';
import Posts from './Posts';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <Picker />
        <Posts />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
