import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './header';
import Homepage from './homepage';
import SearchResultList from './search-result-list';
import SearchResultListItem from './search-result-list-item';
import StockDetails from './stock-details';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageGif: null,
      searchBar: null,
      searchResults: null,
      stockDetails: null,
      stockDetailsGif: null
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.stockDetails = this.stockDetails.bind(this);
    this.backToResults = this.backToResults.bind(this);
    this.backToHomepage = this.backToHomepage.bind(this);
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

  stockDetails(symbol) {
    fetch(`https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=xNDJ3ejc00qEqA8clfkV7yA4qo2qCjD8WRLbVBIckWwoei2hiRkIyObMPAUm`)
      .then(res => res.json())
      .then(stock => {
        this.setState({
          stockDetails: stock.data[0]
        })
      })
  }

  backToResults() {
    this.setState({
      stockDetails: null,
      stockDetailsGif: null
    })
  }

  backToHomepage() {
    this.setState({
      stockDetails: null,
      stockDetailsGif: null,
      searchResults: null
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
      })
  }

  checkState() {
    if (this.state.stockDetails) return <StockDetails details={this.state.stockDetails} gif={this.state.stockDetailsGif} backToResults={this.backToResults} />
    if (this.state.searchResults) return <SearchResultList searchResults={this.state.searchResults} stockDetails={this.stockDetails} />
    if (this.state.homepageGif) {
      return <Homepage gif={this.state.homepageGif} formSubmit={this.formSubmit} />
    }
    return <h2 className="text-center pt-5">Loading...</h2>
  }

  render() {
    return (
      <div>
        <Header backToHomepage={this.backToHomepage} />
        {this.checkState()}
      </div>
    )
  }
}

export default App;
