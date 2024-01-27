const temp=document.querySelector('.temp');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const conditionOutput = document.querySelector('.condition');
const windOutput = document.querySelector('.wind');
const icon = document.querySelector('.icon');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);
// Check browser cache first, use if there and less than 10 seconds old
if(localStorage.when != null
    && parseInt(localStorage.when) + 1800000 > Date.now()) {
    console.log('From localStorage');
    let freshness = Math.round((Date.now() - localStorage.when)/1000) + " second(s)";
    temp.innerHTML = Number(localStorage.temp).toFixed(0)+ "&#176;";
    conditionOutput.innerHTML= localStorage.condition;
    cloudOutput.innerHTML = localStorage.cloudOutput+ "hPa";
    humidityOutput.innerHTML =localStorage.humidityOutput + "%";
    windOutput.innerHTML = localStorage.windOutput+"km/h";
    id=localStorage.id;
    console.log(id);


     if(id == 800){
         document.getElementById('video-bg').src="sunny.mp4";
         icon.src="113.png";

         }else if(id >=200 && id <=232){
             document.getElementById('video-bg').src="cloudy.mp4";
     icon.src="116.png";
        }else if(id>=600 && id <=622){
         document.getElementById('video-bg').src="snowy.mp4";
         icon.src="338.png";
        }else if(id >=701 && id <=781){
         document.getElementById('video-bg').src="cloudy.mp4";
         icon.src="143.png";
        }else if(id >=801 && id <=804){
         document.getElementById('video-bg').src="cloudy.mp4";
         icon.src="116.png";
            }else if(id >=500 && id <=531){
             document.getElementById('video-bg').src="Rain.mp4";
             icon.src="308.png"
            
             
        }
       

    }

 else {
fetchWeatherData();}
function fetchWeatherData(){

        fetch('http:/localhost/weather-app/index.php?City=norwich').then(res => res.json()).then(data => {
            
            console.log(data);
            temp.innerHTML = Number(data.Weather_temperature).toFixed(0)+ "&#176;";
            conditionOutput.innerHTML= data.Weather_description;
            cloudOutput.innerHTML = data.Pressure + "hPa";
            humidityOutput.innerHTML =data.Humidity + "%";
            windOutput.innerHTML = data.Direction_of_wind+"km/h";
            
           id=data.ID
           console.log(data.ID);
            if(id == 800){
                document.getElementById('video-bg').src="sunny.mp4";
                icon.src="113.png";

                }else if(id >=200 && id <=232){
                    document.getElementById('video-bg').src="cloudy.mp4";
            icon.src="116.png";
               }else if(id>=600 && id <=622){
                document.getElementById('video-bg').src="snowy.mp4";
                icon.src="338.png";
               }else if(id >=701 && id <=781){
                document.getElementById('video-bg').src="cloudy.mp4";
                icon.src="143.png";
               }else if(id >=801 && id <=804){
                document.getElementById('video-bg').src="cloudy.mp4";
                icon.src="116.png";
                   }else if(id >=500 && id <=531){
                    document.getElementById('video-bg').src="Rain.mp4";
                    icon.src="308.png"
               }
               localStorage.temp=Number(data.Weather_temperature).toFixed(2);
               localStorage.condition = data.Weather_description;
               localStorage.cloudOutput = data.Pressure;
               localStorage.humidityOutput = data.Humidity;
               localStorage.windOutput=data.Direction_of_wind;
               localStorage.id=data.ID;
               localStorage.cityoutput=data.City;
               localStorage.when = Date.now();
               
        });
           
       
            
}

        
       
  

        


        
   

