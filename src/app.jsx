import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import Homepage from './homepage';
import SearchResultList from './search-result-list';
import SearchResultListItem from './search-result-list-item';
import StockDetails from './stock-details';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepageGif: null,
      searchResults: [
        {
          "name": "TESLA INC",
          "symbol": "TSLA",
          "stock_exchange": {
            "name": "NASDAQ Stock Exchange",
            "acronym": "NASDAQ",
            "mic": "XNAS",
            "country": "USA",
            "country_code": "US",
            "city": "New York",
            "website": "www.nasdaq.com",
            "timezone": {
              "timezone": "America/New_York",
              "abbr": "EST",
              "abbr_dst": "EDT"
            }
          }
        },
        {
          "name": "TESLA INC",
          "symbol": "TSLA.XBUE",
          "stock_exchange": {
            "name": "Buenos Aires Stock Exchange",
            "acronym": "BCBA",
            "mic": "XBUE",
            "country": "Argentina",
            "country_code": "AR",
            "city": "Buenos Aires",
            "website": "www.bcba.sba.com.ar",
            "timezone": {
              "timezone": "America/Argentina/Buenos_Aires",
              "abbr": "-03",
              "abbr_dst": "-03"
            }
          }
        },
        {
          "name": "TESLA INC DRN",
          "symbol": "TSLA34.BVMF",
          "stock_exchange": {
            "name": "B3 - Brasil Bolsa Balcão S.A",
            "acronym": "Bovespa",
            "mic": "BVMF",
            "country": "Brazil",
            "country_code": "BR",
            "city": "Sao Paulo",
            "website": "www.bmfbovespa.com.br",
            "timezone": {
              "timezone": "America/Sao_Paulo",
              "abbr": "-03",
              "abbr_dst": "-03"
            }
          }
        },
        {
          "name": "TESLA INC. DL -,001",
          "symbol": "TL0.XFRA",
          "stock_exchange": {
            "name": "Deutsche Börse",
            "acronym": "FSX",
            "mic": "XFRA",
            "country": "Germany",
            "country_code": "DE",
            "city": "Frankfurt",
            "website": "www.deutsche-boerse.com",
            "timezone": {
              "timezone": "Europe/Berlin",
              "abbr": "CET",
              "abbr_dst": "CEST"
            }
          }
        },
        {
          "name": "TESLA INC. REGISTERED SHARES DL-,001",
          "symbol": "TL0.XSTU",
          "stock_exchange": {
            "name": "Börse Stuttgart",
            "acronym": "XSTU",
            "mic": "XSTU",
            "country": "Germany",
            "country_code": "DE",
            "city": "Stuttgart",
            "website": "www.boerse-stuttgart.de",
            "timezone": {
              "timezone": "Europe/Berlin",
              "abbr": "CET",
              "abbr_dst": "CEST"
            }
          }
        },
        {
          "name": "TESLA INC. DL -,001",
          "symbol": "TL0.XETRA",
          "stock_exchange": {
            "name": "Deutsche Börse Xetra",
            "acronym": "XETR",
            "mic": "XETRA",
            "country": "Germany",
            "country_code": "DE",
            "city": "Frankfurt",
            "website": "",
            "timezone": {
              "timezone": "Europe/Berlin",
              "abbr": "CET",
              "abbr_dst": "CEST"
            }
          }
        },
        {
          "name": "TESLA",
          "symbol": "TSLA.XMIL",
          "stock_exchange": {
            "name": "Borsa Italiana",
            "acronym": "MIL",
            "mic": "XMIL",
            "country": "Italy",
            "country_code": "IT",
            "city": "Milano",
            "website": "www.borsaitaliana.it",
            "timezone": {
              "timezone": "Europe/Rome",
              "abbr": "CET",
              "abbr_dst": "CEST"
            }
          }
        },
        {
          "name": "TESLA INC",
          "symbol": "TSLA.XMEX",
          "stock_exchange": {
            "name": "Mexican Stock Exchange",
            "acronym": "BMV",
            "mic": "XMEX",
            "country": "Mexico",
            "country_code": "MX",
            "city": "Mexico City",
            "website": "www.bmv.com.mx",
            "timezone": {
              "timezone": "America/Mexico_City",
              "abbr": "CST",
              "abbr_dst": "CDT"
            }
          }
        },
        {
          "name": "Tesla Exploration Ltd",
          "symbol": "TXLZF",
          "stock_exchange": {
            "name": "OTC Grey Market",
            "acronym": "OTCGREY",
            "mic": "PSGM",
            "country": "USA",
            "country_code": "US",
            "city": "New York",
            "website": "www.otcmarkets.com",
            "timezone": {
              "timezone": "America/New_York",
              "abbr": "EST",
              "abbr_dst": "EDT"
            }
          }
        },
        {
          "name": "TESLA INC",
          "symbol": "TSLA",
          "stock_exchange": {
            "name": "Investors Exchange",
            "acronym": "IEX",
            "mic": "IEXG",
            "country": "USA",
            "country_code": "US",
            "city": "New York",
            "website": "www.iextrading.com",
            "timezone": {
              "timezone": "America/New_York",
              "abbr": "EST",
              "abbr_dst": "EDT"
            }
          }
        }
      ],
      stockDetails: null,
      stockDetailsGif: null
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.stockDetails = this.stockDetails.bind(this);
    this.backToResults = this.backToResults.bind(this);
    this.backToHomepage = this.backToHomepage.bind(this);
  }

  componentDidMount() {
    fetch('https://api.giphy.com/v1/gifs/f6OakvYpFx3H0ShU3L?api_key=8RxFYU11Hi6cCjYEJuQipJJ9965BaHUT')
      .then(res => res.json())
      .then(json => {
        const { data } = json;
        this.setState({
          homepageGif: data
        })
      })
  }

  stockDetails(symbol) {
    fetch(`http://api.marketstack.com/v1/eod?access_key=fb1fd1efa8b98380b5fee609590442a8&symbols=${symbol}&limit=10`)
      .then(res => res.json())
      .then(stock => {
        this.setState({
          stockDetails: stock.data
        })
      })
  }

  backToResults() {
    this.setState({
      stockDetails: null,
      stockDetailsGif: null
    })
  }

  backToHomepage() {
    this.setState({
      stockDetails: null,
      stockDetailsGif: null,
      searchResults: []
    })
  }

  formSubmit(searchQuery) {
    event.preventDefault();
    this.setState({
      homepageGif: null
    })
    fetch(`http://api.marketstack.com/v1/tickers?access_key=fb1fd1efa8b98380b5fee609590442a8&search=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          searchResults: data.data
        })
      })
  }

  checkState() {
    if (this.state.stockDetails) return <StockDetails details={this.state.stockDetails} gif={this.state.stockDetailsGif} backToResults={this.backToResults} />
    if (this.state.searchResults.length > 0) return <SearchResultList searchResults={this.state.searchResults} stockDetails={this.stockDetails} backToHomepage={this.backToHomepage} />
    if (this.state.homepageGif) {
      return <Homepage gif={this.state.homepageGif} formSubmit={this.formSubmit} />
    }
    return <h2 className="text-center pt-5">Loading...</h2>
  }

  render() {
    return (
      <div>
        <Header backToHomepage={this.backToHomepage} />
        {this.checkState()}
      </div>
    )
  }
}

export default App;
