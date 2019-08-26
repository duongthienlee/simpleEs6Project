const api = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '&appid=d3e01b57c8e66d056d203423da6682d2';

async function fetchWeather(objParams) {
    const { city, degreesType, distance } = objParams;
    // get coordinate of the chosen city
    const { lon, lat } = await getCoord(city) || {};
    //api call with Cities in cycle
    let url = `${api}find?lat=${lat}&lon=${lon}&units=metric&cnt=${distance}${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("data", data);
    const isCel = degreesType === "cel"; // detect fah & cel mode
}

async function getCoord(city) {
    let url = `${api}weather?q=${city}${apiKey}`
    let response = await fetch(url);
    let data = await response.json()
    const { coord } = data
    return coord;
}

function submitQueryParams() {
    elements = document.getElementById("weatherForm").elements;
    let objParams = {};
    for (let i = 0; i < elements.length; i++) {
        let item = elements.item(i);
        objParams[item.name] = item.value; //Property accessor
    }
    fetchWeather(objParams);
}