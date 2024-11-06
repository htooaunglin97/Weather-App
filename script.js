const getWeather = () => {
  const apiKey = "";
  const city = document.querySelector("#city").value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(err => {
      console.error("Error fetching weather data:", err);
      alert("An error occurred while fetching weather data. Please try again.");
    });
  
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayHourlyForecast(data);
    })
    .catch(err => {
      console.error("Error fetching hourly forecast  data:", err);
      alert("An error occurred while fetching hourly forecast data. Please try again.");
    });
}

const displayWeather = data => {
  const weatherContainer = document.querySelector("#weather-container");
  const tempDivInfo = document.querySelector("#temp-div");
  const weatherInfoDiv = document.querySelector("#weather-info");
  const weatherIcon = document.querySelector("#weather-icon");
  const hourlyForecastDiv = document.querySelector("#hourly-forecast");

  weatherInfoDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';

  if (data.cod === '404') {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `
      <p>${temperature}°C</p>
    `;
    const weatherHTML = `
      <p>${cityName}</p>
      <p>${description}</p>
    `;
    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    // Add expanded class for animation
    weatherContainer.classList.add("expanded");

    showImage();
  }
};


const displayHourlyForecast = hourlyData => {
  const hourlyForecastDiv = document.querySelector("#hourly-forecast");
  const next24Hours = hourlyData.list.slice(0, 8);

  next24Hours.forEach(item => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHTML = `
      <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}°C</span>
      </div>
    `;
    hourlyForecastDiv.innerHTML += hourlyItemHTML;
  });
};


const showImage = () => {
  const weatherIcon = document.querySelector('#weather-icon');
  weatherIcon.style.display = 'block';
}