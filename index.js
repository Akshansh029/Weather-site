let weatherForm = document.querySelector(".input-form");
let cityInput = document.getElementById("city-input");
let errorMsg = document.querySelector(".errorMsg");
let displayCity = document.getElementById("displayCity");
let weatherDescription = document.getElementById("weatherDescription");
let displayMinMax = document.getElementById("displayMinMax");
let coordinates = document.getElementById("coordinates");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let date = document.getElementById("dateToday");
let temp = document.getElementById("displayTemp");
const apiKey = "c2e1022d0a71a8f69369dfc538456e5b";

const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateNow = new Date();
let presentDate = dateNow.getDate();
let presentDay = dateNow.getDay();
let presentMonth = dateNow.getMonth();
let presentYear = dateNow.getFullYear();
date.textContent = `${week[presentDay]}, ${presentDate} ${month[presentMonth]}, ${presentYear}`;

weatherForm.addEventListener("submit", async event => {
    const city = cityInput.value;
    event.preventDefault();

    if(city == ""){
        // displayError("Please enter a valid city name");
    }
    // else if(!response.ok){
    //     errorMsg.style.display = "block";
    //     errorMsg.textContent = "Please enter a valid city name"; 
    // }
    else{
        errorMsg.style.display = "none";
    }

    displayWeatherInfo(city);
    
})

function displayError(message){
    errorMsg.style.display = "block";
    errorMsg.textContent = message; 
}

async function displayWeatherInfo(city){
    const urlWithApiKey = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try{
        const response = await fetch(urlWithApiKey);
    if(!response.ok){
        throw new Error("Could not fetch data");
    }
    const data = await response.json();
    console.log(data);
    displayCity.textContent = data.name;
    temp.textContent = `${(data.main.temp-273).toFixed(1)}℃`;
    weatherDescription.textContent = data.weather[0].main;
    displayMinMax.textContent = `${(data.main.temp_max-273).toFixed(1)}/${(data.main.temp_min-273).toFixed(2)}`;
    coordinates.textContent = `Lat: ${(data.coord.lat).toFixed(1)}\nLon: ${(data.coord.lon).toFixed(1)}`;
    wind.textContent = `${data.wind.speed} kmph`
    humidity.textContent = `${data.main.humidity}%`
    }
    catch(error){
        displayError(error);
        console.log(error);
    }
} 
