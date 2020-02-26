$(document).ready(function () {
    $("#toggle-news").click(function () {
        $(".news-box").slideToggle();
    });
});

function retrieveDataNews() {
    let url = //APIKEY here

    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        let news = displayNews(request);

        document.getElementById("titleNews-text").innerHTML = news._title;
        document.getElementById("news-text").innerHTML = news._description;
        document.getElementById("news-img").src = news._image;
    };
    request.send();
}

function displayNews(request) {
    let data = JSON.parse(request.responseText);

    let title = `${data.news[0].title}`;
    let description = `${data.news[0].description}`;
    let image = `${data.news[0].image}`;

    return {
        _title: title,
        _description: description,
        _image: image
    };
};

function main() {
    retrieveDataNews();
};

main();