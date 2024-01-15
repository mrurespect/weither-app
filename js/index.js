const search = document.querySelector("#search-input");
const today=document.querySelector("#today");
const current_month=document.querySelector("#month");
const city_location=document.querySelector("#city_location");
const country =document.querySelector("#country");
const today_degree =document.querySelector("#today-degree");
const icon =document.querySelector("#icon");
const desc =document.querySelector("#description");
const wind=document.querySelector("#wind");
const wind_dir=document.querySelector("#wind-dir");
const humidity =document.querySelector("#humidity");
//-----------------------------------------------------------------
let nextDay =document.querySelectorAll(".next-day");
let next_dayIcon=document.querySelectorAll(".icon");
let max_degree =document.querySelectorAll(".max-degree");
let min_degree=document.querySelectorAll(".min-degree");
let next_dayDesc =document.querySelectorAll(".description")
$(document).ready(function () {             // event that detect if all code html has been charged : we paste all js code inside it
    $('#loading .fa-spin').fadeOut(1000 ,function () {
        $('#loading').fadeOut(1000,function () {
            $('#loading').remove();                         // if we want to remove it 
            $('body').css('overflow','auto');             //to make the scrool 
            
        });
    });
    search.addEventListener("keydown",e=>{
        console.log(e);
        if (e.key==="Enter"){
            console.log(search.value)
            city=search.value;
            getWeitherDate(city, 3).then(displayCurrent);
            search.value="";
        }
    })
})
let data;

async function getWeitherDate(city, nday){
    let apiKey =`4ee4f338681a450bb9e93218233110`;
    let url =`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${nday}`;
    console.log(url);
    let apiResponce =await  fetch(url);
    console.log(apiResponce)
    data = await apiResponce.json();
    console.log(data);
}
getWeitherDate("casablanca", 3).then(displayCurrent);
let city;
let date =new Date();
let day_index=date.getDay()-1;
let month_index =date.getMonth()-1;
function displayCurrent(){
    today.innerHTML=days[day_index]
    current_month.innerHTML=`${date.getDate()} ${months[month_index]}`
    city_location.innerHTML =data.location.name;
    country.innerHTML=data.location.country;
    today_degree.innerHTML =data.current.temp_c+"°C";
    icon.setAttribute("src",data.current.condition.icon)
    desc.innerHTML=data.current.condition.text;
    wind.innerHTML=data.current.wind_kph+"km/h";
    wind_dir.innerHTML=data.current.wind_dir;
    humidity.innerHTML=data.current.humidity +"%";
    displayNextDay();
}
function displayNextDay(){
    for (let i=0;i<2;i++) {
            if (day_index===6)day_index=-1;
        nextDay[i].innerHTML=days[day_index+i+1];
        max_degree[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c +"°C" ;
        min_degree[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c +"°C";
        next_dayIcon[i].setAttribute("src",data.forecast.forecastday[i+1].day.condition.icon)
        next_dayDesc[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text;
    }
}
let days =["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday", "Sunday"]
let months=['January','February','March','April','May','June','July','August','September','October','November','December']
