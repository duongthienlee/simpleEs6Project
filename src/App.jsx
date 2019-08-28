import React, { useState, useReducer } from "react"
import { convertTempMode } from 'components/helper'
import TickBox from 'components/TickBox'
const api = 'https://api.openweathermap.org/data/2.5/'
const apiKey = '&appid=d3e01b57c8e66d056d203423da6682d2'

const App = () => {
  const [citiesWeather, setCitiesWeather] = useState([])
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }), { city: '', unit: 'cel' }
  );
  async function fetchWeather() {
    const { city } = userInput
    let url = `${api}find?q=${city}&type=like&sort=population&units=metric${apiKey}`; //template literals and placeholders
    let response = await fetch(url)
    let data = await response.json()
    const { list: citiesWeather } = data || {} // object destructuring
    return setCitiesWeather(citiesWeather)
  }
  const handleChange = e => {
    e.preventDefault()
    setUserInput({ [e.target.name]: e.target.value })
  }

  const submitQueryParams = (e) => {
    e.preventDefault(); // prevent refresh
    fetchWeather()
  }

  const isCelcius = userInput.unit === "cel" // detect fahrenheit & celcius mode
  return (
    <div className="weather-app">
      <div className="form-container">
        <h1>Weather in your city</h1>
        <form onSubmit={(e) => submitQueryParams(e)}>
          <div className="form-group">
            <input placeholder="Enter Berlin, DE or Berlin" type="text" name="city" value={userInput.city} onChange={(e) => handleChange(e)} required />
            <input type="submit" value="Search" />
          </div>
        </form>
        <div className="checkbox-units">
          <h3>Unit</h3>
          <TickBox
            onClick={() => setUserInput({ unit: "cel" })}
            label={"Celcius"}
            isActive={userInput.unit === "cel"}
          />
          <TickBox
            onClick={() => setUserInput({ unit: "fah" })}
            label={"Fahrenheit"}
            isActive={userInput.unit === "fah"}
          />
        </div>
      </div>

      <table>
        <tbody id="weatherFormResult">
          {citiesWeather.map((element, index) => {
            const { coord, clouds, wind, name, main: { temp, pressure, temp_max, temp_min }, weather, sys: { country } } = element;
            return (
              <tr key={index}>
                <td>
                  <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt={`${weather[0].main}`} />
                </td>
                <td>
                  <b className="link">{name}, {country}&nbsp;</b>
                  <img src={`http://openweathermap.org/images/flags/${country.toLowerCase()}.png`} />
                  <b><i>&nbsp;{weather[0].description}</i></b>
                  <p>
                    <span className="badge badge-info">{convertTempMode(isCelcius, temp)}</span>&nbsp;
                    temperature from {convertTempMode(isCelcius, temp_min)} to {convertTempMode(isCelcius, temp_max)}, wind {wind.speed} m/s. clouds {clouds.all} %, {pressure} hpa
                </p>
                  <p className="link">Geo coords [{coord.lat}, {coord.lon}] </p>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;