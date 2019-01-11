import React, { Component } from 'react';

import './App.css';
import Memos from './containers/Memos';
import Header from './components/Header/Header';

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <Header />
        <Memos />
      </div>
    );
  }
}

export default App;
