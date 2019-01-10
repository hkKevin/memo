import React, { Component } from 'react';

import './App.css';
import Memos from './containers/Memos';

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <Memos />
      </div>
    );
  }
}

export default App;
