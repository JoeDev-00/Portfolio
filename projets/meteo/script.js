document.addEventListener("DOMContentLoaded", () => {
    // API Key for OpenWeatherMap (you would need to get your own API key)
    const apiKey = "b0712c27927d3466b02cba5e1cb52a06" // Replace with your actual API key
  
    // DOM Elements
    const searchInput = document.getElementById("search-input")
    const searchBtn = document.getElementById("search-btn")
    const locationBtn = document.getElementById("location-btn")
    const cityName = document.getElementById("city-name")
    const date = document.getElementById("date")
    const weatherIcon = document.getElementById("weather-icon")
    const temperature = document.getElementById("temperature")
    const weatherDescription = document.getElementById("weather-description")
    const windSpeed = document.getElementById("wind-speed")
    const humidity = document.getElementById("humidity")
    const feelsLike = document.getElementById("feels-like")
    const forecastContainer = document.getElementById("forecast-container")
    const sunrise = document.getElementById("sunrise")
    const sunset = document.getElementById("sunset")
    const airQualityIndicator = document.getElementById("air-quality-indicator")
    const airQualityText = document.getElementById("air-quality-text")
    const loading = document.getElementById("loading")
    const errorMessage = document.getElementById("error-message")
    const errorText = document.getElementById("error-text")
    const errorCloseBtn = document.getElementById("error-close-btn")
  
    // Functions
    function formatDate(timestamp) {
      const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
      const months = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
      ]
  
      const date = new Date(timestamp * 1000)
      const day = days[date.getDay()]
      const dateNum = date.getDate()
      const month = months[date.getMonth()]
      const year = date.getFullYear()
  
      return `${day}, ${dateNum} ${month} ${year}`
    }
  
    function formatTime(timestamp) {
      const date = new Date(timestamp * 1000)
      let hours = date.getHours()
      let minutes = date.getMinutes()
  
      hours = hours < 10 ? "0" + hours : hours
      minutes = minutes < 10 ? "0" + minutes : minutes
  
      return `${hours}:${minutes}`
    }
  
    function getWeatherData(city) {
      showLoading()
  
      // Current weather API call
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ville non trouvée")
          }
          return response.json()
        })
        .then((data) => {
          updateCurrentWeather(data)
  
          // Get coordinates for forecast API call
          const { lat, lon } = data.coord
          return fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${apiKey}`,
          )
        })
        .then((response) => response.json())
        .then((data) => {
          updateForecast(data)
          hideLoading()
        })
        .catch((error) => {
          showError(error.message)
          hideLoading()
        })
    }
  
    function getWeatherByLocation() {
      showLoading()
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
  
            // Current weather API call by coordinates
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`,
            )
              .then((response) => response.json())
              .then((data) => {
                updateCurrentWeather(data)
  
                // Forecast API call
                return fetch(
                  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${apiKey}`,
                )
              })
              .then((response) => response.json())
              .then((data) => {
                updateForecast(data)
                hideLoading()
              })
              .catch((error) => {
                showError("Erreur lors de la récupération des données météo")
                hideLoading()
              })
          },
          (error) => {
            showError("Impossible d'accéder à votre position")
            hideLoading()
          },
        )
      } else {
        showError("La géolocalisation n'est pas prise en charge par votre navigateur")
        hideLoading()
      }
    }
  
    function updateCurrentWeather(data) {
      cityName.textContent = data.name
      date.textContent = formatDate(data.dt)
      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
      temperature.textContent = `${Math.round(data.main.temp)}°C`
      weatherDescription.textContent = data.weather[0].description
      windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h` // Convert m/s to km/h
      humidity.textContent = `${data.main.humidity}%`
      feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`
  
      // Update sunrise and sunset
      sunrise.textContent = formatTime(data.sys.sunrise)
      sunset.textContent = formatTime(data.sys.sunset)
  
      // Simulate air quality (since it requires a separate API call)
      const airQualityValue = Math.floor(Math.random() * 100)
      airQualityIndicator.querySelector(".indicator-level").style.width = `${airQualityValue}%`
  
      if (airQualityValue < 50) {
        airQualityText.textContent = "Bonne"
        airQualityText.style.color = "var(--success-color)"
      } else if (airQualityValue < 80) {
        airQualityText.textContent = "Moyenne"
        airQualityText.style.color = "var(--warning-color)"
      } else {
        airQualityText.textContent = "Mauvaise"
        airQualityText.style.color = "var(--danger-color)"
      }
  
      // Save to localStorage
      saveToLocalStorage(data.name)
    }
  
    function updateForecast(data) {
      forecastContainer.innerHTML = ""
  
      // Get one forecast per day (at noon)
      const dailyForecasts = data.list
        .filter((item) => {
          const date = new Date(item.dt * 1000)
          return date.getHours() === 12
        })
        .slice(0, 5) // Get only 5 days
  
      dailyForecasts.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000)
        const dayName = date.toLocaleDateString("fr-FR", { weekday: "short" })
  
        const forecastItem = document.createElement("div")
        forecastItem.classList.add("forecast-item")
  
        forecastItem.innerHTML = `
                  <div class="forecast-day">${dayName}</div>
                  <div class="forecast-icon">
                      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
                  </div>
                  <div class="forecast-temp">${Math.round(forecast.main.temp)}°C</div>
              `
  
        forecastContainer.appendChild(forecastItem)
      })
    }
  
    function showLoading() {
      loading.style.display = "flex"
    }
  
    function hideLoading() {
      loading.style.display = "none"
    }
  
    function showError(message) {
      errorText.textContent = message
      errorMessage.style.display = "block"
  
      // Auto hide after 5 seconds
      setTimeout(() => {
        errorMessage.style.display = "none"
      }, 5000)
    }
  
    function saveToLocalStorage(city) {
      localStorage.setItem("lastCity", city)
    }
  
    function loadFromLocalStorage() {
      const lastCity = localStorage.getItem("lastCity")
      if (lastCity) {
        getWeatherData(lastCity)
      } else {
        // Default city
        getWeatherData("Paris")
      }
    }
  
    // Event Listeners
    searchBtn.addEventListener("click", () => {
      const city = searchInput.value.trim()
      if (city) {
        getWeatherData(city)
      }
    })
  
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const city = searchInput.value.trim()
        if (city) {
          getWeatherData(city)
        }
      }
    })
  
    locationBtn.addEventListener("click", getWeatherByLocation)
  
    errorCloseBtn.addEventListener("click", () => {
      errorMessage.style.display = "none"
    })
  
    // Initialize
    loadFromLocalStorage()
  
    // Add animation for forecast items
    const style = document.createElement("style")
    style.textContent = `
          .forecast-item {
              animation: fadeIn 0.5s ease forwards;
              opacity: 0;
          }
          
          @keyframes fadeIn {
              0% {
                  opacity: 0;
                  transform: translateY(20px);
              }
              100% {
                  opacity: 1;
                  transform: translateY(0);
              }
          }
      `
    document.head.appendChild(style)
  })
  
  