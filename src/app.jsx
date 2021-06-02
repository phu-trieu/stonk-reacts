import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Homepage from './homepage';
import SearchResultList from './search-result-list';
import SearchResultListItem from './search-result-list-item';
import StockDetails from './stock-details';
import Giphy from './giphy';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageGif: {},
      searchResults: [],
      stockDetails: [],
      stockDetailsName: '',
      stockDetailsGif: null
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.getStockDetails = this.getStockDetails.bind(this);
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

  getStockDetails(symbol, name) {
    fetch(`https://api.marketstack.com/v1/eod?access_key=fb1fd1efa8b98380b5fee609590442a8&symbols=${symbol}&limit=10`)
      .then(res => res.json())
      .then(stock => {
        this.setState({
          stockDetails: stock.data,
          stockDetailsName: name
        })
      })
  }

  backToResults() {
    this.setState({
      stockDetails: [],
      stockDetailsName: ''
    })
  }

  backToHomepage() {
    this.setState({
      stockDetails: [],
      homepageGif: {
        images: {
          fixed_height: {
            url: "https://media3.giphy.com/media/f6OakvYpFx3H0ShU3L/200.gif?cid=cbd8912dea645a680512f51ec4ad2153f9b067cb15fcdca7&rid=200.gif"
          }
        }
      },
      searchResults: [],
      stockDetailsName: ''
    })
  }

  formSubmit(searchQuery) {
    event.preventDefault();
    this.setState({
      homepageGif: {}
    })
    fetch(`https://api.marketstack.com/v1/tickers?access_key=fb1fd1efa8b98380b5fee609590442a8&search=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          searchResults: data.data
        })
      })
  }

  checkState() {
    if (this.state.stockDetailsName) return <StockDetails details={this.state.stockDetails} stockDetailsName={this.state.stockDetailsName} backToResults={this.backToResults} />
    if (this.state.searchResults.length) return <SearchResultList searchResults={this.state.searchResults} getStockDetails={this.getStockDetails} backToHomepage={this.backToHomepage} />
    if (Object.keys(this.state.homepageGif).length) {
      return <Homepage gif={this.state.homepageGif} formSubmit={this.formSubmit} />
    }
    return <h1 className="text-center pt-5">Loading...</h1>
  }

  render() {
    return (
      <div>
        <Header backToHomepage={this.backToHomepage} />
        {this.checkState()}
        <Giphy />
      </div>
    )
  }
}

export default App;
