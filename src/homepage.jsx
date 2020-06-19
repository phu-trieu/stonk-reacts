import React, { Component } from 'react';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    const gif = this.props.gif;
    console.log(gif)
    return (
      <div>
        <form action="" className="">
          <div className="form-group d-flex flex-wrap justify-content-center pt-5">
            <div className="col-12 d-flex justify-content-center">
              <label htmlFor="search" className="label-size text-center">Search for a company</label>
            </div>
            <div className="col-12 d-flex justify-content-center">
              <input id="search" className="form-control form-border input-size" type="text" placeholder="e.g. SNAP" />
            </div>
          </div>
        </form>
        <div className="d-flex justify-content-center mt-5">
          <img className="stonks-gif" src={gif.images.fixed_height.url} alt=""/>
        </div>
      </div>
    )
  }
}

export default Homepage;
