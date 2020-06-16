import React, {Component} from 'react';
import Option from './components/Option.js';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      currencyOne: "USD",
      currencyTwo: "EUR",
      amountOne: "",
      amountTwo: "",
    };
    this.handleChangeTop = this.handleChangeTop.bind(this);
  }

 //use bind
  handleChangeTop(event) {
    this.setState({currencyOne: event.target.value});
    this.componentDidMount();
  }

  swap = ()=> {
    this.setState({currencyOne: this.state.currencyTwo, currencyTwo: this.state.currencyOne});
    console.log("before:" + this.state.currencyOne);
    this.componentDidMount();
    console.log("after:" + this.state.currencyOne);
  }

  componentDidMount() {
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

  render() {
    return(
      <div>
        <h1>Exchange Rate Calculator</h1>
        <p>Choose the currency and the amounts to get the exchange rate</p>
        <div>
          <select defaultValue="USD" value={this.state.currencyOne} onChange={this.handleChangeTop}>
            <Option />
          </select>
          <button onClick={this.swap}>Swap</button>
          {/*use arrow function to bind */}
          <select  defaultValue="EUR" value={this.state.currencyTwo}
          onChange={(e) => {
            this.setState({currencyTwo: e.target.value});
            this.componentDidMount();
          }
        }>
            <Option />
          </select>
        </div>
        <div>
          <form>
            <input type="number" value={this.state.value} onChange={(e) => this.setState({amountOne: e.target.value})}/>
          </form>
          <p>1{this.state.currencyOne} = {this.state.items[this.state.currencyTwo]} {this.state.currencyTwo}</p>
          <p>result{this.state.items[this.state.currencyTwo] * this.state.amountOne}</p>
        </div>
      </div>
    )
  }
}

export default App;
