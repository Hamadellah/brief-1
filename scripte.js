const wetherform = document.querySelector(".weatherform");
const cityinput =document.querySelector(".cityInput");
const card = document.querySelector(".Weather-card");
const cardContainer = document.querySelector("#card-container");

cardContainer.style.display='none';

const apikey = "a4e340354eaf05dc805c3ed632f44ebb"

wetherform.addEventListener("submit", async event =>{
    event.preventDefault();
    cardContainer.style.display='block';
    const city = cityinput.value
    if(city){
        try{
            const weatherData= await getweatherdata(city);
            displayweatherinfo(weatherData);

        }
        catch(error){
            console.error(error)

        }
    }
        else{displayerror("please entre a city");

        }

    }
);
async function getweatherdata(city) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric `
     const response = await fetch(apiUrl)
     if(!response.ok){
        throw new error("could not fetch weather data")
     }
     return await response.json();
     

    
}
function displayweatherinfo(data){
    const {name: city
        ,main:{temp,humidity},
         weather:[{description,id}]}=data;
         card.textContent="";
         card.style.dispalay="flex";

const citydisplay = document.createElement("h1");
const tempdispaly= document.createElement("p");
const humiditydisplay = document.createElement("p")
const descdisplay = document.createElement("p")
const weatheremoji = document.createElement("p")

weatheremoji.textContent=getweatheremoji(id)
citydisplay.textContent=city;
tempdispaly.textContent=`${temp}°C🌡️`
humiditydisplay.textContent=`humidity: ${humidity}%💧`
descdisplay.textContent=`${description}🌥️`;


weatheremoji.classList.add("Weatheremoji")
citydisplay.classList.add("citydisplay")
tempdispaly.classList.add("tempdispaly")
humiditydisplay.classList.add("humiditydisplay")
descdisplay.classList.add("descdisplay")


card.appendChild(citydisplay)
card.appendChild(weatheremoji)

card.appendChild(tempdispaly)
card.appendChild(humiditydisplay)
card.appendChild(descdisplay)



}
function getweatheremoji(weatherid){
    const image = document.getElementById("logo")

    
        if (weatherid >= 200 && weatherid < 300)
             return "⛈️";
    if (weatherid >= 300 && weatherid < 500)
         return "🌧️";
    if (weatherid >= 500 && weatherid < 600)
         return "🌦️";
    if (weatherid >= 600 && weatherid < 700)
         return "❄️";
    if (weatherid >= 700 && weatherid < 800)
         return "🌫️";
    if (weatherid === 800)
         return "☁️";
    if (weatherid >= 800 && weatherid<810);
         return "☀️";
    return "🌍";

}
function displayerror(message){
    const errordisplay = document.createElement("p")
    errordisplay.textContent=message;
    errordisplay.classList.add("errordisplay")
    card.textContent="";
    card.style.display = "flex";
    card.appendChild(errordisplay)
    
    

}
const darkBtn = document.getElementById("darkBtn");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkBtn.textContent = "Light Mode";
    } else {
        darkBtn.textContent = "Dark Mode";
    }
});

