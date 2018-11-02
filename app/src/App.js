import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './page/Login';
import Messenger from './page/Messenger';
import NotFound from './page/NotFound';
import Home from './page/Home';
import Message from './components/Message';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/messenger/:id' component={Home} />
            <Route path='' component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
