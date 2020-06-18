import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import Homepage from './homepage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = null
  }

  render() {
    return (
      <div>
        <Header />
        <Homepage />
      </div>
    )
  }
}

export default App;
