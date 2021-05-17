import React from 'react';
let StockSymbol = 'FB';


class latestPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.fetchOverview();
  }

  fetchOverview() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = '7M4QFT9WMSTJQZWW';
    let API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${StockSymbol}&apikey=${API_KEY}`;


    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
     .then(
        function(data) {
        document.getElementById('latestPriceValue').textContent =data.["Global Quote"].['05. price'];
          console.log(data);

        }
        )
  }

  render() {
    return (
      <div>
        <h1>
        </h1>
        <p>Latest Share Price ( 1 minute ) <br></br> <span id='latestPriceValue'></span> </p>
      </div>
    )
  }
}
export default latestPrice
