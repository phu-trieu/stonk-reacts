import React, { Component } from 'react'

class SearchResultListItem extends Component {
  render() {
    return (
      <a href="#" className="text-decoration-none">
        <div className="sr-li py-3 cursor-pointer" onClick={() => this.props.getStockDetails(this.props.symbol, this.props.name)}>
          <div className="d-flex justify-content-between w-95 m-auto">
            <div className="d-flex search-result-symbol justify-content-between row">
              <h5 className="m-0 col-sm-5 mobile-bold">{this.props.symbol}</h5>
              <h5 className="m-0 col-sm-7 d-flex align-items-center">{this.props.name}</h5>
            </div>
            <div>
              <h5 className="m-auto">{this.props.stockEx}</h5>
            </div>
          </div>
        </div>
      </a>
    )
  }
}

export default SearchResultListItem;
