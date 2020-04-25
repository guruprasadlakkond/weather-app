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
        <div>
          <div>
            <span>
              <strong>
                {this.getTemperature(this.props.city.main.temp)}&deg;
              </strong>
              <img
                src={`http://openweathermap.org/img/wn/${this.props.city.weather[0].icon}@2x.png`}
                alt=""
              />
            </span>
          </div>
          <div>
            <span>
              H: {this.getTemperature(this.props.city.main.temp_max)}&deg;
            </span>
            <span>
              L:{this.getTemperature(this.props.city.main.temp_min)}&deg;
            </span>
          </div>
        </div>
      </div>
    );
  }
}
