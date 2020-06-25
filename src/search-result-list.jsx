import React, { Component } from 'react';
import SearchResultListItem from './search-result-list-item';

class SearchResultList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    const searchbar = document.getElementById('search2')
    this.setState({
      searchQuery: searchbar.value
    })
  }

  render() {
    const searchResults = this.props.searchResults;
    if (searchResults.length === 0) return (
      <h3 className="text-center mt-5">No results were found</h3>
    )
    return (
      <div>
        <form className="search-result-LI m-auto d-flex align-items-center" onSubmit={() => this.props.formSubmit(this.state.searchQuery)} >
          <span className="fas fa-search search-symbol mr-2"></span>
          <input
            type="text"
            className="w-25 text-body"
            id="search2"
            placeholder="e.g. SNAP"
            onChange={this.handleInputChange} />
        </form>
        <div className="mobile-switch">
          <div className="d-flex justify-content-between pt-4 search-result-LI m-auto">
            <div className="d-flex search-result-symbol justify-content-between row">
              <h4 className="m-0 col-sm-4 d-flex align-items-center font-weight-bold">Symbol</h4>
              <h4 className="m-0 col-sm-8 d-flex align-items-center font-weight-bold">Company Name</h4>
            </div>
            <div>
              <h4 className="m-auto font-weight-bold stock-ex-header">Stock Exchange</h4>
            </div>
          </div>
        </div>
        <hr className="thicc-border hr-mobile-switch" />
        <div id="search-results">
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
}

export default SearchResultList;
