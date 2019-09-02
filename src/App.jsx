import React, { useState } from "react"
import TickBox from 'components/TickBox'
import Form from 'components/Form'
import TableResult from 'components/TableResult'

const api = 'https://api.openweathermap.org/data/2.5/'
const apiKey = '&appid=eb110e4bb56f4a27e5e7e91f69a5e084'

const App = () => {
  const [citiesWeather, setCitiesWeather] = useState([])
  // const [uniqueCityWeather, setUniqueCityWeather] = useState([])
  const [userInput, setUserInput] = useState({ city: '', unit: 'cel', })//  trailing comma(s)
  const isCelcius = userInput.unit === "cel" // detect fahrenheit & celcius mode

  async function fetchWeather() {
    const { city } = userInput // object destructuring
    let url = `${api}find?q=${city}&type=like&sort=population&units=metric${apiKey}`; //template literals and placeholders
    let response = await fetch(url)
    let data = await response.json()
    const { list: citiesWeather } = data || {}
    //  let uniqueSet = new Set();

    /* let uniqueList = citiesWeather.filter((item) => {
       let key = item.name, isNew = !uniqueSet.has(key);
       isNew && uniqueSet.add(key)
       return isNew
     })*/
    console.log("citiesWeather", citiesWeather)
    return setCitiesWeather(citiesWeather)//, setUniqueCityWeather(uniqueList)
  }


  return (
    <div className="weather-app">
      <div className="form-container">
        <h1>Weather in your city</h1>
        <Form
          callbackSubmit={() => fetchWeather()}
          inputValue={userInput.city}
          handleChangeCallBack={(e) => setUserInput({ ...userInput, [e.target.name]: e.target.value })} //computed property names
        />
        <div className="checkbox-units">
          <h3>Unit</h3>
          <TickBox
            onClick={() => setUserInput({ ...userInput, unit: "cel" })}
            label={"Celcius"}
            isActive={userInput.unit === "cel"}
          />
          <TickBox
            onClick={() => setUserInput({ ...userInput, unit: "fah" })}
            label={"Fahrenheit"}
            isActive={userInput.unit === "fah"}
          />
        </div>
        <div></div>
      </div>
      <TableResult
        citiesWeather={citiesWeather}
        isCelcius={isCelcius}
      />

    </div>
  );
};

export default App;