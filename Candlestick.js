import React from 'react';
import Plot from 'react-plotly.js';
let StockSymbol = 'FB';



class Candlestick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candlestickChartDateValues: [],
      candlestickChartHighValues: [],
      candlestickChartLowValues: [],
      candlestickChartOpenValues: [],
      candlestickChartCloseValues: []
    }
  }

  componentDidMount() {
    this.fetchCandleStick();
  }

  fetchCandleStick() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = '7M4QFT9WMSTJQZWW';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let candlestickChartDateValuesFunction = [];
    let candlestickChartHighValuesFunction = [];
    let candlestickChartLowValuesFunction = [];
    let candlestickChartOpenValuesFunction = [];
    let candlestickChartCloseValuesFunction = [];


    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
        //  console.log(data);

          for (var key in data['Time Series (Daily)']) {
            candlestickChartDateValuesFunction.push(key);
            candlestickChartOpenValuesFunction.push(data["Time Series (Daily)"][key]["1. open"]);
            candlestickChartCloseValuesFunction.push(data["Time Series (Daily)"][key]["4. close"]);
            candlestickChartHighValuesFunction.push(data["Time Series (Daily)"][key]["2. high"]);
            candlestickChartLowValuesFunction.push(data["Time Series (Daily)"][key]["3. low"]);
          }

          // console.log(stockChartXValuesFunction);
          pointerToThis.setState({
            candlestickChartDateValues: candlestickChartDateValuesFunction,
            candlestickChartHighValues: candlestickChartHighValuesFunction,
            candlestickChartLowValues: candlestickChartLowValuesFunction,
            candlestickChartCloseValues: candlestickChartCloseValuesFunction,
            candlestickChartOpenValues: candlestickChartOpenValuesFunction
          });
        }
      )
  }

  render() {
    return (
      <div>
        <Plot
          data={[
            {
            x: this.state.candlestickChartDateValues,
            close: this.state.candlestickChartCloseValues,
            decreasing: {line: {color: '#7F7F7F'}},
            high: this.state.candlestickChartHighValues,
            increasing: {line: {color: '#17BECF'}},
            line: {color: 'rgba(31,119,180,1)'},
            low: this.state.candlestickChartLowValues,
            open: this.state.candlestickChartOpenValues, 
            type: 'candlestick', 
            xaxis: 'x', 
            yaxis: 'y'

        }
          ]}
          config={{
            displayModeBar: false
          }}
          layout={{
            width: 720, 
            height: 440, 
            title: (StockSymbol),
            xaxis: {
                type: 'date',
                rangebreaks: [
                    {'pattern': 'day of week', 'bounds': [6, 1]}
                ]
            	}
        
    }}
        />
      </div>
    )
  }
}
export default Candlestick
