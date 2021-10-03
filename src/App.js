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

  //handle the changes in the select
  function handleChange(e) {
    e.preventDefault();
    const cityId = e.target.value;
    setCities({ ...cities, cityId: cityId });
    // fetchWeather();
  }
  const fetchWeather = async () => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${cities.cityId}&appid=538882fc8387290c6cee83f313a6acf5`
    );
    // console.log('weatherdata:', result.data);
    // setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    // SetCityWeather((cityWeather) => ({
    //   ...cityWeather,
    //   cityWeather: result.data,
    // }));
    setCityWeather({ cityWeather: result.data });
    // setCityWeather((cityWeather) => ({
    //   ...cityWeather,
    //   cityWeather: result.data,
    // }));
    // console.log('weather of the city', cityWeather);
  };

  useEffect(() => {
    fetchWeather();
  }, [cities]);
  //useEffect
  // useEffect(() => {
  //   fetchWeather();
  // }, [cities]);

  return (
    <div className="app">
      <select onChange={(e) => handleChange(e)}>
        {cities.cityInfo.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <div className="city-weather">
        {/* <p>{result.data.weather.main}</p> */}
      </div>
    </div>
  );
}

export default App;
