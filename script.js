//apikey = c1caa91fe86cd25d0f1147993b1dc17c;
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={Your Api Key}
window.addEventListener('load', getLocation);
const proxy ='https://cors-anywhere.herokuapp.com/';
const myApi = 'https://api.openweathermap.org/data/2.5/';
const key = 'c1caa91fe86cd25d0f1147993b1dc17c';
const search = document.getElementById('search');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('result-data');

//Get the weather with your location
async function getWeatherAW(lat, lon) {
    try{
        const part = 'current';
        const result = await fetch(`${proxy}${myApi}onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}&lang=en&units=metric`);
        const data = await result.json();
        console.log(data);
        const today = data.daily[0];
        console.log(`Temperatures in ${data.timezone} stay between ${today.temp.min} and ${today.temp.max}.`);
        await showdata(today);
//await trynewData(today);
    }
      catch(error) {
        alert(error);
    }
 }

 async function getWeatherSearch(lat, lon, city) {
    try{
        const part = 'current';
        const result = await fetch(`${proxy}${myApi}onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${key}&lang=en&units=metric`);
        const data = await result.json();
        console.log(data);
        const today = data.daily[0];
        console.log(`Temperatures in ${data.timezone} stay between ${today.temp.min} and ${today.temp.max}.`);
    //    await showdata(today);
        await trynewData(today, city);
    }
      catch(error) {
        alert(error);
    }
 }
 //Get the weather detail Which city-weather do you asked in the search box
 async function searchWeather() { 
  let  city = searchInput.value;
  searchInput.value = '';
  try{
      const results = await fetch(`${proxy}${myApi}weather?q=${city}&appid=${key}&units=metric`);
      const data = await results.json();
      console.log(data);
     const searchCoord = data.coord;
     // console.log(`cooradinate are lat ${today.coord.lat} and ${today.coord.lon}`);
     console.log(`${city} that you search in current time.`);
    await searchPosition(searchCoord, city);
    await trynewData(city);
  }
    catch(error) {
      alert(error);
  }
}
function searchPosition (position, city) {
  getWeatherSearch(position.lat, position.lon, city);
  console.log(`lat: ${position.lat} and lon: ${position.lon}`);
}

  var d = new Date();
  document.querySelector('#date').innerHTML =  d;
 function showdata(today) {
//console.log(document.getElementById("mainDemo"));
  document.querySelector('h1').innerHTML = today.temp.day;
  document.querySelector('#max').innerHTML = today.temp.max;
  document.querySelector('#min').innerHTML = today.temp.min;
  document.querySelector('#description').innerHTML = today.weather[0].description;
  document.querySelector('#wind').innerHTML = today.wind_speed;
  document.querySelector('#dewpoint').innerHTML = today.dew_point;
  document.querySelector('#cloud').innerHTML = today.clouds;
  
 }
function getLocation() {
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(showPosition);
   //  navigator.geolocation.getCurrentPosition(getWeatherAW( position.coords.latitude, position.coords.longitude));
   } else { 
     x.innerHTML = "Geolocation is not supported by this browser.";
   }
 }
  function showPosition(position) {
   getWeatherAW( position.coords.latitude, position.coords.longitude);
  
} 


   /*
 function appendData(data) {
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
      mainContainer.appendChild(div);
  }}*/
/*let dataAria; 
getWeatherAW(2487956).then(data => {
    dataLondon = data
    console.log(dataAria);
});*/
search.addEventListener('submit', e => {
  e.preventDefault();
  searchWeather();
});

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
