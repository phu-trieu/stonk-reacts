import React, { Component } from 'react'

class SearchResultListItem extends Component {
  render() {
    const stockInfo = this.props;
    return (
      <div className="mt-3">
        <div className="d-flex justify-content-between search-result-LI m-auto">
          <div className="d-flex search-result-symbol justify-content-between row">
            <h5 className="m-0 col-sm-4 mobile-bold">{stockInfo.symbol}</h5>
            <h5 className="m-0 col-sm-8 d-flex align-items-center">{stockInfo.name}</h5>
          </div>
          <div>
            <h5 className="m-auto">{stockInfo.stockEx}</h5>
          </div>
        </div>
        <hr className="bg-white"/>
      </div>
    )
  }
}

export default SearchResultListItem;
