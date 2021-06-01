import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    return (
      <header className="py-2 mb-3">
        <div className="d-flex justify-content-between header-text-sizing m-auto">
          <div className="header-title d-flex cursor-pointer" onClick={() => this.props.backToHomepage()}>
            <img className="logo mr-1" src="./images/trending_up-white-18dp.svg" alt=""/>
            <h2 className="my-auto mobile-header-text">$tonk Reacts</h2>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
