import React, { Component } from 'react';
import SearchResultListItem from './search-result-list-item';

class SearchResultList extends Component {
  constructor(props) {
    super(props);
    this.state = null
  }

  render() {
    const searchResults = this.props.searchResults;
    if (searchResults.length === 0) return (
      <h3 className="text-center mt-5">No results were found</h3>
    )
    return (
      <div>
        <div className="mx-auto mt-2 search-result-LI">
          <h6 className="fit-content cursor-pointer" onClick={() => this.props.backToHomepage()}>
            &#8592; Back to homepage
          </h6>
        </div>
        <div className="mobile-switch">
          <div className="d-flex justify-content-between pt-2 search-result-LI m-auto">
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
}

export default SearchResultList;
