$(document).ready(function () {
    $("#toggle-weather").click(function () {
        $(".day").slideToggle();
    });
});

$(document).ready(function () {
    $("#toggle-nasa").click(function () {
        $(".nasa-box").slideToggle();
    });
});

$(document).ready(function () {
    $("#toggle-news").click(function () {
        $(".news-article").slideToggle();
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



fiveDayForeCast();

function calculateDayOfWeek(e) {
    let todayDate = new Date(e * 1000);

    return todayDate.getDay()

}

function fiveDayForeCast() {

    let url = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/315909?apikey=e5IhVlVTGzgD7kJrl5kWn6QG3q9YgVgm&language=en-us&metric=true";
    let request = new XMLHttpRequest();

    request.open("GET", url);

    request.onload = function () {
        let data = JSON.parse(request.responseText);


        let unixTimeStamp = data.DailyForecasts[0].EpochDate;

        let numberInWeek = calculateDayOfWeek(unixTimeStamp);
        //Day1
        function getDayIcon(e) {

            let weatherTypID = data.DailyForecasts[e].Day.Icon;
            let WeatherImage = "";
            if (weatherTypID > 0 && weatherTypID < 5) {
                WeatherImage = "weatherImg/sun.svg";

            }
            else if (weatherTypID == 5 || weatherTypID == 11) {
                WeatherImage = "weatherImg/haze.svg";

            }
            else if (weatherTypID > 5 && weatherTypID < 9) {
                WeatherImage = "weatherImg/cloud.svg";

            }
            else if (weatherTypID > 11 && weatherTypID < 15 || weatherTypID == 18) {
                WeatherImage = "weatherImg/rain.svg";

            }
            else if (weatherTypID > 14 && weatherTypID < 18) {
                WeatherImage = "weatherImg/thunderstorm.svg";

            }
            else if (weatherTypID > 19 && weatherTypID < 22 || weatherTypID == 32) {
                WeatherImage = "weatherImg/wind.svg";

            }
            else if (weatherTypID > 21 && weatherTypID < 30) {
                WeatherImage = "weatherImg/snow.svg";

            }
            else if (weatherTypID == 30) {
                WeatherImage = "weatherImg/hot.svg";

            }
            else if (weatherTypID == 31) {
                WeatherImage = "weatherImg/cold.svg";

            }
            else if (weatherTypID > 32 && weatherTypID < 38) {
                WeatherImage = "weatherImg/moon.svg";

            }
            else if (weatherTypID > 38 && weatherTypID < 44) {
                WeatherImage = "weatherImg/moon(1).svg";

            }

            return WeatherImage;

        }

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

    };

    request.send();
}
