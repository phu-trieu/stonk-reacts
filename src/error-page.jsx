import React, { Component } from 'react'

export class ErrorPage extends Component {
  constructor(props) {
    super(props);
    }

  backToResultsOrHomepage() {
    if (this.props.searchResults.length) {
      return (
      <h6 className="cursor-pointer" onClick={() => this.props.backToResults()}>
        &#8592; Back to results
      </h6>
      )}
    return (
      <h6 className="cursor-pointer" onClick={() => this.props.backToHomepage()}>
        &#8592; Back to homepage
      </h6>
    )
  }

  render() {
    return (
      <div className="mx-auto mt-2 w-95">
        <div className="back-to-homepage fit-content">
          {this.backToResultsOrHomepage()}
          <div className="line" />
        </div>
        <h1 className="text-center pt-5">No data was found :&#40;</h1>
        <div className="d-flex justify-content-center my-5">
          <img className="stonks-gif" src="" alt="" />
        </div>
      </div>
    )
  }
}

export default ErrorPage
