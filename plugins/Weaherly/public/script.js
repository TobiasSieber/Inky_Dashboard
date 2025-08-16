import {WeatherAPI_post} from "./WeatherAPIConnector.js";
import {GetMoonSign,getLuckyColor} from "./GetZodiac.js";
import {Today,ForeCastDay, GetAstroMetricFromDay} from "./Day.js";
import {GetDashBoardConfig} from "./FileManager.js";
import { DateTime } from 'https://cdn.jsdelivr.net/npm/luxon@3/build/es6/luxon.js';
const days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];



// Listen for button click


function SetDashBoardWithConfig(config){
document.getElementById('DashboarLocation').textContent = config.dashboardtitle;;
}
function SetZodiac(zodiacLabel) {
    const imgPath = `images/Zodiac/${zodiacLabel.toLowerCase()}.png`;

    document.getElementById('zodiac-image').src = imgPath;
    document.getElementById('zodiac').textContent = zodiacLabel;
    document.getElementById("zodiac").innerHTML =   `
<div style="display: flex; flex-direction: column; align-items: flex-start;">
        <span style="font-size: 0.7rem; color: #666;">Phase</span>
        <span style="font-size: 0.9rem;">
      ${zodiacLabel}
    </span>
    </div>
    
    
        `;
}

function SetLuckyColor(birthday){

const color = getLuckyColor(birthday,"daily")
document.getElementById('lucky-color-image').src = `./images/LuckyColor/${color}.png`
    document.getElementById('lucky-color').innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: flex-start;">
          <span style="font-size: 0.7rem; color: #666;">Daily colour</span>
          <span style="font-size: 0.9rem;">
            ${color}</span>
          </span>
        </div>
      `;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const config = await GetDashBoardConfig();
        const acceding  = await GetMoonSign();
        SetZodiac(acceding)
        SetLuckyColor("2001-11-19")
        SetDashBoardWithConfig(config)
        // Optionally, you can pass config to other functions:
        LoadWeatherData(); // if it depends on the config already written

    } catch (err) {
        console.error("Failed to initialize dashboard:", err);
    }
});



var ForeCastArray =[]

function RenderForeCast(Forecast) {

    const container = document.getElementById("weather-container");
    container.innerHTML = ""; // Clear existing cards

    const today = new Date().getDay();
    var isToday = true
    for(const i in Forecast) {
        const day = Forecast[i]
        const minTemp = day.min_temp
        const maxTemp = day.max_temp
        const condition_text = day.condition;
        const avg_c = day.avgtemp_c;
        const dayName = days[(today + i) % 7];

        const card = document.createElement("div");
        card.className = "card";

        // Set all Day data as data- attributes
        card.dataset.date = day.date;
        card.dataset.dayName = day.dayName || dayName;
        card.dataset.avgtempC = day.avgtemp_c;
        card.dataset.humidity = day.humidity;
        card.dataset.maxwindKph = day.maxwind_kph;
        card.dataset.condition = day.condition;


        // Normalize condition text to pick image
        let normalized = condition_text.replace(/\s+/g, '').toLowerCase();
        let imgType;

        if (/rain|partlyrainy|moderaterain|heavyrain/.test(normalized)) {
            imgType = "rain";
        } else if (/snow|blizzard|sleet/.test(normalized)) {
            imgType = "snow";
        } else if (/thunder|storm/.test(normalized)) {
            imgType = "thunder";
        } else if (/cloudy|partlycloudy|patchycloudnearby/.test(normalized)) {
            imgType = "cloudy";
        } else if (/sun/.test(normalized)) {
            imgType = "sunny";
        } else {
            imgType = "clear";
        }

        const imgPath = `images/card/${imgType}.png`;
        card.className = "weather-card";

        card.innerHTML = `
          <div class="card-bg-container">
            <img src="${imgPath}" alt="${day.condition}" class="card-bg-image" />
            <div class="card-overlay">
              <div class="card-header">
                <h2 class="card-day">${dayName}</h2>
              </div>
              <div class="card-footer">

                <p class="card-temp">${maxTemp}°/${minTemp}°</p>
              </div>
            </div>
          </div>
        `;


        card.addEventListener('click', () => {
        });

        container.appendChild(card);
        if (isToday === true) {
            //showTodayDashboard(day)

            isToday = false;
        }
    }

}
function RenderDashBoard(today){
    try {
        // Remove AM/PM from time strings (optional)
        console.log(today)

// Date & Location
        const rawDate = today.dayName; // "20.04.2001"
        const [year, month, day] = rawDate.split("-").map(Number);

// Create a date object
        const dateObj = new Date(year, month - 1, day);

// Format options
        const options = {
            weekday: 'long',
            month: 'long',
            day: '2-digit'
        };

// Format the date

// Set the content
        document.getElementById("DashboardDate").textContent = today.date


// Main Temperature
                document.getElementById("main-temp").innerHTML = `
          <div style="text-align: center;">
            <div style="font-size: 4rem;">
              ${today.avgtemp_c}<span style="font-size: 1rem;">°C</span>
            </div>
            <div style="font-size: 1rem; color: #666;">
              feels like ${today.feelslike}°C
            </div>
          </div>
        `;


        document.getElementById("Weather-today-icon").src =  `./images/icons/${today.WeatherURL}.png`
        //document.getElementById("moonrise").innerHTML = formatLabeledTime("Moonrise", today.Astro.moonrise);
       // document.getElementById("sunrise").innerHTML = formatLabeledTime("Sunrise", today.Astro.sunrise);
// Moonrise / Sunrise (AM/PM stripped)


        // Humidity with smaller %
                /*document.getElementById("humidity").innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: flex-start;">
            <span style="font-size: 0.7rem; color: #666;">Humidity</span>
            <span style="font-size: 1.1rem;">
              ${today.humidity}<span style="font-size: 0.7rem;">%</span>
            </span>
          </div>
        `;*/
            // Wind Speed with smaller unit
                    /*document.getElementById("windspeed").innerHTML = `
              <div style="display: flex; flex-direction: column; align-items: flex-start;">
                <span style="font-size: 0.7rem; color: #666;">Windspeed</span>
                <span style="font-size: 1.1rem;">
                  ${today.maxwind_kph}<span style="font-size: 0.7rem;"> km/h</span>
                </span>
              </div>
            `;*/

// Moonset / Sunset (AM/PM stripped)




                document.getElementById("uv-index").innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: flex-start;">
            <span style="font-size: 0.7rem; color: #666;">UV-Index</span>
            <span style="font-size: 1.1rem;">
              ${today.UV}
            </span>
          </div>
        `;
        function getLocalTimeFromUTC(utcMillis, timeZone) {
            return DateTime
                .fromMillis(utcMillis, { zone: 'utc' })  // <-- fromMillis here
                .setZone(timeZone)
                .toFormat('h:mm a');
        }


        function formatLabeledTime(label, timeStr) {
            const match = timeStr.match(/^(\d{1,2}:\d{2})\s?(AM|PM)?$/i);
            if (!match) return label + ": " + timeStr;

            const [, time, period] = match;

            return `
        <div style="display: flex; flex-direction: column; align-items: flex-start;">
          <span style="font-size: 0.7rem; color: #666;">${label}</span>
          <span style="font-size: 1.1rem;">
            ${time}<span style="font-size: 0.7rem;"> ${period || ''}</span>
          </span>
        </div>
      `;
        }



// Moonset / Sunset — assume time strings
        document.getElementById("clock").innerHTML = formatLabeledTime("Frankfurt", getLocalTimeFromUTC(Date.now(),"Europe/Berlin"));


// Use it:
        //document.getElementById("moonset").innerHTML = formatLabeledTime("Moonset", today.Astro.moonset);
        //document.getElementById("sunset").innerHTML =  formatLabeledTime("Sunset", today.Astro.sunset);

    }
    catch (e){

        return -1
    }
}














//Load Data into ForeCast array to later use to render forecast
function CreateDays(DataOfToday, hourlyData,current) {
    console.log(DataOfToday)
    const dayDate = new Date(DataOfToday.dt * 1000);
    const dayName = days[dayDate.getDay()]; // days = ['Sun', 'Mon', 'Tue', ...]
    const options = { weekday: 'long', month: 'long', day: '2-digit' };
    const formatted = dayDate.toLocaleDateString('en-US', options);
    function formatTimeTo12Hour(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHour = hours % 12 === 0 ? 12 : hours % 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        return `${displayHour}:${displayMinutes} ${ampm}`;
    }

    const Astro = {
        sunrise: formatTimeTo12Hour(new Date(DataOfToday.sunrise * 1000)),
        sunset: formatTimeTo12Hour(new Date(DataOfToday.sunset * 1000)),
        moonrise: formatTimeTo12Hour(new Date(DataOfToday.moonrise * 1000)),
        moonset: formatTimeTo12Hour(new Date(DataOfToday.moonset * 1000)),
        moon_phase: DataOfToday.moon_phase,
    };

    // Helper to format time as "3 PM", "12 AM", etc.
    const formatHour = (unixTime) => {
        const date = new Date(unixTime * 1000);
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 => 12
        return `${hours} ${ampm}`;
    };

    const DeltaTemperatur = hourlyData.map(hour => ({
        time: formatHour(hour.dt),
        value: Math.round(hour.temp )
    }));

    const DeltaRain = hourlyData.map(hour => ({
        time: formatHour(hour.dt),
        value: hour.pop !== undefined ? Math.round(hour.pop * 100) : 0
    }));
    const currentDay = new Today({
        date: formatted,
        dayName: dayName,
        avgtemp_c: Math.floor(current.temp), // Kelvin to Celsius
        feelslike: Math.floor(current.feels_like),
        humidity: DataOfToday.humidity,
        maxwind_kph: (DataOfToday.wind_speed * 3.6).toFixed(1), // m/s to kph
        condition: DataOfToday.weather[0].description,
        Astro: Astro,
        WeatherURL : DataOfToday.weather[0].icon,
        daily_chance_of_rain: `${Math.round(DataOfToday.pop * 100)}%`,
        DeltaTemperatur: DeltaTemperatur,
        DeltaRain: DeltaRain,
        UV: DataOfToday.uvi
    });

    return currentDay;
}


function CreateForecastDays(ForecastArray) {
    const forecastDays = [];

    ForecastArray.forEach((day) => {
        const dayDate = new Date(day.dt * 1000);
        const options = { weekday: 'long', month: 'long', day: '2-digit' };
        const formatted = dayDate.toLocaleDateString('en-US', options);
        const dayName = days[dayDate.getDay()];
        const avgtemp_c = Math.round((day.temp.max + day.temp.min) / 2 - 273.15);
        const min_temp = Math.round(day.temp.min );
        const max_temp = Math.round(day.temp.max );
        const WeatherURL = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

        const forecastDay = new ForeCastDay({
            date: formatted,
            dayName: dayName,
            avgtemp_c: avgtemp_c,
            condition: day.weather[0].description,
            min_temp: min_temp,
            max_temp: max_temp,
            WeatherURL: WeatherURL
        });

        forecastDays.push(forecastDay);
    });

    return forecastDays;
}



async function LoadWeatherData() {

    const response = await WeatherAPI_post( "forecast",5);
    const data = response;
    var forecast = data.daily
    const TodayWeather = CreateDays(forecast[0],data.hourly.slice(0, 24),data.current)
    const ForeCastArray = CreateForecastDays(forecast)
    RenderDashBoard(TodayWeather)
    RenderForeCast(ForeCastArray.slice(0,5));
    renderChart(TodayWeather)

}




// InkyPi-style Chart.js config

// Initial render
function renderChart(today) {
    if (!today) return;

    const ctx = document.getElementById('hourlyChartJS').getContext('2d');
    // Full 24-hour labels (with spacing to avoid clutter)
    const labels = today.DeltaTemperatur.map(entry => entry.time);



    const precipitation = today.DeltaRain.map(entry => entry.value);
    const temperatures = today.DeltaTemperatur.map(entry => entry.value);
    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                type: 'line',
                label: 'Hourly Temperature',
                data: temperatures,
                borderColor: 'rgba(241, 122, 36, 0.9)', // Line color
                borderWidth: 2,
                pointRadius: 0, // Hide points
                fill: true, // Enable filling the area under the line
                tension: 0.5
            },
                {
                    type: 'bar',
                    label: 'Precipitation Probability',
                    data: precipitation,
                    borderColor: 'rgba(26, 111, 176, 1)', // Semi-transparent blue
                    borderWidth: {
                        top: 2,
                        right: 0,
                        bottom: 0,
                        left: 0
                    },
                    yAxisID: 'y1',
                    barPercentage: 1.0, // Ensures full width
                    categoryPercentage: 1.0,  // Ensures full width
                    fill: true, // Enable filling the area under the line
                }
            ]
        },
        options: {
            animation: {
                duration: 0, // general animation time
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        padding: 0,
                        maxRotation: 0, // Prevent label rotation
                        minRotation: 0, // Prevent label rotation
                        color: "{{ plugin_settings.textColor }}",
                        font: {
                            family: 'Jost'
                        }
                    },
                    grid: {
                        tickLength: 0,
                        display: false // Hide x-axis grid
                    },
                    offset: true,
                    gridLines: {
                        drawBorder: false,
                    }
                },
                y: {
                    ticks: {
                        padding: 0,
                        color: "{{ plugin_settings.textColor }}",
                        font: {
                            family: 'Jost'
                        },
                        autoSkip: false,
                        callback: function(value, index, values) {
                            if (index === values.length-1) return maxTemp + "°";
                            else if (index === 0) return minTemp + "°";
                            else return '';
                        }
                    },
                    grid: { display: false },
                    min: minTemp,
                    max: maxTemp,
                },
                y1: {
                    position: 'right',
                    grid: { display: false },
                    ticks: {
                        padding: 0,
                        color: "{{ plugin_settings.textColor }}",
                        font: {
                            family: 'Jost'
                        },
                        autoSkip: false,
                        callback: function(value, index, values) {
                            if (index === values.length - 1) return "100%";
                            else if (index === 0) return "0%";
                            else return '';
                        }
                    },
                    min: 0,
                    max: 100,
                }
            },
            plugins: { legend: { display: false}}, // Hide legend
            elements: {
                line: {
                    borderJoinStyle: 'round' // Smoother line connection
                }
            }
        }
    });


    // Add gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(252,204,5,0.9)');
    gradient.addColorStop(1, 'rgba(252,204,5,0.05)');
    chart.data.datasets[0].backgroundColor = gradient;

    chart.update();
}
