import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Util from './Util';
import Home from './components/Home';
import ListItem from './components/ListItem';
import Navigation from './components/Navigation';
import Form from './components/Form';


class App extends Component {

  logIn() {
    Util.login();
  }

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" render={() => <Home login={this.logIn} />} />
          <Route exact path="/draft/:id/:title" render={(match) => <ListItem match={match} />} />
          <Route exact path="/create" render={(match) => <Form match={match} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
