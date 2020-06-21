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
    if (details.change_pct > 20 && details.price < details.price_open) {
      return fetch('https://api.giphy.com/v1/gifs/search?api_key=Ef4JyI8sRzmss507iqcCYLHVE3MMkM6A&q=building collapse&limit=25&offset=0&rating=G&lang=en')
        .then(res => res.json())
        .then(gifs => {
          this.setState({
            gif: gifs.data
          })
        })
    }
    if (details.change_pct > 20 && details.price > details.price_open) {
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
    const random  = (Math.random() * 24).toFixed(0);
    return gif[random].images.fixed_height.url;
  }

  getPrice() {
    if (!this.props.details.price) return 'null';
    return this.props.details.price;
  }

  posNegDayChange() {
    if (this.props.details.price < this.props.details.price_open) return '-'
  }

  render() {
    console.log(this.state.gif)
    const gif = this.props.gif;
    const details = this.props.details;
    if (!this.state.gif) return <h1>Loading...</h1>
    if (this.state.gif) {return (
      <div>
        <div className="d-flex justify-content-between mt-3 search-result-LI mx-auto">
          <div>
            <h1>{details.symbol}</h1>
          </div>
          <div className="d-flex">
            <img src="/images/trending_down-white-18dp.svg" alt="" className="menu"/>
            <h1 className="ml-1">{this.getPrice()}</h1>
          </div>
        </div>
        <div className="search-result-LI d-flex m-auto">
          <h3>{details.name}</h3>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <img className="stonks-gif" src={this.getRandomGif()} alt=""/>
        </div>
        <div>
          <h4>Price Open: ${details.price_open}</h4>
        </div>
        <div>
          <h4>Day High: ${details.day_high}</h4>
        </div>
        <div>
          <h4>Day Low: ${details.day_low}</h4>
        </div>
        <div>
          <h4>52 Week High: ${details[52_week_high]}</h4>
        </div>
        <div>
          <h4>52 Week Low: ${details[52_week_low]}</h4>
        </div>
        <div>
          <h4>Day Change: {this.posNegDayChange()}${details.day_change}</h4>
        </div>
        <div>
          <h4>Change %: {this.posNegDayChange()}{details.change_pct}</h4>
        </div>
      </div>
    )
    }
  }
}

export default StockDetails;
