import React, { Component } from 'react';

class StockDetails extends Component {
  render() {
    const details = this.props.details;
    return (
      <div>
        <div className="d-flex justify-content-between mt-3 search-result-LI mx-auto">
          <div>
            <h1>SNAP</h1>
          </div>
          <div className="d-flex">
            <img src="/images/trending_down-white-18dp.svg" alt="" className="menu"/>
            <h1 className="ml-1">$11.06</h1>
          </div>
        </div>
        <div className="search-result-LI d-flex m-auto">
          <h3>Snap Inc.</h3>
        </div>
        <img src="" alt=""/>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }
}

export default StockDetails;
