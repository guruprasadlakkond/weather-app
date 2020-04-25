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
        {this.props.city.weather[0].main}
        <img
          src={`http://openweathermap.org/img/wn/${this.props.city.weather[0].icon}@2x.png`}
          alt=""
        />
        <div>
          <h3>
            {this.getTemperature(this.props.city.main.temp)}
            <i>&deg;</i>
          </h3>
          <span>
            H: {this.getTemperature(this.props.city.main.temp_max)}&deg;{' '}
          </span>
          <span>
            L:
            {this.getTemperature(this.props.city.main.temp_min)}&deg;
          </span>
        </div>
      </div>
    );
  }
}
