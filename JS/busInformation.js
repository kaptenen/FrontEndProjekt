$(document).ready(function () {
    $(".EriksbergsdockanToggle").click(function () {
        $(".EriksbergsdockanToggle-hidden").toggle()
    });

    $(".EriksbergstorgetToggle").click(function () {
        $(".EriksbergstorgetToggle-hidden").toggle()
    });

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
});

