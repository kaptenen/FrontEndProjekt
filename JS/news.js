$(document).ready(function () {
    $("#toggle-news").click(function () {
        $(".news-article").slideToggle();
    });
});

function retrieveNews(){
    let url = 'https://api.currentsapi.services/v1/search?' +
    'keywords=youtube&language=en&' + 
    'apiKey=SnN-k-WJcXrcxTxI7-ZN0KZv7ioW_U3PDenjwI_f-UDLSx2k';
    let request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function () {
        let data = JSON.parse(request.responseText);


        let count = 0;
        /*for (let i = 0; i < 1 ; i++) {*/
            document.getElementById("title-text"+"0").innerHTML = `${data.news[1].title}`
            document.getElementById("news-text"+"0").innerHTML = `${data.news[1].description}`
            document.getElementById("news-img"+"0").src = `${data.news[1].image}`
            document.getElementById("news-url"+"0").innerHTML = `${data.news[1].url}`


        /*}*/

    }; 

    request.send();

    console.log(url)
    
}


function displayNews(){
    retrieveNews();
    
}





function main() {
    displayNews();
}

main();