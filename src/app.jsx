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
      ],
      stockDetails: {
        "symbol": "SNAP",
        "name": "Snap Inc.",
        "currency": "USD",
        "price": 24.66,
        "price_open": 24.00,
        "day_high": 24.00,
        "day_low": 21.95,
        "52_week_high": 25.00,
        "52_week_low": 7.89,
        "day_change": 1.34,
        "change_pct": 20.00,
        "close_yesterday": null,
        "market_cap": null,
        "volume": null,
        "volume_avg": null,
        "shares": null,
        "stock_exchange_long": "New York Stock Exchange",
        "stock_exchange_short": "NYSE",
        "timezone": "EDT",
        "timezone_name": "America/New_York",
        "gmt_offset": "-14400",
        "last_trade_time": "N/A",
        "pe": null,
        "eps": null
      },
      stockDetailsGif: null
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.stockDetails = this.stockDetails.bind(this);
    this.backToResults = this.backToResults.bind(this);
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
        console.log(stock.data[0])
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
        <Header />
        {this.checkState()}
      </div>
    )
  }
}

export default App;
