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
      time = hour - 12 + ' pm';
    } else {
      time = hour + ' am';
    }
    return time;
  }
  return (
    <div className="app">
      <select onChange={(e) => handleChange(e)}>
        {cities.cityInfo.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      {cityWeather.name && (
        <div className="city-weather">
          {/* <p>Toronto</p> */}
          <p>time: {convertDt(cityWeather.dt)}</p>

          <p>{cityWeather.weather[0].description}</p>
          {/* <p>{cityWeather.weather[0].icon}</p> */}

          <p>{Math.floor(cityWeather.main.temp)} °c</p>
          <p>
            <span>Min : {Math.floor(cityWeather.main.temp_min)} </span>
            <span>Max : {Math.floor(cityWeather.main.temp_max)}</span>
          </p>
          <p>feels like: {Math.floor(cityWeather.main.feels_like)} °c</p>
          <p>humidity: {Math.floor(cityWeather.main.humidity)}</p>

          <button className="see-forcast" onClick={weatherForcast}>
            See forcast
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
