
     
function retrieveFromNasa(){
    let url = "https://api.nasa.gov/planetary/apod?api_key=qvVStNIopTSTIQ5NX5beqnSylMtHljMzaHfbqNZc";
    let request = new XMLHttpRequest();
    request.open("GET", url);

    request.onload = function () {
        let data = JSON.parse(request.responseText);

        document.getElementById("title-text").innerHTML = `${data.title}`
        document.getElementById("daily-fact").innerHTML = `${data.explanation}`
        document.getElementById("nasa-img").src = `${data.hdurl}`

        

    };

    request.send();
    
}



function displayDataFromNasa(){
    retrieveFromNasa();
    
}





function main() {
    displayDataFromNasa();
}

main();