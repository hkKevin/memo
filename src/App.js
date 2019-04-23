import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import './App.css';
import Memos from './containers/Memos/Memos';
import FilteredMemos from './containers/FilteredMemos/FilteredMemos';

class App extends Component {
  
  render() {

    let routes = (
      <Switch>
        <Route path='/filtered' component={FilteredMemos} />
        <Route path='/' exact component={Memos} />
        <Redirect to='/' />
      </Switch>
    );



    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default withRouter(App);
