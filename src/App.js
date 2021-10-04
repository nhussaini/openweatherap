import axios from 'axios';
import { useEffect, useState } from 'react';

import './App.scss';
import CityWeather from './components/CityWeather';
import HourlyForecast from './components/HourlyForecast';
import SeveDayForecast from './components/SeveDayForecast';

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
  //state for future days
  const [daysWeather, setDaysWeather] = useState({});

  //handle the changes in the select
  function handleChange(e) {
    const cityId = e.target.value;
    setCities({ ...cities, cityId: cityId });
    setForcast(false);
  }

  //fetch weather data for the day
  const fetchWeather = async () => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${cities.cityId}&units=metric&appid=538882fc8387290c6cee83f313a6acf5`
    );

    setCityWeather(result.data);
  };

  //fetch weather for hourly and seven days
  const weatherForcast = async () => {
    const result =
      await axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cities.cityId}&units=metric&appid=538882fc8387290c6cee83f313a6acf5
    `);
    setForcastHourly(result.data);
    const result1 = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cityWeather.coord.lat}&lon=${cityWeather.coord.lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=538882fc8387290c6cee83f313a6acf5`
    );
    setDaysWeather(result1.data.daily);
    setForcast(true);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [cities]);

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
        <CityWeather
          cityWeather={cityWeather}
          forcast={forcast}
          closeForeCast={closeForeCast}
          weatherForcast={weatherForcast}
        />
      )}

      {forcast && (
        <>
          <HourlyForecast forcastHourly={forcastHourly} />
          <SeveDayForecast daysWeather={daysWeather} />
        </>
      )}
    </div>
  );
}

export default App;
