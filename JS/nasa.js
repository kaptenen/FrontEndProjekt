
$(document).ready(function () {
    $("#toggle-nasa").click(function () {
        $(".nasa-box").slideToggle();
    });
});

function retrieveDataNasa() {
    let url = //APIKEY here;
    let request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function () {

        let nasa = displayData(request);
        document.getElementById("titleNasa-text").innerHTML = nasa._title;
        document.getElementById("daily-fact").innerHTML = nasa._description;
        document.getElementById("nasa-img").src = nasa._image;
    };
    request.send();
};

function displayData(request) {
    let data = JSON.parse(request.responseText);

    let title = `${data.title}`;
    let description = `${data.explanation}`;
    let image = `${data.hdurl}`;

    return {
        _title: title,
        _description: description,
        _image: image
    };
};

function main() {
    retrieveDataNasa();
};

main();