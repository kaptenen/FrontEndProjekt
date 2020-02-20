CurrentWeatherAPI();
DayTime();
BusInformation();

//waterTemp();

function CurrentWeatherAPI() {
  let url =
    "http://api.openweathermap.org/data/2.5/weather?id=2711537&units=metric&appid=525541f98425fa99c0ea37227ef874dc";
  let request = new XMLHttpRequest();
  request.open("GET", url);

  request.onload = function () {
    let data = JSON.parse(request.responseText);

    document.getElementById("city-name").innerHTML = data.name;

    let t = data.main.temp;
    let temperature = parseFloat(t.toFixed(1));

    document.getElementById("temp").innerHTML = `${temperature} °C`;

    let weatherDescription = data.weather[0].main;
    document.getElementById(
      "weather-description"
    ).innerHTML = weatherDescription;

    let weatherType = data.weather[0].id;

    if (weatherType >= 200 && weatherType <= 232) {
      document.getElementById("current-weather").src =
        "weatherImg/thunderstorm.svg";
    } else if (weatherType >= 300 && weatherType <= 531) {
      document.getElementById("current-weather").src = "weatherImg/rain.svg";
    } else if (weatherType >= 600 && weatherType <= 622) {
      document.getElementById("current-weather").src = "weatherImg/snow.svg";
    } else if (weatherType >= 701 && weatherType <= 781) {
      document.getElementById("current-weather").src = "weatherImg/haze.svg";
    } else if (weatherType == 800) {
      document.getElementById("current-weather").src = "weatherImg/sun.svg";
    } else if (weatherType >= 801 && weatherType <= 802) {
      document.getElementById("current-weather").src = "weatherImg/cloud.svg";
    } else if (weatherType >= 803 && weatherType <= 804) {
      document.getElementById("current-weather").src = "weatherImg/solidcloud.svg";
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
}

function DayTime() {
  const mounts = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const time = new Date();

  let date = time.getDate();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let m = time.getMonth();
  let mount = mounts[m];

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  document.getElementById("current-time").innerHTML = `${hours}:${minutes}`;
  document.getElementById("date").innerHTML = `${date} ${mount}`;
}

function BusInformation() {
  let urls = [
    "https://api.resrobot.se/v2/departureBoard?key=2012d673-a042-4d5f-ac58-84e72f4fd953&id=740075520&maxJourneys=11&direction=740059197&passlist=0&format=json", //Eriksbergsdockan
    "https://api.resrobot.se/v2/departureBoard?key=2012d673-a042-4d5f-ac58-84e72f4fd953&id=740059199&maxJourneys=11&direction=740015585&passlist=0&products=128%20&format=json"
  ]; //EriksbergsTorget

  let today = new Date();

  let request = new Array(urls.length);

  for (let i = 0; i < urls.length; i++) {
    request[i] = new XMLHttpRequest();
    request[i].open("GET", urls[i]);

    request[i].onload = function () {
      let data = JSON.parse(request[i].responseText);

      let busInfo = data.Departure;
      switch (i) {
        case 0: //Eriksbergsdockan




          for (let i = 0; i < busInfo.length; i++) {
            let depTime = busInfo[i].time
            let depDate = new Date(busInfo[i].date + " " + depTime);

            let diffMs = depDate - today;
            let diffSek = diffMs / 1000;
            let diffMin = Math.round(diffSek / 60);

            let number1 = "bus-info" + i;
            let departure = "departure-time" + i;
            let depMin = "dep-min" + i;


            document.getElementById(number1).innerHTML = busInfo[i].Product.num;
            document.getElementById(departure).innerHTML = busInfo[i].time.slice(0, -3);

            if (diffMin <= 0) {
              document.getElementById(depMin).innerHTML = "Avgått";
              document.getElementById(depMin).style.color = "red";
            }
            else {
              document.getElementById(depMin).innerHTML = diffMin + "min";
            }

          }
          break;

        case 1: //Eriksbergstorget
          for (let i = 0; i < busInfo.length; i++) {
            let depTime = busInfo[i].time
            let depDate = new Date(busInfo[i].date + " " + depTime);

            let diffMs = depDate - today;
            let diffSek = diffMs / 1000;
            let diffMin = Math.floor(diffSek / 60);

            let number2 = "busInfo" + i;
            let departure = "departureTime" + i;
            let depMin = "departureMin" + i;


            document.getElementById(number2).innerHTML = busInfo[i].Product.num;
            document.getElementById(departure).innerHTML = busInfo[i].time.slice(0, -3);

            if (diffMin <= 0) {
              document.getElementById(depMin).innerHTML = "Avgått";
              document.getElementById(depMin).style.color = "red";
            }
            else {
              document.getElementById(depMin).innerHTML = diffMin + "min";
            }
          }
          break;
      }
    };

    request[i].send();
  }
}

function waterTemp() {
  const lat = 57.70887;
  const lng = 11.97456;
  const params = "waterTemperature";

  Date.prototype.getUnixTime = function () {
    return (this.getTime() / 1000) | 0;
  };
  if (!Date.now)
    Date.now = function () {
      return new Date();
    };
  Date.time = function () {
    return Date.now().getUnixTime();
  };

  let start = new Date();
  let end = new Date();
  start.setSeconds(00);
  start.setMinutes(00);
  start.setHours(01);

  end.setSeconds(00);
  end.setMinutes(00);
  end.setHours(24);

  let readingStart = start.getUnixTime();
  let readingEnd = end.getUnixTime();

  let dt = new Date();
  let h = dt.getHours();
  let APIArray = [];

  fetch(
    `https://api.stormglass.io/v1/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${readingStart}&end=${readingEnd}`,
    {
      headers: {
        Authorization:
          "967278d4-450f-11ea-8bd6-0242ac130002-967279e2-450f-11ea-8bd6-0242ac130002"
      }
    }
  )
    .then(response => response.json())
    .then(jsonData => {
      for (let i = 0; i < jsonData.hours.length; i++) {
        APIArray.push(jsonData.hours[i].waterTemperature[0].value);
      }

      document.getElementById("water").innerHTML = `${APIArray[h]} °C`;
    });
}
