import React from 'react';
import './App.css';
import Weather from './components/Weather';
import weatherapi from './services/weatherapi';

//http://openweathermap.org/img/wn/01d@2x.png
class App extends React.Component {
  componentDidMount() {
    setInterval(async () => {
      const prms = this.state.selectedCities.map((id) => {
        return weatherapi(id);
      });
      const weatherRpts = await Promise.all(prms);
      const citiesData = weatherRpts.reduce((a, cv, ci) => {
        a[cv.id] = cv;
        return a;
      }, {});
      this.setState({ citiesData });
    }, 5000);

    weatherapi(833);
  }
  state = {
    selectedCities: [5391811, 5128638, 4435652],
    citiesData: {},
    name: '',
  };

  onChange = (e) => {
    e.preventDefault();

    const cId = e.target.value;
    const matches = this.state.selectedCities.some((id) => {
      return id === e.target.value;
    });
    if (!matches) {
      this.setState({ selectedCities: [...this.state.selectedCities, cId] });
    }
  };

  renderCities() {
    return Object.keys(this.state.citiesData).map((cityId) => {
      return <Weather key={cityId} city={this.state.citiesData[cityId]} />;
    });
  }

  render() {
    return (
      <div>
        <header>
          <label htmlFor="cityId">City Id </label>
          <input
            id="cityId"
            type="text"
            onBlur={this.onChange}
            placeholder="Enter city Id"
          />
          {this.renderCities()}
        </header>
      </div>
    );
  }
}
export default App;
