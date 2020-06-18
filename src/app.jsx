import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import Homepage from './homepage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageGif: null
    }
  }

  componentDidMount() {
    fetch('https://api.giphy.com/v1/gifs/f6OakvYpFx3H0ShU3L?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A')
      .then(res => res.json())
      .then(json => {
        const { data } = json;
        this.setState({
          homepageGif: data
        })
      })
  }

  checkState() {
    if (this.state.homepageGif) {
      return <Homepage gif={this.state.homepageGif}/>
    }
    return <h2 className="text-center pt-5">Loading...</h2>
  }

  render() {
    return (
      <div>
        <Header />
        {this.checkState()}
      </div>
    )
  }
}

export default App;
