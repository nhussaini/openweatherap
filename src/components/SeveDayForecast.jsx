import React from 'react';
import { getDay } from '../helperFunctions/helperFunctions';

function SeveDayForecast({ daysWeather }) {
  return (
    <div className="seven-day-forecast-container">
      {daysWeather.slice(1).map((day) => (
        <div className="seven-day-forecast" key={day.dt}>
          <p className="time">{getDay(day.dt)}</p>
          <div className="icon-container">
            <img
              className="img-container"
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="how the weather looks"
            />
          </div>
          <p className="temp">{Math.floor(day.temp.day)}°</p>
        </div>
      ))}
    </div>
  );
}

export default SeveDayForecast;
