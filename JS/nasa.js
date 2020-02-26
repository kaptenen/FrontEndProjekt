
$(document).ready(function () {
    $("#toggle-nasa").click(function () {
        $(".nasa-box").slideToggle();
    });
});

function retrieveDataNasa() {
    let url = "https://api.nasa.gov/planetary/apod?api_key=qvVStNIopTSTIQ5NX5beqnSylMtHljMzaHfbqNZc";
    let request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function () {
        let data = JSON.parse(request.responseText);

        displayData(data);
    };

    request.send();
}

function displayData(data) {
    document.getElementById("titleNasa-text").innerHTML = `${data.title}`
    document.getElementById("daily-fact").innerHTML = `${data.explanation}`
    document.getElementById("nasa-img").src = `${data.hdurl}`
}

function main() {
    retrieveDataNasa();
}

main();