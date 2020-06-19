import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import Homepage from './homepage';
import SearchResultList from './search-result-list';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageGif: null,
      searchBar: null,
      searchResults: null
    }
    this.formSubmit = this.formSubmit.bind(this);
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

  formSubmit(searchQuery) {
    event.preventDefault();
    this.setState({
      searchBar: searchQuery
    })
    fetch(`https://api.worldtradingdata.com/api/v1/stock_search?search_term=${searchQuery}&limit=50&page=1&api_token=xNDJ3ejc00qEqA8clfkV7yA4qo2qCjD8WRLbVBIckWwoei2hiRkIyObMPAUm`)
      .then(res => res.json())
      .then(data => this.setState({
        searchResults: data.data
      }))
  }

  checkState() {
    // if (this.state.searchBar) {
    //   console.log('henlo')
    //   // return <SearchResultList searchResults={this.state.searchResults}/>
    // }
    if (this.state.homepageGif) {
      return <Homepage gif={this.state.homepageGif} formSubmit={this.formSubmit}/>
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
