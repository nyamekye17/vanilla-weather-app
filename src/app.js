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

   function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", ]; 
    let day = date.getDay(); 

    return days[day];
   }


   function displayForecast(response){
   let forecast = response.data.daily;

    let forecastElement =document.querySelector("#forecast");
  
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index === 1 || index === 2 || index === 3 || index === 4 || index === 5 ||index === 6 ) {
      forecastHTML =  forecastHTML + `
      <div class="col-2">
          <div class="weather-forecast-date">
     ${formatDay(forecastDay.time)}
  </div>
       <img class="image-forecast" src= ${forecastDay.condition.icon_url}>
       <div class="weather-forecast-temperature">
          <span class="weather-forecast-max">${Math.round(forecastDay.temperature.maximum)}°</span>
       <span class="weather-forecast-min">${Math.round(forecastDay.temperature.minimum)}°</span> 
      </div>
      </div>    
      `;
    }
    })
  
    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;
   }
   
   function getForecast(coordinates){
    let apiKey = "4f0a4d1c93b046bb93530ef7o3ded40t";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

  }

function displayTemperature(response){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusTemperature=response.data.temperature.current
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement=document.querySelector("#date"); 
    dateElement.innerHTML= formatDate(response.data.time*1000); 
    iconElement = document.querySelector("#icon"); 
iconElement.setAttribute("src", response.data.condition.icon_url); 
iconElement.setAttribute("alt", response.data.condition.description); 

getForecast(response.data.coordinates);
}

function searchCity(city) {
let apiKey = "4f0a4d1c93b046bb93530ef7o3ded40t";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature)

}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-text-input");
searchCity(cityInputElement.value);
}


let search= document.querySelector("#city-search");
search.addEventListener("submit", handleSubmit);


searchCity("Accra");
