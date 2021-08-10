const part = 'current';
const proxy ='https://cors-anywhere.herokuapp.com/';
const myApi = 'https://api.openweathermap.org/data/2.5/';
const key = 'c1caa91fe86cd25d0f1147993b1dc17c';
const search = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('result-data');
const dayTemp = document.querySelector('h1');
const maxTemp = document.querySelector('#max');
const minTemp = document.querySelector('#min');
const weatherDescpt = document.querySelector('#description');
const windSpeed = document.querySelector('#wind');
const dewPoint = document.querySelector('#dewpoint');
const cloud = document.querySelector('#cloud');
const dateCurrent = document.querySelector('#date');


const date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const [month, day, year] = [months[date.getMonth()], date.getDate(), date.getFullYear()];
dateCurrent.innerHTML = [month , day , year];     

//Get the weather with your location
async function getWeatherAW(lat, lon) {
    try{ 
        const result = await fetch(`${proxy}${myApi}onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}&lang=en&units=metric`);
        const data = await result.json();
        const today = data.daily[0];
        await showdata(today);
    }
      catch(error) {
        console.log(error);
    }
 }

 async function getWeatherSearch(lat, lon, city) {
    try{
        const result = await fetch(`${proxy}${myApi}onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}&lang=en&units=metric`);
        const data = await result.json();
        const today = data.daily[0];
        await trynewData(today, city);
    }
      catch(error) {
        console.log(error);
    }
 }
 //Get the weather detail Which city-weather do you asked in the search box
 async function searchWeather() { 
  const  city = searchInput.value;
  searchInput.value = '';
  try{
      const results = await fetch(`${proxy}${myApi}weather?q=${city}&appid=${key}&units=metric`);
      const data = await results.json();
      const searchCoord = data.coord;
      await searchPosition(searchCoord, data.name);
  }
    catch(error) {
      console.log(error);
  }
}

function getLocation() {
   if (navigator.geolocation) {
     return navigator.geolocation.getCurrentPosition(showPosition);
   } else { 
     x.innerHTML = "Geolocation is not supported by this browser.";
     return x.innerHTML;
   }
 }
function showPosition(position) {
   return getWeatherAW(position.coords.latitude, position.coords.longitude);
}

function searchPosition (position, city) {
  return getWeatherSearch(position.lat, position.lon, city); 
}

search.addEventListener('submit', e => {
  e.preventDefault();
  searchWeather();
});

function showdata(today) {
  const sTemp = today.temp;
  dayTemp.innerHTML = sTemp.day;
  maxTemp.innerHTML = sTemp.max;
  minTemp.innerHTML = sTemp.min;
  weatherDescpt.innerHTML= today.weather[0].description;
  windSpeed.innerHTML = today.wind_speed;
  dewPoint.innerHTML = today.dew_point;
  cloud.innerHTML = today.clouds; 
 }
function trynewData (today, city) {
     let htmlcode;
        htmlcode = `<h2 class="country-name">${city}</h2> 
        <div class="main">
        <div class="item">
           <p>Min.</p>
           <i class="fas fa-temperature-low fa-2x"></i><br>
           <p id="min">${today.temp.min}</p> <span class="mn">°</span>
        </div>
        <div class="item">
            <span style="font-size:50px;">${today.temp.day}°</span><br>
            <span id="description">${today.weather[0].description}</span>
         </div>
            <div class="item" >
                <p>Max.</p>
                <i class="fas fa-temperature-high fa-2x"></i><br>
                <p id="max">${today.temp.max}</p><span class="mn">°</span>
            </div>
      </div>
`;
     resultsContainer.innerHTML = htmlcode;           
}