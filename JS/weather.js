$(document).ready(function () {
    $("#toggle-weather").click(function () {
        $(".current-weather").slideToggle();
    });
});

const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];

function calculateDayOfWeek(unixEpoch) {
    return (
        new Date(unixEpoch * 1000)
            .getDay()
    )
}

function retrieveWeatherIcon(weatherTypeID, weatherIcon) {

    if (weatherTypeID > 0 && weatherTypeID < 5) {
        weatherIcon = "weatherImg/sun.svg";

    }
    else if (weatherTypeID == 5 || weatherTypeID == 11) {
        weatherIcon = "weatherImg/haze.svg";

    }
    else if (weatherTypeID > 5 && weatherTypeID < 9) {
        weatherIcon = "weatherImg/cloud.svg";

    }
    else if (weatherTypeID > 11 && weatherTypeID < 15 || weatherTypeID == 18) {
        weatherIcon = "weatherImg/rain.svg";

    }
    else if (weatherTypeID > 14 && weatherTypeID < 18) {
        weatherIcon = "weatherImg/thunderstorm.svg";

    }
    else if (weatherTypeID > 19 && weatherTypeID < 22 || weatherTypeID == 32) {
        weatherIcon = "weatherImg/wind.svg";

    }
    else if (weatherTypeID > 21 && weatherTypeID < 30) {
        weatherIcon = "weatherImg/snow.svg";

    }
    else if (weatherTypeID == 30) {
        weatherIcon = "weatherImg/hot.svg";

    }
    else if (weatherTypeID == 31) {
        weatherIcon = "weatherImg/cold.svg";

    }
    else if (weatherTypeID > 32 && weatherTypeID < 38) {
        weatherIcon = "weatherImg/moon.svg";

    }
    else if (weatherTypeID > 38 && weatherTypeID < 44) {
        weatherIcon = "weatherImg/moon(1).svg";

    }

    return weatherIcon;
}

function retrieveDataWeather() {
    let url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/315909?apikey=e5IhVlVTGzgD7kJrl5kWn6QG3q9YgVgm&language=en-us&metric=true";
    let request = new XMLHttpRequest();

    request.open("GET", url);

    request.onload = function () {
        let data = JSON.parse(request.responseText);
        let unixTimeStamp = data.DailyForecasts[0].EpochDate;
        let numberInWeek = calculateDayOfWeek(unixTimeStamp);

        function getDayIcon(dayOfWeek) {

            let weatherTypeID = data.DailyForecasts[dayOfWeek].Day.Icon;
            let weatherIcon = "";

            return (retrieveWeatherIcon(weatherTypeID, weatherIcon));

        }

        displayWeather(numberInWeek, getDayIcon, data);

    };

    request.send();
}

function displayWeather(numberInWeek, getDayIcon, data) {
    let count = 0;
    for (let i = numberInWeek; i < numberInWeek + 5; i++) {
        let typeOfWeather = getDayIcon(count);

        let day = weekdays[i % 7];
        document.getElementById("index" + count.toString()).innerHTML = `${day}`;

        document.getElementById("picture" + count.toString()).src = typeOfWeather;
        let highest = data.DailyForecasts[count].Temperature.Maximum.Value;
        document.getElementById("highest" + count.toString()).innerHTML = `H: ${Math.round(highest)} °C`
        let lowest = data.DailyForecasts[count].Temperature.Minimum.Value;
        document.getElementById("lowest" + count.toString()).innerHTML = `L: ${Math.round(lowest)} °C`

        count += 1;
    }
}

function main() {
    retrieveDataWeather();
}


main();