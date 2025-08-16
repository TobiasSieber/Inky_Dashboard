// Day.js (ES Module format)
class ForeCastDay {
  constructor({ date, dayName, avgtemp_c, condition, min_temp, max_temp, WeatherURL }) {
    this.date = date;
    this.dayName = dayName;
    this.avgtemp_c = avgtemp_c;
    this.condition = condition;
    this.min_temp = min_temp;
    this.max_temp = max_temp;
    this.WeatherURL = WeatherURL;
  }
}





class Today {
  constructor({ date, dayName, avgtemp_c,feelslike, condition, humidity, maxwind_kph, daily_chance_of_rain, DeltaTemperatur, DeltaRain, Astro, WeatherURL, UV }) {
    this.date = date;
    this.dayName = dayName;
    this.avgtemp_c = avgtemp_c;
    this.feelslike = feelslike;
    this.condition = condition;
    this.humidity = humidity;
    this.maxwind_kph = maxwind_kph;
    this.DeltaTemperatur = DeltaTemperatur;
    this.DeltaRain = DeltaRain;
    this.Astro = Astro;
    this.WeatherURL = WeatherURL;
    this.UV = UV;
  }

  GetMetric() {
    console.log(`[Today] ${this.dayName}: ${this.condition}, ${this.avgtemp_c}°C`);
  }
}




class Astro{
  constructor({moon_phase,moonrise,moonset,sunrise,sunset}) {
    this.moon_phase = moon_phase;
    this.moonrise = moonrise;
    this.moonset = moonset;
    this.sunrise = sunrise;
    this.sunset = sunset;
  }

}

function GetAstroMetricFromDay(Day){
  const AstroForDay = new Astro({
    moon_phase: Day.astro.moon_phase,
    moonrise: Day.astro.moonrise,
    moonset: Day.astro.moonset,
    sunrise: Day.astro.sunrise,
    sunset: Day.astro.sunset,

  });
  return AstroForDay;

}


class DeltaTemperatur {
  // implementation here
}

class DeltaRain {
  constructor(temperaturvector) {
    this.temperaturvector = temperaturvector;
  }

  PlotDailyForeCast() {
    return "-1";
  }
}

// Export them properly
export {ForeCastDay,Today,Astro, DeltaTemperatur, DeltaRain,GetAstroMetricFromDay };
