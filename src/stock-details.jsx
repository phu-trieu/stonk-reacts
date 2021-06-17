import React, { Component } from 'react';

class StockDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifsArray: [],
      randomGif: '',
      gifSpecifics: {}
    }
  }

  componentDidMount() {
    const details = this.props.details;
    const detailsEOD = this.props.details[0];
    const pctChange = (((detailsEOD.close - detailsEOD.open) / Math.abs(detailsEOD.open)) * 100);
    /** determines GIPHY search query based on stocks percent change for the day */
    const gifSearchQuery = () => {
      if (details.length === 0) return 'error';
      if (pctChange === 0) return 'nothing happened';
      if (pctChange > 0 && pctChange < 5) return 'so so';
      if (pctChange >= 5 && pctChange < 15) return 'hopeful';
      if (pctChange >= 15) return 'liftoff';
      if (pctChange < 0 && pctChange > -5) return 'worried';
      if (pctChange <= -5 && pctChange > -15) return 'falling';
      if (pctChange <= -15) return 'disaster';
    }
    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=${gifSearchQuery()}&limit=25&offset=0&rating=G&lang=en`)
      .then(res => res.json())
      .then(gifs => {
        this.setState({
          gifsArray: gifs.data
        })
        this.getRandomGif();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  getRandomGif() {
    const gifsArray = this.state.gifsArray;
    const random = Number((Math.random() * (gifsArray.length - 1)).toFixed(0));
    const randomGif = gifsArray[random];
    this.setState({
      randomGif: randomGif.images.fixed_height.url,
      gifSpecifics: randomGif
    })
  }

  getPrice() {
    const detailsEOD = this.props.details[0];
    if (!detailsEOD.close) return 'null';
    return (detailsEOD.close).toFixed(2);
  }

  /** determines if trend symbol is up, down, or flat */
  setTrendSymbol() {
    const detailsEOD = this.props.details[0];
    if (!detailsEOD.open) return '/images/error-white-18dp.svg';
    if (detailsEOD.close === detailsEOD.open) return '/images/trending_flat-white-18dp.svg';
    if (detailsEOD.close < detailsEOD.open) return 'images/trending_down-white-18dp.svg';
    if (detailsEOD.close > detailsEOD.open) return 'images/trending_up-white-18dp.svg';
  }

  /** determines if stock price should be red or green based on stocks performance */
  setTrendColor() {
    const detailsEOD = this.props.details[0];
    if (!detailsEOD.open) return 'ml-1 text-warning';
    if (detailsEOD.close === detailsEOD.open) return 'ml-1 text-white';
    if (detailsEOD.close < detailsEOD.open) return 'ml-1 text-danger';
    if (detailsEOD.close > detailsEOD.open) return 'ml-1 text-success';
  }

  checkDetailsStatus() {
    const details = this.props.details;
    const detailsEOD = this.props.details[0];

    const priceOpen = detailsEOD.open.toFixed(2) || '';

    const dayHigh = detailsEOD.high.toFixed(2) || '';

    const dayLow = (detailsEOD.low).toFixed(2) || '';

    const volume = (detailsEOD.volume) || '';

    const dayChange = (detailsEOD.close - detailsEOD.open).toFixed(2) || '';

    const changePct = (((detailsEOD.close - detailsEOD.open) / Math.abs(detailsEOD.open)) * 100).toFixed(2) || '';

      return (
        <div>
          <div className="symbol-grid mt-3 mx-auto w-95">
            <div className="fit-content">
              <h1>{detailsEOD.symbol}</h1>
            </div>
            <div className="d-flex">
              <img src={this.setTrendSymbol()} alt="" className="menu" />
              <h1 className={this.setTrendColor()}>{this.getPrice()}</h1>
            </div>
          </div>
          <div className="w-95 m-auto">
            <h3>{this.props.stockDetailsName}</h3>
          </div>
          <div className="d-flex justify-content-center my-5">
            <img className="stonks-gif" src={this.state.randomGif} title={this.state.gifSpecifics.title} alt={this.state.gifSpecifics.title} />
          </div>
          <div className="d-flex justify-content-between w-66 mx-auto mb-3">
            <div className="d-grid justify-content-center w-95 m-auto">
              <div>
                <h4 className="detail-text">Price Open: {priceOpen}</h4>
              </div>
              <div>
                <h4 className="detail-text">Day High: {dayHigh}</h4>
              </div>
              <div>
                <h4 className="detail-text">Day Low: {dayLow}</h4>
              </div>
            </div>
            <div className="d-grid justify-content-center w-95 m-auto">
              <div className="text-right">
                <h4 className="detail-text">Day Change: {dayChange}</h4>
              </div>
              <div className="text-right">
                <h4 className="detail-text">Change %: {changePct}</h4>
              </div>
              <div className="text-right">
                <h4 className="detail-text">Volume: {volume}</h4>
              </div>
            </div>
          </div>
        </div>
      )
  }

  render() {
    const detailsEOD = this.props.details[0];
    return (
      <div>
        <a className="text-decoration-none w-95">
          <div className="back-to-homepage fit-content ms-3">
            <h6 className="cursor-pointer" onClick={() => this.props.backToResults()}>
              &#8592; Back to results
            </h6>
            <div className="line"></div>
          </div>
        </a>
        {this.checkDetailsStatus()}
      </div>
    )
  }
}

export default StockDetails;
