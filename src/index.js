import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherCard from "./WeatherCard";

const API_key ='ffc50fde0210deb85d418dc51cb7e5e6'
;

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
            error: false
            
        };
        this.getWeather();

        this.weatherIcon = {
            bolt: '',
            wind: '',
            cloud: '',
            smog: '',
            sun: '',
            thunderstorm: '',
            snowflakes: '',
            raindrups:''
      }
    
    }




    calCelcius(temp) {
        let cell = Math.floor(temp - 273.15);
        return cell;
}






    getWeather = async () => {
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl &appid=${API_key}`
           
        );
    
    const response = await api_call.json();
        console.log(response)
        this.setState({
            city: response.name,
            country: response.sys.country,
            celcius: this.calCelcius(response.main.temp),
            temp_min: this.calCelcius(response.main.temp_min),
            temp_max: this.calCelcius(response.main.temp_max),
            description: response.weather[0].description,
            weatherIcon: this.weatherIcon.bolt
        })
    
}

    
    
    render() {
        return <WeatherCard
            city={this.state.city}
            country={this.state.country} 
            celcius={this.state.celcius}
            temp_min={this.state.temp_min}
            temp_max={this.state.temp_max}
            description={this.state.description}
            weatherIcon={this.state.weatherIcon}
            />;
  }
}

// class App extends React.Component {
//     state = { temp: [] };

//     onClickSubmit = async term => {
//         const response_weather = await postMessage.get("api.openweathermap.org/data/2.5/weather?id=2172797&appid={fbc42b71a1f25bdcec4ba6705cfcb970}
//             params: { id: term }

//         });

//     render() {
//         return (
//             <div>

//             </div>
//         )
//     }
// }

ReactDOM.render(<App />, document.querySelector("#root"));

export default App;
