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
    console.log(e.target.value);

    e.preventDefault();
    const cityId = e.target.value;
    setCities({ ...cities, cityId: cityId });
    console.log(cities);
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
    </div>
  );
}

export default App;
