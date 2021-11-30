import React, { useState } from "react";
import { render } from "react-dom";
import axios from "axios";

const WeatherApp = () => {
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("Toronto");
  const [country, setCountry] = useState("Canada");

  const getWeatherData = (city, country) => {
    axios({
      method: "GET",
      //api location
      url: `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=180941f68139fba12f166dc35d9b688b`,
    })
      .then((response) => {
        console.log(response.data.main.temp);
        setTemperature(response.data.main.temp - 273.15);
        setDesc(response.data.weather[0].main);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        style={{
              display: "block",
              justifyContent: "center",
              alignItems: "center",
              height: "70px",
              width: "100%",
              backgroundColor: "orange",
              fontSize: "50px",
              color: "#grey",
        }}
      >
        The Weather App
      </div>
      {<div
        style={{ 
            height: "10px", 
            width: "100%", 
            backgroundColor: "Green", 
            border: "thick" 
        }}
      ></div>}
      <br />
      <div style={{ marginLeft: "0%" }}>
        <div
              style={{
                backgroundColor: "black",
                height: "150px",
                width: "450px",
                backgroundColor: "Green",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "25px",
          }}
        >
          {new Date().toLocaleString()}
          <br />
          {city}'s Weather Forecast
          <br />          
          {Math.round(temperature * 100) / 100} ℃ - {desc}
        </div>
        <br />
        <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
        />
        <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
        />
        <button
            onClick={() => {
              getWeatherData(city, country);
            }}
        >
            <b>Submit</b>
        </button>
      </div>
    </>
  );
};

render(<WeatherApp/>, document.querySelector("#root"));

export default WeatherApp;