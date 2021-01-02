import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const WeatherCard = ({
  city,
  country,
  weatherIcon,
  celcius,
  temp_min,
  temp_max,
  description,
}) => {
  return (
    <div className="container">
      <div className="cards pt-4">
        <h1>
          {city}, {country}
        </h1>
        <h5 className="py-4">
          <i className={`wi ${weatherIcon} display-1`} />
        </h5>
        <h1 className="py-2">{celcius}&deg;</h1>
        {/**add minMaxTemp */}
        {minMaxTemp(temp_min, temp_max)}
        <h4 className="py-3">{description}</h4>
      </div>
    </div>
  );
};

function minMaxTemp(min, max) {
  return (
    <h3>
      <span className="px-4">{min}&deg;</span>
      <span className="px-4">{max}&deg;</span>
    </h3>
  );
}



export default WeatherCard;
