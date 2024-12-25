import React from "react";
import Weather from "./Weather";
import Input from "./Input";
class App extends React.Component {
  state = {
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };
  fetchWeather = async () => {
    if (this.state.location.length < 2) return this.setState({ weather: {} });
    try {
      this.setState({ isLoading: true });

      const api = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const res = await api.json();
      console.log(res);
      if (!res.results) throw new Error("location not found");
      const { latitude, longitude, timezone, name } = res.results.at(0);
      this.setState({ displayLocation: `${name}` });
      const weatherData = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const data = await weatherData.json();
      console.log(data);
      this.setState({ weather: data.daily });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  setLocation = (e) => {
    this.setState({ location: e.target.value });
  };
  //useEffect []
  componentDidMount() {
    // this.fetchWeather();
    this.setState({ location: localStorage.getItem("location") || "" });
  }
  //useEffect [location]
  componentDidUpdate(prevprops, prevstate) {
    if (prevstate.location !== this.state.location) {
      this.fetchWeather();
      localStorage.setItem("location", this.state.location);
    }
  }
  render() {
    return (
      <div className="app">
        <h1>classy weather</h1>
        <div>
          <Input location={this.state.location} onLocation={this.setLocation} />
        </div>
        {this.state.isLoading && <p>....Loading</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}
export default App;
