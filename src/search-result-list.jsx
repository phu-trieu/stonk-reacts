import React, { Component } from 'react';
import SearchResultListItem from './search-result-list-item';

class SearchResultList extends Component {
  constructor(props) {
    super(props);
    this.state = null
  }

  render() {
    const searchResults = this.props.searchResults
    return (
      <div>
        <div className="mobile-switch">
          <div className="d-flex justify-content-between pt-3 search-result-LI m-auto">
            <div className="d-flex search-result-symbol justify-content-between row">
              <h4 className="m-0 col-sm-4 d-flex align-items-center font-weight-bold">Symbol</h4>
              <h4 className="m-0 col-sm-8 d-flex align-items-center font-weight-bold">Company Name</h4>
            </div>
            <div>
              <h4 className="m-auto font-weight-bold stock-ex-header">Stock Exchange</h4>
            </div>
          </div>
        </div>
        <hr className="thicc-border hr-mobile-switch"/>
        {
          searchResults.map(searchResult => {
            return (
              <SearchResultListItem
                key={searchResult.name}
                name={searchResult.name}
                symbol={searchResult.symbol}
                stockEx={searchResult.stock_exchange_short}
                price={searchResult.price}
                stockDetails={this.props.stockDetails}
              />
            )
          })
        }
        <h3 className="text-center mt-5">End of Results</h3>
      </div>
    )
  }
}

export default SearchResultList;
