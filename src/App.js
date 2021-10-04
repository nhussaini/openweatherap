import axios from 'axios';
import { useEffect, useState } from 'react';

import './App.css';

function App() {
  //state for cities
  const [cities, setCities] = useState({
    cityId: 6167865,
    cityInfo: [
      {
        id: 6167865,
        name: 'Toronto',
        country: 'CA',
      },
      {
        id: 6094817,
        name: 'Ottawa',
        country: 'CA',
      },
      {
        id: 1850147,
        name: 'Tokyo',
        country: 'JP',
      },
    ],
  });
  //state for a city weather
  const [cityWeather, setCityWeather] = useState({});
  //state to forcast the future hours for a city
  const [forcastHourly, setForcastHourly] = useState({});
  const [forcast, setForcast] = useState(false);

  //handle the changes in the select
  function handleChange(e) {
    e.preventDefault();
    const cityId = e.target.value;
    setCities({ ...cities, cityId: cityId });
    // fetchWeather();
  }
  const fetchWeather = async () => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${cities.cityId}&units=metric&appid=538882fc8387290c6cee83f313a6acf5`
    );
    // console.log('weatherdata:', result.data);
    // setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    // SetCityWeather((cityWeather) => ({
    //   ...cityWeather,
    //   cityWeather: result.data,
    // }));
    // setCityWeather({ cityWeather: result.data });
    setCityWeather(result.data);
    // setCityWeather((cityWeather) => ({
    //   ...cityWeather,
    //   cityWeather: result.data,
    // }));
    // console.log('weather of the city', cityWeather);
    // console.log('from line 54=>', cityWeather);
  };
  const weatherForcast = async () => {
    const result =
      await axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cities.cityId}&units=metric&appid=538882fc8387290c6cee83f313a6acf5
    `);
    console.log('weather forcast:', result.data);
    setForcastHourly(result.data);
    setForcast(true);
    // const hourlyWeatherForcast = forcastHourly.list.slice(0, 5).map((item) => {
    //   return <p>item.main.temp</p>;
    // });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [cities]);

  //extract the time from dt system and change 24 hrs to 12
  function convertDt(dt) {
    const date = new Date(dt * 1000);
    const hour = date.getHours();
    let time = '';
    if (hour > 12) {
      time = hour - 12 + 'PM';
    } else {
      time = hour + 'AM';
    }
    return time;
  }

  //close the hourlyforecase
  function closeForeCast() {
    setForcast(false);
  }

  return (
    <div className="app">
      <div className="select-container">
        <select className="select" onChange={(e) => handleChange(e)}>
          {cities.cityInfo.map((item) => (
            <option className="option" key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {cityWeather.name && (
        <div className="city-weather">
          {/* <p>Toronto</p> */}
          <p>time: {convertDt(cityWeather.dt)}</p>
          <p>{cityWeather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
            alt="how the weather is..."
          />

          {/* <p>{cityWeather.weather[0].icon}</p> */}

          <p>{Math.floor(cityWeather.main.temp)} °c</p>
          <p>
            <span>Min : {Math.floor(cityWeather.main.temp_min)} </span>
            <span>Max : {Math.floor(cityWeather.main.temp_max)}</span>
          </p>
          <p>feels like: {Math.floor(cityWeather.main.feels_like)} °c</p>
          <p>humidity: {Math.floor(cityWeather.main.humidity)}</p>
          {forcast ? (
            <button className="close-forecast" onClick={closeForeCast}>
              Close
            </button>
          ) : (
            <button className="see-forecast" onClick={weatherForcast}>
              See forcast
            </button>
          )}
        </div>
      )}

      {/* {forcast && <div className="hourly-forcast">{forcastHourly.list.slice(0, 5).map((item) => (
     <p>{item.main.temp}</p>)</div>} */}

      {forcast && (
        <div className="hourly-forecast-container">
          {forcastHourly.list.slice(0, 5).map((item) => (
            <div className="hourly-forecast" key={item.dt}>
              <p>{convertDt(item.dt)}</p>
              <p>{item.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="how the weather is..."
              />
              <p>{Math.floor(item.main.temp)}°</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
