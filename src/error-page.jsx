import React, { Component } from 'react'

export class ErrorPage extends Component {
  render() {
    return (
      <div className="mx-auto mt-2 w-95">
        <h1 className="text-center pt-5">No data was found :&#40;</h1>
        <div className="d-flex justify-content-center my-5">
          <img className="stonks-gif" src="" alt="" />
        </div>
      </div>
    )
  }
}

export default ErrorPage
