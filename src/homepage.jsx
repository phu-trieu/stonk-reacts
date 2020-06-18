import React, { Component } from 'react';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    return (
      <form action="" className="">
        <div className="form-group d-flex flex-wrap justify-content-center pt-5">
          <div className="col-12 d-flex justify-content-center">
            <label htmlFor="search" className="label-size">Search for a company</label>
          </div>
          <div className="col-12 d-flex justify-content-center">
            <input id="search" className="form-control form-border input-size" type="text" placeholder="e.g. SNAP" />
          </div>
        </div>
      </form>
    )
  }
}

export default Homepage;
