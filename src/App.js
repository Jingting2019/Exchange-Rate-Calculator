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

    this.handleChangeTop = this.handleChangeTop.bind(this);
    this.updateCurrencyRate = this.updateCurrencyRate.bind(this);
  }

  //use bind
  handleChangeTop(event) {
    this.setState({ currencyOne: event.target.value });
    this.updateCurrencyRate()
  }

  swap = () => {
    this.setState({ currencyOne: this.state.currencyTwo, currencyTwo: this.state.currencyOne });
    console.log("before:" + this.state.currencyOne);
    this.updateCurrencyRate()
    console.log("after:" + this.state.currencyOne);
  }

  updateCurrencyRate() {
    fetch(`https://api.exchangerate-api.com/v4/latest/${this.state.currencyOne}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result.rates
          });
        },
      )
  }

  componentDidMount() {
    this.updateCurrencyRate()
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
            <select id="from" defaultValue="USD" value={this.state.currencyOne} onChange={this.handleChangeTop}>
              <Option />
            </select>
          </div>
          <div className="swapButton">
            <button onClick={this.swap}>Swap</button>
          </div>
          <div className="to labeled">
            <label for="to">To</label>
            {/*use arrow function to bind */}
            <select id="to" defaultValue="EUR" value={this.state.currencyTwo}
              onChange={(e) => {
                this.setState({ currencyTwo: e.target.value });
                this.componentDidMount();
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
