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
    const detailsEOD = this.props.details[0];
    if (details.length === 0) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=error&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    const pctChange = (((details[0].close - details[0].open) / Math.abs(details[0].open)) * 100);
    if (pctChange === 0) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=zero&limit=25&offset=0&rating=g&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange > 0 && pctChange < 5) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=so so&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange >= 5 && pctChange < 20) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=hopeful&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange >= 20) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=liftoff&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange < 0 && pctChange > -5) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=worried&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange <= -5 && pctChange > -20) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=going down&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (pctChange <= -20) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=disaster&limit=25&offset=0&rating=G&lang=en')
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
    const random = Number((Math.random() * (gif.length - 1)).toFixed(0));
    return gif[random].images.fixed_height.url;
  }

  getPrice() {
    if (!detailsEOD.close) return 'null';
    return (detailsEOD.close).toFixed(2);
  }

  trendSymbol() {
    if (!detailsEOD.open) return '/images/error-white-18dp.svg';
    if (detailsEOD.close === detailsEOD.open) return '/images/trending_flat-white-18dp.svg';
    if (detailsEOD.close < detailsEOD.open) return 'images/trending_down-white-18dp.svg';
    if (detailsEOD.close > detailsEOD.open) return 'images/trending_up-white-18dp.svg';
  }

  trendColor() {
    if (!detailsEOD.open) return 'ml-1 text-warning';
    if (detailsEOD.close === detailsEOD.open) return 'ml-1 text-white';
    if (detailsEOD.close < detailsEOD.open) return 'ml-1 text-danger';
    if (detailsEOD.close > detailsEOD.open) return 'ml-1 text-success';
  }

  checkDetailsStatus() {
    if (detailsEOD.length === 0) return (
      <div className="mx-auto mt-2 w-95">
        <h1 className="text-center pt-5">No data was found :&lpar;</h1>
        <div className="d-flex justify-content-center my-5">
          <img className="stonks-gif" src={this.getRandomGif()} alt="" />
        </div>
      </div>
    )
    if (this.state.gif) {
      return (
        <div>
          <div className="d-flex justify-content-between mt-3 mx-auto w-66">
            <div>
              <h1>{detailsEOD.symbol}</h1>
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
            <div className="w-95 m-auto">
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
            <div className="w-95 m-auto">
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

  render() {
    const gif = this.props.gif;
    const priceOpen = () => {
      return (detailsEOD.open ? detailsEOD.open.toFixed(2) : '')
    };
    const dayHigh = () => {
      return (detailsEOD.high ? (detailsEOD.high).toFixed(2) : '')
    };
    const dayLow = () => {
      return (detailsEOD.low ? (detailsEOD.low).toFixed(2) : '');
    };
    const volume = () => {
      return (detailsEOD.volume ? (detailsEOD.volume) : '');
    };
    const dayChange = () => {
      return (detailsEOD.open ? (detailsEOD.close - detailsEOD.open).toFixed(2) : '');
    };
    const changePct = () => {
      return (detailsEOD.open ? (((detailsEOD.close - detailsEOD.open) / Math.abs(detailsEOD.open)) * 100).toFixed(2) : '');
    };
    if (!this.state.gif) return <h1 className="text-center pt-5">Loading...</h1>



    return (
      <div>
        <div className="mx-auto mt-2 w-95">
          <h6 className="fit-content cursor-pointer" onClick={() => this.props.backToResults()}>
            &#8592; Back to results
          </h6>
        </div>
        {this.checkDetailsStatus()}
      </div>
    )
  }
}

export default StockDetails;
