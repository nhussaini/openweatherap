import axios from 'axios';
import { useEffect, useState } from 'react';

import './App.css';

function App() {
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

  //handle the changes in the select
  function handleChange(e) {
    e.preventDefault();
    const cityId = e.target.value;
    setCities({ ...cities, cityId: cityId });
  }
  const fetchWeather = async () => {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?id=${cities.cityId}&appid=538882fc8387290c6cee83f313a6acf5`
    );
    console.log('weatherdata:', result);
  };

  //useEffect
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="app">
      <select onChange={(e) => handleChange(e)}>
        {cities.cityInfo.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
