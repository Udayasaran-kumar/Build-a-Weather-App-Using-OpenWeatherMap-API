import './App.css'
import React, { useEffect, useRef, useState } from 'react'

//https://api.openweathermap.org/data/2.5/weather?q={city}&appid=97fdbb15601f2d7e8036a9b78670b69b&units=metric
//https://api.openweathermap.org/data/2.5/weather?q={city}&appid=97fdbb15601f2d7e8036a9b78670b69b&units=metric

const App = () => {
  const [city, setCity] = useState('bangalore');
  const [report, setReport] = useState([]);
  const entercity = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchcity = entercity.current.value.trim();
    if (searchcity) {
      setCity(searchcity);
      entercity.current.value = ''; // clear input
    }
  };

  const fetchWeather = async (city) => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97fdbb15601f2d7e8036a9b78670b69b&units=metric`);
      const data = await res.json();

      const weather = {
        data: data,
        isLoading: false,
        error: ''
      };

      setReport(prev => [...prev, weather]);
    } catch (error) {
      const weather = {
        data: {},
        isLoading: false,
        error: error.message || 'Something went wrong'
      };

      setReport(prev => [...prev, weather]);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  useEffect(() => {
    console.log("Report updated:", report);
  }, [report]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' ref={entercity} placeholder='Enter city name..' />
        <button type='submit'>Search</button>
      </form>

      {report.map((entry, idx) => (
        <div key={idx} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          {entry.error ? (
            <p>Error: {entry.error}</p>
          ) : (
            <>
              <h3>State:{entry.data.name}</h3>
              <p>Temperature: {entry.data.main?.temp}°C</p>
              <p>Weather condition: {entry.data.weather?.[0]?.description}</p>
              <p>Humidity: {entry.data.main?.humidity}</p>
              <p>Speed: {entry.data.wind?.speed}m/s</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
