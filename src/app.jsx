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
        "52_week_high": null,
        "52_week_low": null,
        change_pct: null,
        close_yesterday: null,
        currency: "EUR",
        day_change: null,
        day_high: null,
        day_low: null,
        eps: null,
        gmt_offset: "3600",
        last_trade_time: "N/A",
        market_cap: null,
        name: "UpSnap Inc",
        pe: null,
        price: null,
        price_open: null,
        shares: null,
        stock_exchange_long: "Frankfurt Stock Exchange",
        stock_exchange_short: "FRX",
        symbol: "FCGN.F",
        timezone: "CET",
        timezone_name: "Europe/Berlin",
        volume: null,
        volume_avg: null
      },
      stockDetailsGif: null
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.stockDetails = this.stockDetails.bind(this);
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
        console.log(stock.data)
        this.setState({
          stockDetails: stock.data
        })
        const sd = this.state.stockDetails;
        if (!sd.price) {
          console.log('henlooo')
          return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=error&limit=25&offset=0&rating=G&lang=en')
            .then(res => res.json())
            .then(gifs => {
              this.setState({
                stockDetailsGif: gifs.data
              })
            })
        }
        if (sd.change_pct < 5) {
          return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=so so&limit=25&offset=0&rating=G&lang=en')
            .then(res => res.json())
            .then(gifs => {
              this.setState({
                stockDetailsGif: gifs.data
              })
            })
        }
        if (sd.change_pct > 5 && sd.change_pct < 20 && sd.price < sd.price_open) {
          return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=worried&limit=25&offset=0&rating=G&lang=en')
            .then(res => res.json())
            .then(gifs => {
              this.setState({
                stockDetailsGif: gifs.data
              })
            })
        }
        if (sd.change_pct > 5 && sd.change_pct < 20 && sd.price > sd.price_open) {
          return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=looking good&limit=25&offset=0&rating=G&lang=en')
            .then(res => res.json())
            .then(gifs => {
              this.setState({
                stockDetailsGif: gifs.data
              })
            })
        }
        if (sd.change_pct > 20 && sd.price < sd.price_open) {
          return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=building collapse&limit=25&offset=0&rating=G&lang=en')
            .then(res => res.json())
            .then(gifs => {
              this.setState({
                stockDetailsGif: gifs.data
              })
            })
        }
        if (sd.change_pct > 20 && sd.price > sd.price_open) {
          return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=liftoff&limit=25&offset=0&rating=G&lang=en')
            .then(res => res.json())
            .then(gifs => {
              this.setState({
                stockDetailsGif: gifs.data
              })
            })
        }
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
    // if (this.state.stockDetails) return <StockDetails details={this.state.stockDetails}/>
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
