import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './header';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = null
  }

  render() {
    return (
      <Header />
    )
  }
}

export default App;
