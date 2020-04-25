import React from 'react';

export default class Weather extends React.Component {
  getTemperature(temp) {
    return Math.floor((temp - 273.15) * (9 / 5) + 32);
  }

  render() {
    return (
      <div>
        <hr />
        <h1>{this.props.city.name}</h1>
        <span>{this.props.city.weather[0].main}</span>
        <div>
          {this.getTemperature(this.props.city.main.temp)}
          H: {this.getTemperature(this.props.city.main.temp_max)}
          L: {this.getTemperature(this.props.city.main.temp_min)}
        </div>
      </div>
    );
  }
}
