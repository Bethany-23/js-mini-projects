
const apiKey = "08a6a242a4c519dffbf1034dbcf1a89d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=berlin";

const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const wind = document.querySelector(".wind")
const humidity = document.querySelector(".humidity")

async function checkWeather (){
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json;

    city.innerHTML = data.name;
    temp.innerHTML = data.main.temp;
    wind.innerHTML = data.main.wind;
    humidity.innerHTML = data.main.humidity;


    console.log(data)
}