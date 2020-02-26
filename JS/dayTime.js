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
