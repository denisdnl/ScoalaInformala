var URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"; // sufix .png


var Forecast={
    rawResponse:null,
    distinctDates:null,
    forecasts:null
}

function parseResult(res){
    var r = Object.create(Forecast);
    r.distinctDates = [];
    r.forecasts = [];

    for(var i=0;i<res.list.length;i++){
        r.forecasts.push({
            content:res.list[i],
            day:res.list[i].dt_txt.substr(0,10),
            time:res.list[i].dt_txt.substr(11,5)
        });

        if(r.distinctDates.indexOf(res.list[i].dt_txt.substr(0,10)) == -1){
            r.distinctDates.push(res.list[i].dt_txt.substr(0,10));
        }
    }

    return r;
}


function hideLoadingModal(){
	document.getElementById("loadingModal").classList = ["loadingModalHidden"];
}

function showLoadingModal(){
	document.getElementById("loadingModal").classList = ["loadingModalShown"];
}

function createMapUrl(lat,lon){
    var base="https://www.google.com/maps/embed/v1/view?key=AIzaSyAFswSLHwpz1MENkhinDV20fsoijw63U3M&zoom=14&center=";
    return base + lat + "," + lon;
}

function showCurrentWeather(event){
    event.preventDefault();
    var currentCity = document.querySelector("#cityTxt").value;
    
    var xhttp = new XMLHttpRequest();

    xhttp.onload = function(ev){
        var response = JSON.parse(ev.target.response);
		hideLoadingModal();
        if(response.cod == 404){
            alert("City not found");
            return;
        }

        
        if(response.cod == 400){
            alert("City field empty");
            return;
        }

        document.querySelector("#cwdContentMap").querySelector("iframe").src = createMapUrl(response.coord.lat,response.coord.lon);

        var html = `
            <img src="${URL_WEATHER_ICON_PREFIX+response.weather[0].icon}.png"/><br/>
            Descriere: ${response.weather[0].description} <br/>
            Umiditate: ${response.main.humidity}<br/>
            Presiue: ${response.main.pressure}<br/>
            Temperatura curenta: ${response.main.temp}<br/>
            Minima zilei: ${response.main.temp_min}<br/>
            Maxima zilei: ${response.main.temp_max}
        `;

        document.querySelector("#cwdContent").innerHTML = html;
    };

    xhttp.onerror = function(ev){
		hideLoadingModal();
        alert(ev.error);
    }

    xhttp.open("GET",URL_CURRENT_WEATHER+currentCity.toLowerCase());
    xhttp.send();
	showLoadingModal();
}


function showPrognosis(){
    event.preventDefault();
    var currentCity = document.querySelector("#cityTxt").value;
    
    var xhttp = new XMLHttpRequest();

    xhttp.onload = function(ev){
        var response = JSON.parse(ev.target.response);
		hideLoadingModal();
        if(response.cod == 404){
            alert("City not found");
            return;
        }

        
        if(response.cod == 400){
            alert("City field empty");
            return;
        }

        var div = '';
        var parsedResponse = parseResult(response);

        for(var i in parsedResponse.distinctDates){
            var objs = parsedResponse.forecasts.filter(a => {return a.day == parsedResponse.distinctDates[i] }); 

            div += '<div class="zi-prognoza">';
            div += '<p class="header-f-day">Ziua: '+parsedResponse.distinctDates[i]+'</p>';

            for(var j in objs){
                    div += '<div class="f-div"><img src="'+ URL_WEATHER_ICON_PREFIX+objs[j].content.weather[0].icon +'.png"/>';
                    div += '<p class="p-txt-f">Ora: '+objs[j].time+'</p>';
                    div += '<p class="p-txt-f">Temp: '+objs[j].content.main.temp+'</p>';
                    div += '<p class="p-txt-f">Desc: '+objs[j].content.weather[0].description+'</p>';
                    div += '</div>'
            }

            div += '</div>';
        }

        document.querySelector("#pwdContentDiv").innerHTML = div;

    };

    xhttp.onerror = function(ev){
		hideLoadingModal();
        alert(ev.error);
    }

    xhttp.open("GET",URL_FORECAST_WEATHER+currentCity.toLowerCase());
    xhttp.send();
	showLoadingModal();
}