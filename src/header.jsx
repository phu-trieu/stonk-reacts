import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="py-2 mb-3">
        <div className="d-flex justify-content-between header-text-sizing m-auto">
          <a className="header-title d-flex cursor-pointer text-decoration-none" onClick={() => this.props.backToHomepage()}>
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" width="48px" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0z" fill="none" /><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
            <h2 className="my-auto mobile-header-text">$tonk Reacts</h2>
          </a>
        </div>
      </header>
    )
  }
}

export default Header;
