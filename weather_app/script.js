
const apiKey = "08a6a242a4c519dffbf1034dbcf1a89d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const wind = document.querySelector(".wind")
const humidity = document.querySelector(".humidity")

const searchBox = document.getElementById("input")
const searchBtn = document.getElementById("search-btn")

async function checkWeather (city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json;

    city.innerHTML = data.name;
    temp.innerHTML = data.main.temp + "°C";
    wind.innerHTML = data.main.wind + " km/h";
    humidity.innerHTML = data.main.humidity + "%";
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
});