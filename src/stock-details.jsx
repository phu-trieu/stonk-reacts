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
    if (details.length === 0) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=8RxFYU11Hi6cCjYEJuQipJJ9965BaHUT&q=error&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    const pctChange = (((details[0].close - details[0].open) / Math.abs(details[0].open)) * 100);
    if (pctChange >= 0 && pctChange < 5) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=8RxFYU11Hi6cCjYEJuQipJJ9965BaHUT&q=so so&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange >= 5 && pctChange < 20 ) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=8RxFYU11Hi6cCjYEJuQipJJ9965BaHUT&q=hopeful&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange >= 20) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=8RxFYU11Hi6cCjYEJuQipJJ9965BaHUT&q=liftoff&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange < 0 && pctChange > -5) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=8RxFYU11Hi6cCjYEJuQipJJ9965BaHUT&q=worried&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange <= -5 && pctChange > -20) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=8RxFYU11Hi6cCjYEJuQipJJ9965BaHUT&q=liftoff&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange <= -20) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=8RxFYU11Hi6cCjYEJuQipJJ9965BaHUT&q=liftoff&limit=25&offset=0&rating=G&lang=en')
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
    if (!this.props.details[0].close) return 'null';
    return (this.props.details[0].close).toFixed(2);
  }

  trendSymbol() {
    const details = this.props.details;
    if (!details[0].open) return '/images/error-white-18dp.svg';
    if (details[0].close === details[0].open) return '/images/trending_flat-white-18dp.svg';
    if (details[0].close < details[0].open) return 'images/trending_down-white-18dp.svg';
    if (details[0].close > details[0].open) return 'images/trending_up-white-18dp.svg';
  }

  trendColor() {
    const details = this.props.details;
    if (!details[0].open) return 'ml-1 text-warning';
    if (details[0].close === details[0].open) return 'ml-1 text-white';
    if (details[0].close < details[0].open) return 'ml-1 text-danger';
    if (details[0].close > details[0].open) return 'ml-1 text-success';
  }

  render() {
    const gif = this.props.gif;
    const details = this.props.details;
    const priceOpen = () => {
      if (details[0].open) return (details[0].open).toFixed(2);
      return '';
    };
    const dayHigh = () => {
      if (details[0].high) return (details[0].high).toFixed(2);
      return '';
    };
    const dayLow = () => {
      if (details[0].low) return (details[0].low).toFixed(2);
      return '';
    };
    const volume = () => {
      if (details[0].volume) return (details[0]).volume;
      return '';
    };
    const dayChange = () => {
      if (details[0].open) return (details[0].close - details[0].open).toFixed(2);
      return '';
    };
    const changePct = () => {
      if (details[0].open) return (((details[0].close - details[0].open) / Math.abs(details[0].open)) * 100).toFixed(2);
      return '';
    };
    console.log(changePct)
    if (!this.state.gif) return <h1 className="text-center pt-5">Loading...</h1>
    if (this.props.details.length === 0) return (
      <div className="mx-auto mt-2 search-result-LI">
        <h6 className="fit-content cursor-pointer" onClick={() => this.props.backToResults()}>
          &#8592; Back to results
        </h6>
        <h1 className="text-center pt-5">No data was found :(</h1>
        <div className="d-flex justify-content-center my-5">
          <img className="stonks-gif" src={this.getRandomGif()} alt="" />
        </div>
      </div>
      )
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
              <h1>{details[0].symbol}</h1>
            </div>
            <div className="d-flex">
              <img src={this.trendSymbol()} alt="" className="menu" />
              <h1 className={this.trendColor()}>{this.getPrice()}</h1>
            </div>
          </div>
          <div className="w-66 d-flex m-auto">
            <h3>{this.props.name}</h3>
          </div>
          <div className="d-flex justify-content-center my-5">
            <img className="stonks-gif" src={this.getRandomGif()} alt="" />
          </div>
          <div className="d-flex justify-content-between w-66 mx-auto mb-3">
            <div className="search-result-LI m-auto">
              <div>
                <h4 className="detail-text">Price Open: {priceOpen()}</h4>
              </div>
              <div>
                <h4 className="detail-text">Day High: {dayHigh()}</h4>
              </div>
              <div>
                <h4 className="detail-text">Day Low: {dayLow()}</h4>
              </div>
            </div>
            <div className="search-result-LI m-auto">
              <div className="text-right">
                <h4 className="detail-text">Day Change: {dayChange()}</h4>
              </div>
              <div className="text-right">
                <h4 className="detail-text">Change %: {changePct()}</h4>
              </div>
              <div className="text-right">
                <h4 className="detail-text">Volume: {volume()}</h4>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default StockDetails;
