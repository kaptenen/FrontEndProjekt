$(document).ready(function () {
    let url =
        "http://api.openweathermap.org/data/2.5/weather?id=2711537&units=metric&appid=525541f98425fa99c0ea37227ef874dc";
    let request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function () {
        let data = JSON.parse(request.responseText);

        document.getElementById("city-name").innerHTML = data.name;

        let t = data.main.temp;
        let temperature = parseFloat(t.toFixed(1));

        document.getElementById("temp").innerHTML = `${temperature}°C`;

        let weatherDescription = data.weather[0].main;
        document.getElementById(
            "weather-description"
        ).innerHTML = weatherDescription;

        let weatherType = data.weather[0].id;

        if (weatherType >= 200 && weatherType <= 232) {
            document.getElementById("current-weather").src = "IMG/weatherImg/thunderstorm.svg";
        } else if (weatherType >= 300 && weatherType <= 531) {
            document.getElementById("current-weather").src = "IMG/weatherImg/rain.svg";
        } else if (weatherType >= 600 && weatherType <= 622) {
            document.getElementById("current-weather").src = "IMG/weatherImg/snow.svg";
        } else if (weatherType >= 701 && weatherType <= 781) {
            document.getElementById("current-weather").src = "IMG/weatherImg/haze.svg";
        } else if (weatherType == 800) {
            document.getElementById("current-weather").src = "IMG/weatherImg/sun.svg";
        } else if (weatherType >= 801 && weatherType <= 802) {
            document.getElementById("current-weather").src = "IMG/weatherImg/cloud.svg";
        } else if (weatherType >= 803 && weatherType <= 804) {
            document.getElementById("current-weather").src = "IMG/weatherImg/solidcloud.svg";
        }

        /* SUNRISE AND SUNSET */

        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;

        let sunUp = new Date(sunrise * 1000);
        let sunDown = new Date(sunset * 1000);

        let upHours = sunUp.getHours();
        let upMinutes = sunUp.getMinutes();

        let downHours = sunDown.getHours();
        let downMinutes = sunDown.getMinutes();

        if (upHours < 12) {
            upHours = "0" + upHours;
        } else if (upMinutes < 10) {
            upMinutes = "0" + upMinutes;
        } else if (downMinutes < 10) {
            downMinutes = "0" + downMinutes;
        }

        document.getElementById("sunrise").innerHTML = `${upHours}:${upMinutes}`;
        document.getElementById("sunset").innerHTML = `${downHours}:${downMinutes}`;
        /* END */

        /* WIND */
        let wind = data.wind.speed;
        document.getElementById("wind").innerHTML = ` ${wind}m/s`;
        /* END */
    };
    request.send();
});