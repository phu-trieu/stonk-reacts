import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    return (
      <div className="header py-2 mb-5">
        <div className="d-flex justify-content-between header-text-sizing m-auto">
          <div className="d-flex">
            <img className="logo mr-1" src="./images/trending_up-white-18dp.svg" alt=""/>
            <h2 className="my-auto">Stonk Reacts</h2>
          </div>
          <div>
            <img className="menu" src="/images/menu-white-18dp.svg" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
