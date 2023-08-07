const input = document.getElementById("input");
const searchButton = document.getElementById("search-button");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const image = document.getElementById("weather-img");
const loc = document.getElementById("loc");
const display = document.getElementById("display");
const apiKey = "acd7187a12cd132aff328c35b55b6dc6";

const searchFunction = () => {
    const city = input.value;

    if (city === "") {
        return;
    }
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            temperature.innerHTML = `${parseInt(
                data.main.temp
            )}<span>°C</span>`;
            condition.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;
            loc.innerHTML = `${data.name}`;

            var mainWeather = data.weather[0].main;
            var imageSource;

            if (mainWeather === "Clear") {
                imageSource = "img/clear.png";
            } else if (mainWeather === "Clouds") {
                imageSource = "img/clouds.jpg";
            } else if (mainWeather === "Rain") {
                imageSource = "img/rain.png";
            } else if (mainWeather === "Haze") {
                imageSource = "img/haze.png";
            } else if (mainWeather === "Mist") {
                imageSource = "img/mist.jpg";
            } else {
                imageSource = "img/clear.jpg";
            }
            display.classList.remove("nondisplay");
            display.classList.add("display");
            image.src = imageSource;
        })
        .catch((error) => {
            alert("Error fetching weather data. Please check location!", error);
        });
};

searchButton.addEventListener("click", searchFunction);

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});
