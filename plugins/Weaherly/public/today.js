// Day.js (ES Module format)
class Day {
    constructor({ date, dayName, avgtemp_c, feelsLike, condition, iconUrl, humidity, maxwind_kph,daily_chance_of_rain, DeltaTemperatur, DeltaRain }) {
        this.date = date;
        this.dayName = dayName;
        this.avgtemp_c = avgtemp_c;
        this.humidity = humidity;
        this.maxwind_kph = maxwind_kph;
        this.condition = condition;
        this.daily_chance_of_rain = daily_chance_of_rain
        this.DeltaTemperatur = DeltaTemperatur;
        this.DeltaRain = DeltaRain;

    }

    GetMetric() {
        console.log(this.date);
    }
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
export { Day, DeltaTemperatur, DeltaRain };
