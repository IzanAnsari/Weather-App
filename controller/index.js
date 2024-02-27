const API_KEY = 'f59bb9999c52213653543e326e788e84'

document.querySelector('#search-bar').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default behavior of the click event
    getData();
});

async function getData() {
    try {
        const inputSearch = document.querySelector('#search-city').value || 'mumbai';
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputSearch}&limit=1&appid=${API_KEY}`);
        const data = await res.json();
        const state = data[0].state;
        const name = data[0].name;
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        const obj = {
            name, state, latitude, longitude
        };
        weather(obj);
        updateWeatherMap(latitude, longitude); // Added this line to update the weather map
    } catch (error) {
        console.log(error);
    }
}

async function weather(obj) {
    try {
        const res01 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${obj.latitude}&lon=${obj.longitude}&appid=${API_KEY}`);
        const myres01 = await res01.json();
        climate(myres01, obj);
        forecast(myres01);
    } catch (error) {
        console.log(error);
    }
}

function climate(data, obj) {
    let container = document.querySelector('#container');
    container.innerHTML = '';
    let climate = document.createElement('div');
    climate.classList.add('report01');

    climate.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" alt="weather-icon">
    <h2>${data.list[0].weather[0].description}</h2>
    <h3>${obj.name}, ${obj.state}</h3>
    <h1>Temperature: ${(data.list[0].main.temp - 273.15).toFixed(2)} °C</h1>
        <h4 class="top">${data.list[0].dt_txt.split(" ")[0]} </h4>

        <p>Humidity: ${data.list[0].main.humidity}%</p>
        <p>Pressure: ${data.list[0].main.pressure} hPa</p>
        <p>Wind Speed: ${data.list[0].wind.speed} m/s</p>
        <p>Feels Like: ${data.list[0].main.feels_like} &deg;C</p>
        <p>Sea Level: ${data.list[0].main.sea_level} hPa</p>
    `;

    container.appendChild(climate);
}

function forecast(data) {
    let container = document.querySelector('#container01');
    container.innerHTML = '';

    for (let index of [8, 16, 24, 32, 39]) {
        let weatherData = data.list[index];
        let climate = document.createElement('div');
        climate.classList.add('report');

        climate.innerHTML = `
        <h3> ${weatherData.dt_txt.split(" ")[0]}</h3>
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png" alt="weather-icon">
        <h2>${weatherData.weather[0].description}</h2>
        <p>Temperature: ${(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Visibility: ${weatherData.visibility}</p>
            <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            <p> Direction: ${weatherData.wind.deg}°</p>
        `;

        container.appendChild(climate);
    }
}

// Added function to update the weather map
function updateWeatherMap(latitude, longitude) {
    const weatherMap = document.getElementById('weather-map');
    weatherMap.src = `https://openweathermap.org/weathermap?basemap=map&cities=false&layer=clouds&lat=${latitude}&lon=${longitude}&zoom=10`;
}

getData();