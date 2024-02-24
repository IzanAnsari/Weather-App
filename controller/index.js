  const API_KEY = 'f59bb9999c52213653543e326e788e84'

document.querySelector('#search-bar').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default behavior of the click event
    getData();
});

async function getData() {
    try {
        const inputSearch = document.querySelector('#search-city').value || 'mumbai';
        // console.log(inputSearch);
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputSearch}&limit=1&appid=${API_KEY}`);
        // console.log(res);
        const data = await res.json();
        console.log(data); // Use data.name for the city name
        const name = (data[0].name)
        const latitude = (data[0].lat)
        const longitude = (data[0].lon)
        // console.log(name,latitude,longitude);
        weather(name,latitude,longitude)
        // climate(data);
    } catch (error) {
        console.log(error);
    }
}

async function weather (name,latitude,longitude){
    try {
        const res01 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        const myres01 = await res01.json();
        console.log(myres01);
        climate(myres01,name)
        forecast(myres01)
    } catch (error) {
        console.log(error);
    }
}
// weather()
// console.log(input);


function climate(data,name) {
    let container = document.querySelector('#container');
    container.innerHTML='';
    let climate = document.createElement('div');
    climate.classList.add('report01');

    climate.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" alt="weather-icon">
    <h2> ${data.list[0].weather[0].description}</h2>
    <h3>${name} </h3>
    <h1>Temperature: ${data.list[0].main.temp}&deg;C</h1>
        
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
        console.log(weatherData);
        let climate = document.createElement('div');
        climate.classList.add('report');

        climate.innerHTML = `
        <h3> ${weatherData.dt_txt.split(" ")[0]}</h3>
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png" alt="weather-icon">
        <h2>${weatherData.weather[0].description}</h2>
            <p>Temperature: ${weatherData.main.temp} K</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Visibility: ${weatherData.visibility}</p>
            <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            <p> Direction: ${weatherData.wind.deg}°</p>
        `;

        container.appendChild(climate);
    }
}


getData()

