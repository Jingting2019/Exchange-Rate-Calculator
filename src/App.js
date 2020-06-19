import React, { Component } from 'react';
import './App.css';
import Option from './components/Option.js';
import logo from './images/money.png';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      currencyOne: "USD",
      currencyTwo: "EUR",
      amountOne: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateState = this.updateState.bind(this);
  }

 //use bind
  handleChange(event, key) {
    let obj = {};
    obj[key] = event.target.value;
    this.setState(obj, () => {
      this.fetchData(this.state.currencyOne, this.updateState);
    });
  }

  swap = ()=> {
    //if click too fast will occur bug
    this.fetchData(this.state.currencyTwo, this.updateState)
    this.setState({currencyOne: this.state.currencyTwo, currencyTwo:this.state.currencyOne});

    //this.fetchData(this.state.currencyTwo, this.state.currencyOne, this.updateState);
  }

  updateState(rates) {
    this.setState({
      //  currencyOne:fromCurrency,
      //  currencyTwo:toCurrency,
        items:rates
    });
  }

  fetchData(fromCurrency, callback) {
    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(
        (result) => {
          callback(result.rates);
        },
      )
  }

  componentDidMount() {
    this.fetchData(this.state.currencyOne, this.updateState);
  }

  render() {
    return (
      <div className="app">
        <img src={logo}></img>
        <h1>Exchange Rate Calculator</h1>
        <p>Choose the currency and the amounts to get the exchange rate</p>
        <div className="exchanger">
          <div className="amount labeled">
              <label for="amount">Amount</label>
              <input type="number" id="amount" placeholder={0} onChange={(e) => this.setState({ amountOne: e.target.value })} />
          </div>
          <div className="from labeled">
            <label for="from">From</label>
            <select id="from" defaultValue="USD" value={this.state.currencyOne} onChange={(e) => this.handleChange(e, 'currencyOne')}>
              <Option />
            </select>
          </div>
          <div className="swapButton">
            <button onClick={this.swap}>Swap</button>
          </div>
          <div className="to labeled">
            <label for="to">To</label>
            <select id="to" defaultValue="EUR" value={this.state.currencyTwo}
              onChange={(e) => {
                   this.handleChange(e, "currencyTwo");
              }}>
              <Option />
            </select>
          </div>
        </div>
        <p className="rate">1{this.state.currencyOne} = {this.state.items[this.state.currencyTwo]} {this.state.currencyTwo}</p>
        <div className="result">
          <h2>Result</h2>
          <p>{ (this.state.items[this.state.currencyTwo] * this.state.amountOne).toFixed(2)}</p>
        </div>

      </div>
    )
  }
}

export default App;
