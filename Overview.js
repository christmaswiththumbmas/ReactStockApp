import React from 'react';
let StockSymbol = 'FB';



class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        overview: []
    }
  }

  componentDidMount() {
    this.fetchOverview();
  }

  fetchOverview() {
    const pointerToThis = this;
    console.log(pointerToThis); 
    const API_KEY = '7M4QFT9WMSTJQZWW';
    let API_Call = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${StockSymbol}&apikey=${API_KEY}`;

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
        document.getElementById('overviewtext').textContent = data.Description;
        document.getElementById('titletext').textContent = data.Name;
          /*console.log(data);*/

        }
        )
  }

  render() {
    return (
      <div>
        <h1>
            <span id = 'titletext'></span>
        </h1>
        <p>Company Overview <br></br> <span id='overviewtext'></span> </p>
      </div>
    )
  }
}
export default Overview

