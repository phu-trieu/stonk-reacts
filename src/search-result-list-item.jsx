import React, { Component } from 'react'

class SearchResultListItem extends Component {
  // async getStockDetails() {
  //   await this.props.getStockDetails(this.props.symbol, this.props.name);
  //   this.props.checkForData();
  // }

  render() {
    return (
      <div className="sr-li py-3 cursor-pointer" onClick={this.props.getStockDetails}>
        <div className="d-flex justify-content-between w-95 m-auto">
          <div className="d-flex search-result-symbol justify-content-between row">
            <h5 className="m-0 col-sm-4 mobile-bold">{this.props.symbol}</h5>
            <h5 className="m-0 col-sm-8 d-flex align-items-center">{this.props.name}</h5>
          </div>
          <div>
            <h5 className="m-auto">{this.props.stockEx}</h5>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchResultListItem;
