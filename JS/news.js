$(document).ready(function () {
    $("#toggle-news").click(function () {
        $(".news-article").slideToggle();
    });
});

function retrieveDataNews(){
    let url = 'https://api.currentsapi.services/v1/search?' +
    'keywords=youtube&language=en&' + 
    'apiKey=SnN-k-WJcXrcxTxI7-ZN0KZv7ioW_U3PDenjwI_f-UDLSx2k';
    
    let request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function () {
        let data = JSON.parse(request.responseText);
        displayNews(data);
    }; 

    request.send();
}

function displayNews(data){
    document.getElementById("title-text0").innerHTML = `${data.news[1].title}`
    document.getElementById("news-text0").innerHTML = `${data.news[1].description}`
    document.getElementById("news-img0").src = `${data.news[1].image}`
   /* 
   document.getElementById("news-url0").innerHTML = `${data.news[1].url}` 
   */
}

function main() {
    retrieveDataNews();
}

main();