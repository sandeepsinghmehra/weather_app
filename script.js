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


var date = new Date();  //make a Date object 
dateCurrent.innerHTML = date;     //Show the date in html page

//Get the weather with your location
async function getWeatherAW(lat, lon) {
    try{ 
        const result = await fetch(`${proxy}${myApi}onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}&lang=en&units=metric`);
        const data = await result.json();
    //    console.log(data);
        const today = data.daily[0];
    //    console.log(`Temperatures in ${data.timezone} stay between ${today.temp.min} and ${today.temp.max}.`);
        await showdata(today);
    }
      catch(error) {
        alert(error);
    }
 }

 async function getWeatherSearch(lat, lon, city) {
    try{
        const result = await fetch(`${proxy}${myApi}onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}&lang=en&units=metric`);
        const data = await result.json();
    //    console.log(data);
        const today = data.daily[0];
     //   console.log(`Temperatures in ${data.timezone} stay between ${today.temp.min} and ${today.temp.max}.`);
        await trynewData(today, city);
    }
      catch(error) {
        alert(error);
    }
 }
 //Get the weather detail Which city-weather do you asked in the search box
 async function searchWeather() { 
  const  city = searchInput.value;
  searchInput.value = '';
  try{
      const results = await fetch(`${proxy}${myApi}weather?q=${city}&appid=${key}&units=metric`);
      const data = await results.json();
      console.log(data);
      const searchCoord = data.coord;// console.log(`cooradinate are lat ${today.coord.lat} and ${today.coord.lon}`);
      await searchPosition(searchCoord, data.name);
  }
    catch(error) {
      alert(error);
  }
}

 
function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
   } else { 
     x.innerHTML = "Geolocation is not supported by this browser.";
   }
 }
function showPosition(position) {
   getWeatherAW(position.coords.latitude, position.coords.longitude);
}

function searchPosition (position, city) {
  getWeatherSearch(position.lat, position.lon, city); //console.log(`lat: ${position.lat} and lon: ${position.lon}`);
}

//Seaching city on the search button
search.addEventListener('submit', e => {
  e.preventDefault();
  searchWeather();
});

//Entire data will be send the html page
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
        <div class="grid-container" id="firstGridcont">
        <div class="grid-item">
           <p style="margin-bottom: 0px; margin-top: 1.2em;">Min.</p>
           <i class="fas fa-temperature-low fa-2x"></i><br>
           <p id="min" style="margin-top: 0.25em;">${today.temp.min}</p> <span class="mn">°</span>
        </div>
        <div class="grid-item">
            <h1 style="font-size:50px;"></h1>
            <span style="font-size:50px;">${today.temp.day}°</span><br>
            <span id="description" style="font-size:25px;">${today.weather[0].description}</span>
         </div>
            <div class="grid-item" >
                <p style="margin-bottom: 0px; margin-top: 1.2em;">Max.</p>
                <i class="fas fa-temperature-high fa-2x"></i><br>
                <p id="max" style="margin-top: o.25em;">${today.temp.max}</p><span class="mn">°</span>
            </div>
      </div>
`;
     resultsContainer.innerHTML = htmlcode;           
}
//window.addEventListener('load', getLocation());