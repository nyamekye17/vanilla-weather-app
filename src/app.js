function formatDate(timestamp){ 
    let date = new Date(timestamp); 
    let hours = date.getHours(); 
    if (hours<10){ 
      hours = `0${hours}`; 
    } 
   
    let minutes = date.getMinutes(); 
    if (minutes<10){ 
      minutes = `0${minutes}`; 
    } 
   
     let days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]; 
    let day = days[date.getDay()]; 
   
   return `${day} ${hours}:${minutes}`; 
   
   } 

   function displayForecast(response){
    console.log(response.data.daily);

    let forecastElement =document.querySelector("#forecast");
    let days = ["Fri", "Sat",  "Sun", "Mon", "Tue", "Wed"]; 
    let forecastHTML = `<div class="row">`;
    days.forEach(function(day) {
      forecastHTML =  forecastHTML + `
      <div class="col-2">
          <div class="weather-forecast-date">
     ${day}
  </div>
       <img class="image-prediction" src="image/sunny.cloudy.png">
       <div class="weather-forecast-temperature">
          <span class="weather-forecast-max">31°</span>
       <span class="weather-forecast-min">23°</span> 
      </div>
      </div>    
      `;
    })
  
    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
   }
   
   function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "4f0a4d1c93b046bb93530ef7o3ded40t";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

  }

function displayTemperature(response){
  event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusTemperature=response.data.main.temp
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement=document.querySelector("#date"); 
    dateElement.innerHTML= formatDate(response.data.dt*1000); 
    iconElement = document.querySelector("#icon"); 
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute("alt", response.data.weather[0].description); 

getForecast(response.data.coord);
}

function searchCity(city) {
let apiKey = "e97ae5d675e4c0ea5fe7521c6da29471";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature)

}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
searchCity(cityInputElement.value);
}
function displayFahrenheitTemperature(event){
event.preventDefault();
celsiusElement.classList.remove("active");
fahrenheitElement.classList.add("active")
let temperatureElement = document.querySelector("#temperature");
let fahrenheitTemperature= (celsiusTemperature * 9/5) + 32
temperatureElement.innerHTML = Math.round(fahrenheitTemperature)
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusElement.classList.add("active");
fahrenheitElement.classList.remove("active")
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML =Math.round(celsiusTemperature);

}

let celsiusTemperature=null;

let search= document.querySelector("#city-search");
search.addEventListener("submit", handleSubmit);

let fahrenheitElement = document.querySelector("#fahrenheit-link");
fahrenheitElement.addEventListener("click", displayFahrenheitTemperature);

let celsiusElement = document.querySelector("#celsius-link");
celsiusElement.addEventListener("click", displayCelsiusTemperature);

searchCity("Accra");
