import React, { Component } from 'react';
import SearchResultListItem from './search-result-list-item';

class SearchResultList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: null,
      results: false
    }
  }

  componentDidMount() {
    const searchResults = this.props.searchResults;
    if (searchResults.length === 0) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=deserted&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifSet => {
          this.setState({
            gif: gifSet.data
          })
        })
    }
    this.setState({
      gif: true,
      results: true
    })
  }

  getRandomGif() {
    const gif = this.state.gif;
    const random = (Math.random() * 24).toFixed(0);
    return gif[random].images.fixed_height.url;
  }

  checkResults() {
    const searchResults = this.props.searchResults;
    if (searchResults.length === 0 && this.state.gif) return (
      <div>
        <h3 className="text-center mt-5">No results were found :&#40;</h3>
        <div className="d-flex justify-content-center my-5">
          <img src={this.getRandomGif()} alt="" className="stonks-gif" />
        </div>
      </div>
    )
    if (searchResults.length !== 0 && this.state.results) return (
      <div>
        <div className="mobile-switch">
          <div className="border-bottom border-light border-3 pb-3">
            <div className="d-flex justify-content-between w-95 pt-2 m-auto">
              <div className="d-flex search-result-symbol justify-content-between row">
                <h4 className="m-0 col-sm-4 d-flex align-items-center font-weight-bold">Symbol</h4>
                <h4 className="m-0 col-sm-8 d-flex align-items-center font-weight-bold">Company Name</h4>
              </div>
              <div>
                <h4 className="m-auto font-weight-bold stock-ex-header">Stock Exchange</h4>
              </div>
            </div>
          </div>
        </div>
        <div id="search-results" ref={div => { this.searchResultList = div }}>
          {
            searchResults.map(searchResult => {
              return (
                <SearchResultListItem
                  key={searchResult.name}
                  name={searchResult.name}
                  symbol={searchResult.symbol}
                  stockEx={searchResult.stock_exchange.acronym}
                  stockDetails={this.props.stockDetails}
                />
              )
            })
          }
        </div>
        <h3 className="text-center mt-5">End of results</h3>
      </div>
    )
  }

  render() {
    if (!this.state.gif) {
      return <h1 className="text-center pt-5">Loading...</h1>
    }
    return (
      <div>
        <div className="mx-auto mt-2 w-95">
          <div className="back-to-homepage fit-content">
            <h6 className="cursor-pointer" onClick={() => this.props.backToHomepage()}>
              &#8592; Back to homepage
            </h6>
            <div className="line"></div>
          </div>
        </div>
        {this.checkResults()}
      </div>
    )
  }
}

export default SearchResultList;
