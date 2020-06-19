import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import Homepage from './homepage';
import SearchResultList from './search-result-list';
import SearchResultListItem from './search-result-list-item';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageGif: null,
      searchBar: null,
      searchResults: [
        {
          currency: "EUR",
          name: "UpSnap Inc",
          price: null,
          stock_exchange_long: "Frankfurt Stock Exchange",
          stock_exchange_short: "FRX",
          symbol: "FCGN.F"
        },
        {
          currency: "USD",
          name: "Snap-on Incorporated",
          price: null,
          stock_exchange_long: "New York Stock Exchange",
          stock_exchange_short: "NYSE",
          symbol: "SNA"
        },
        {
          currency: "USD",
          name: "Snap Inc.",
          price: null,
          stock_exchange_long: "New York Stock Exchange",
          stock_exchange_short: "NYSE",
          symbol: "SNAP"
        },
        {
          currency: "EUR",
          name: "Snap-on Incorporated",
          price: null,
          stock_exchange_long: "Frankfurt Stock Exchange",
          stock_exchange_short: "FRX",
          symbol: "SPU.F"
        }
      ]
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
      .then(data => {
        this.setState({
          searchResults: data.data
        })
        console.log(data.data)
      })
  }

  checkState() {
    if (this.state.searchResults) return <SearchResultList searchResults={this.state.searchResults} />
    if (this.state.homepageGif) {
      return <Homepage gif={this.state.homepageGif} formSubmit={this.formSubmit} />
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
