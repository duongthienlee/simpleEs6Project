const api = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '&appid=d3e01b57c8e66d056d203423da6682d2';

async function fetchWeather(objParams) {
    const { city, unit } = objParams || {}; // fallback {} for handling null || undefined
    let url = `${api}find?q=${city}&type=like&sort=population&units=metric${apiKey}`; //Template literals
    let response = await fetch(url);
    let data = await response.json();

    const isCelcius = unit === "celcius"; // detect fahrenheit & celcius mode
    const { list: citiesWeather } = data || {} // object destructuring
    let tbody = document.getElementById("weatherFormResult")
    // remove if there is any child
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    console.log("citiesWeather", citiesWeather)
    citiesWeather.map(element => {
        const { coord, clouds, wind, name, main: { temp, pressure, temp_max, temp_min }, weather, sys: { country } } = element
        let tRow = document.createElement('tr');
        tRow.id = "row";
        let td = `
                <td>
                    <img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].main}" />
                </td>
                <td>
                    <b class="link">${name}, ${country}</b>
                    <img src="http://openweathermap.org/images/flags/${country.toLowerCase()}.png">
                    <b><i>${weather[0].description}</i></b>
                    <p>
                    <span class="badge badge-info">${convertTempMode(isCelcius, temp)}</span>
                    temperature from ${convertTempMode(isCelcius, temp_min)} to ${convertTempMode(isCelcius, temp_max)}, wind ${wind.speed} m/s. clouds ${clouds.all} %, ${pressure} hpa
                    </p>
                    <p class="link">Geo coords [${coord.lat}, ${coord.lon}] </p>
                </td>
            `
        tRow.innerHTML = td;
        tbody.appendChild(tRow)
    })
}

const submitQueryParams = () => {
    elements = document.getElementById("weatherForm").elements;
    let objParams = {};
    for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        objParams[item.name] = item.value; //Property accessor
    }
    fetchWeather(objParams);
}
const convertTempMode = (isCelcius, temp) => {
    let fahrenheit = Math.floor(((temp * 9 / 5) + 32) * 10) / 10
    return isCelcius ? `${Math.floor(temp * 10) / 10} °C` : `${fahrenheit} °F`
}