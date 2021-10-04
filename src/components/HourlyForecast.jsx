import React from 'react';
import { convertDt } from '../helperFunctions/helperFunctions';
function HourlyForecast({ forcastHourly }) {
  return (
    <div className="hourly-forecast-container">
      {forcastHourly.list.slice(0, 7).map((item) => (
        <div className="hourly-forecast" key={item.dt}>
          <p className="time">{convertDt(item.dt)}</p>
          <p className="description">{item.weather[0].description}</p>
          <div className="image-container">
            <img
              className="hourly-icon"
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt="how the weather is..."
            />
          </div>
          <p className="temperature">{Math.floor(item.main.temp)}°</p>
        </div>
      ))}
    </div>
  );
}

export default HourlyForecast;
