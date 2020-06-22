import React, { Component } from 'react';

class StockDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: null
    }
  }
  componentDidMount() {
    const gif = this.props.gif;
    const details = this.props.details;
    if (!details.price) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=error&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (details.change_pct < 5) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=so so&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (details.change_pct > 5 && details.change_pct < 20 && details.price < details.price_open) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=worried&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (details.change_pct > 5 && details.change_pct < 20 && details.price > details.price_open) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=looking good&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (details.change_pct >= 20 && details.price < details.price_open) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=disaster&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (details.change_pct >= 20 && details.price > details.price_open) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=liftoff&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
  }

  getRandomGif() {
    const gif = this.state.gif;
    const random = (Math.random() * 24).toFixed(0);
    return gif[random].images.fixed_height.url;
  }

  getPrice() {
    if (!this.props.details.price) return 'null';
    return (this.props.details.price).toFixed(2);
  }

  posNegDayChange() {
    if (this.props.details.price < this.props.details.price_open) return '-'
  }

  trendSymbol() {
    const details = this.props.details;
    if (!details.price) return '/images/error-white-18dp.svg';
    if (details.price < details.price_open) return 'images/trending_down-white-18dp.svg';
    if (details.price > details.price_open) return 'images/trending_up-white-18dp.svg';
  }

  trendColor() {
    const details = this.props.details;
    if (!details.price) return 'ml-1 text-warning';
    if (details.price < details.price_open) return 'ml-1 text-danger';
    if (details.price > details.price_open) return 'ml-1 text-success';

  }

  render() {
    console.log(this.state.gif)
    const gif = this.props.gif;
    const details = this.props.details;
    const priceOpen = (details.price_open).toFixed(2);
    const dayHigh = (details.day_high).toFixed(2);
    const dayLow = (details.day_low).toFixed(2);
    const yearHigh = (details[`52_week_high`]).toFixed(2);
    const yearLow = (details[`52_week_low`]).toFixed(2);
    const dayChange = (details.day_change).toFixed(2);
    const changePct = (details.change_pct).toFixed(2);
    if (!this.state.gif) return <h1>Loading...</h1>
    if (this.state.gif) {
      return (
        <div>
          <div className="mx-auto mt-2 search-result-LI">
            <h6 className="fit-content cursor-pointer" onClick={() => this.props.backToResults()}>
              &#8592; Back to results
            </h6>
          </div>
          <div className="d-flex justify-content-between mt-3 mx-auto w-66">
            <div>
              <h1>{details.symbol}</h1>
            </div>
            <div className="d-flex">
              <img src={this.trendSymbol()} alt="" className="menu" />
              <h1 className={this.trendColor()}>{this.getPrice()}</h1>
            </div>
          </div>
          <div className="w-66 d-flex m-auto">
            <h3>{details.name}</h3>
          </div>
          <div className="d-flex justify-content-center my-5">
            <img className="stonks-gif" src={this.getRandomGif()} alt="" />
          </div>
          <div className="d-flex justify-content-between w-66 mx-auto mb-3">
            <div className="search-result-LI m-auto">
              <div>
                <h4>Price Open: ${priceOpen}</h4>
              </div>
              <div>
                <h4>Day High: ${dayHigh}</h4>
              </div>
              <div>
                <h4>Day Low: ${dayLow}</h4>
              </div>
              <div>
                <h4>52 Week High: ${yearHigh}</h4>
              </div>
            </div>
            <div className="search-result-LI m-auto">
              <div className="text-right">
                <h4>52 Week Low: ${yearLow}</h4>
              </div>
              <div className="text-right">
                <h4>Day Change: {this.posNegDayChange()}${dayChange}</h4>
              </div>
              <div className="text-right">
                <h4>Change %: {this.posNegDayChange()}{changePct}</h4>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default StockDetails;
