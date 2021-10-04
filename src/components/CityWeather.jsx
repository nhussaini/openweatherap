import React from 'react';

function CityWeather({ cityWeather, forcast, closeForeCast, weatherForcast }) {
  return (
    <div className="city-weather">
      <p className="city-name">{cityWeather.name}</p>
      <p className="weather-description">
        {cityWeather.weather[0].description}
      </p>
      <img
        className="weather-icon"
        src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
        alt="how the weather is..."
      />

      <p className="weather-degree">{Math.floor(cityWeather.main.temp)}°</p>
      <p className="weather-min-max">
        <span className="highest-degree">
          H:{Math.floor(cityWeather.main.temp_max)}°{' '}
        </span>
        <span>L:{Math.floor(cityWeather.main.temp_min)}° </span>
      </p>
      <p className="weather-feel-like">
        Feels Like:{Math.floor(cityWeather.main.feels_like)}°
      </p>
      <p className="weather-humidity">
        Humidity: {Math.floor(cityWeather.main.humidity)}
      </p>
      {forcast ? (
        <button className="close-forecast" onClick={closeForeCast}>
          Close
        </button>
      ) : (
        <button className="see-forecast" onClick={weatherForcast}>
          See Forecast
        </button>
      )}
    </div>
  );
}

export default CityWeather;
