import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import './App.css';
import Memos from './containers/Memos/Memos';
import FilteredMemos from './containers/FilteredMemos/FilteredMemos';
import ArchivedMemos from './containers/ArchivedMemos/ArchivedMemos';

class App extends Component {
  
  render() {

    let routes = (
      <Switch>
        <Route path='/memo/archive' component={ArchivedMemos} />
        <Route path='/memo/filter' component={FilteredMemos} />
        <Route path='/memo' exact component={Memos} />
        <Redirect to='/memo' />
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
