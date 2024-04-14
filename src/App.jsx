import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setDate] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = "36da81e694286b89ea61d03d54fa99d1";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const searchLocation = (event) => {
      if (event.key === "Enter") {
        axios.get(url).then((response) => {
          setDate(response.data);
          console.log(response.data);
        });
        setLocation("");
      }
    };
    document.addEventListener("keypress", searchLocation);
    return () => document.removeEventListener("keypress", searchLocation);
  }, [url]);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              ) : null}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
