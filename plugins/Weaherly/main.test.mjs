const { describe, it, expect } = require('@jest/globals');
const { WeatherAPI_post } = require('C:\\Users\\siebe\\Desktop\\Weaherly\\public\\WeatherAPIConnector.js');
// Beispielhafter API-Key (ersetzen durch echten bei echtem Test)
const apiKey = "e0c73eb4f5f3413bb85170030251006";

describe('searchWeatherToday', () => {
    it('Should return a Day object with temperature and date', async () => {
        const result = await WeatherAPI_post('Mannheim', apiKey,1);
        expect(result).toBeDefined();
        expect(result).toHaveProperty('temperature');
        expect(result).toHaveProperty('date');
    });
});
