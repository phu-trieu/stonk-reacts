import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      searchResults: [],
      stockDetails: null,
      stockDetailsName: null,
      stockDetailsGif: null
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.stockDetails = this.stockDetails.bind(this);
    this.backToResults = this.backToResults.bind(this);
    this.backToHomepage = this.backToHomepage.bind(this);
  }

  componentDidMount() {
    fetch('https://api.giphy.com/v1/gifs/f6OakvYpFx3H0ShU3L?api_key=8RxFYU11Hi6cCjYEJuQipJJ9965BaHUT')
      .then(res => res.json())
      .then(json => {
        const { data } = json;
        this.setState({
          homepageGif: data
        })
      })
  }

  stockDetails(symbol, name) {
    this.setState({
      stockDetailsName: name
    })
    fetch(`http://api.marketstack.com/v1/eod?access_key=fb1fd1efa8b98380b5fee609590442a8&symbols=${symbol}&limit=10`)
      .then(res => res.json())
      .then(stock => {
        this.setState({
          stockDetails: stock.data
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
      searchResults: []
    })
  }

  formSubmit(searchQuery) {
    event.preventDefault();
    this.setState({
      homepageGif: null
    })
    fetch(`http://api.marketstack.com/v1/tickers?access_key=fb1fd1efa8b98380b5fee609590442a8&search=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          searchResults: data.data
        })
      })
  }

  checkState() {
    if (this.state.stockDetails) return <StockDetails details={this.state.stockDetails} name={this.state.stockDetailsName} gif={this.state.stockDetailsGif} backToResults={this.backToResults} />
    if (this.state.searchResults.length > 0) return <SearchResultList searchResults={this.state.searchResults} stockDetails={this.stockDetails} backToHomepage={this.backToHomepage} />
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
