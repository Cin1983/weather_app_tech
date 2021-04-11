import React from "react";
import ReactDOM from "react-dom";
import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherCard from "./WeatherCard";
import Form from "./Form";

const API_key = "ffc50fde0210deb85d418dc51cb7e5e6";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celcius: undefined,
      temp_max: undefined,
      tem_min: undefined,
      description: "",
      error: false,
    };
    
    //   this.getWeather();

    this.weatherIcon = {
      Thunderstorm: " wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: " wi-storm-showers",
      Snow: "wi-snow",
      Atmospere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  calCelcius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  get_weatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;

      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;

      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmospere });
        break;

      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        if (city && country) {
            const api_call = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
            );

            const response = await api_call.json();

            console.log(response);

            this.setState({
                city:` ${response.name},${response.sys.country}`,
                celcius: this.calCelcius(response.main.temp),
                temp_min: this.calCelcius(response.main.temp_min),
                temp_max: this.calCelcius(response.main.temp_max),
                description: response.weather[0].description,
                error: false  
            });

            this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
        } else {
            this.setState({ error: true });
        }
    }

  render() {
      return (
          <div className="App">
              <Form loadweather={this.getWeather} error={this.state.error}/>
          
      <WeatherCard
            city={this.state.city}
            country={this.state.country}
            celcius={this.state.celcius}
            temp_min={this.state.temp_min}
            temp_max={this.state.temp_max}
            description={this.state.description}
            weatherIcon={this.state.icon}
        />
       </div> 
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));

export default App;
