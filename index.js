const apiKey = "c2e1022d0a71a8f69369dfc538456e5b";
const city = "Mundra";

async function fetchWeatherData(){
    const urlWithApiKey = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try{
        const response = await fetch(urlWithApiKey);
    if(!response.ok){
        throw new Error("Could not fetch data");
    }
    // console.log(response);
    const data = await response.json();
    console.log(data);
    console.log(data.name)
    console.log(data.weather[0].description)
    }
    catch(error){
        console.log(error);
    }
}

fetchWeatherData();
