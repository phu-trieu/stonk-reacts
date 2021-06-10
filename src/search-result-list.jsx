import React, { Component } from 'react';
import SearchResultListItem from './search-result-list-item';

class SearchResultList extends Component {
  render() {
    const searchResults = this.props.searchResults;
    return (
      <div>
        <a href="#" className="w-95 text-decoration-none">
          <div className="back-to-homepage fit-content ms-3">
            <h6 className="cursor-pointer" onClick={() => this.props.backToHomepage()}>
              &#8592; Back to homepage
            </h6>
            <div className="line"></div>
          </div>
        </a>
        <div>
          <div className="mobile-switch">
            <div className="border-bottom border-light border-3 pb-3">
              <div className="d-flex justify-content-between w-95 pt-2 m-auto">
                <div className="d-flex search-result-symbol justify-content-between row">
                  <h4 className="m-0 col-sm-4 d-flex align-items-center font-weight-bold">Symbol</h4>
                  <h4 className="m-0 col-sm-8 d-flex align-items-center font-weight-bold">Company Name</h4>
                </div>
                <div>
                  <h4 className="m-auto font-weight-bold text-end">Stock Exchange</h4>
                </div>
              </div>
            </div>
          </div>
          <div id="search-results" ref={div => { this.searchResultList = div }}>
            {
              searchResults.map((searchResult, index) => {
                return (
                  <SearchResultListItem
                    key={index}
                    name={searchResult.name}
                    symbol={searchResult.symbol}
                    stockEx={searchResult.stock_exchange.acronym}
                    stockDetails={this.props.stockDetails}
                    getStockDetails={this.props.getStockDetails}
                    checkForData={this.props.checkForData}
                  />
                )
              })
            }
          </div>
          <h3 className="text-center mt-5">End of results</h3>
        </div>
      </div>
    )
  }
}

export default SearchResultList;
