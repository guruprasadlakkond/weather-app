import React from 'react';
import './App.css';
import Weather from './components/Weather';
import weatherapi from './services/weatherapi';
import cityList from './city.list.json';

class App extends React.Component {
  cityObjList = {};
  componentWillMount() {
    this.cityObjList = cityList.reduce((a, cv) => {
      a[cv.id] = cv.id;
      return a;
    }, {});
  }

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
    error: '',
  };

  onChange = (e) => {
    e.preventDefault();

    this.setState({ name: e.target.value + Date.now() });
    if (!Number.isInteger(parseInt(e.target.value))) {
      return;
    }

    if (!this.cityObjList[e.target.value]) {
      this.setState({ error: 'Invalid City id' });
      return;
    }

    const cId = e.target.value;
    const matches = this.state.selectedCities.some((id) => {
      return id === e.target.value;
    });
    if (!matches) {
      this.setState({
        selectedCities: [...this.state.selectedCities, cId],
        error: '',
      });
    }
  };

  renderCities() {
    return Object.keys(this.state.citiesData).map((cityId) => {
      return <Weather key={cityId} city={this.state.citiesData[cityId]} />;
    });
  }

  render() {
    // console.log(cityList);

    /* const cityObj = cityList.reduce((a, cv) => {
      console.log(cv.id);
      a[cv.id] = cv;
      return a;
    }, {});
    console.log(cityObj); */
    console.log(this.state);
    return (
      <div>
        <header>
          <label htmlFor="cityId">City Id </label>
          <input
            id="cityId"
            type="text"
            onBlur={this.onChange}
            // onKeyPress={(event) => event.charCode >= 48 && event.charCode <= 57}
            placeholder="Enter city Id"
          />
          <h4>{this.state.error && this.state.error}</h4>
          {this.renderCities()}
        </header>
      </div>
    );
  }
}
export default App;
