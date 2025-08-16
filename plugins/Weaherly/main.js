import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
//import fs from "node:fs"
import fs from 'fs/promises';
import swisseph from 'swisseph'
dotenv.config({ path: 'public/.env' });

const apiKey = process.env.API_KEY;
const apiKey_2 = process.env.API_KEY2

const app = express();
const port = process.env.PORT || 30080;

// Needed because __dirname is not defined in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // ✅ important for parsing JSON bodies

// Fallback for index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});


app.get('/api/save-settings', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'setting.json');
    const rawSettings = await fs.readFile(filePath, 'utf8');
    const settings = JSON.parse(rawSettings);

    const latitude = parseFloat(settings.latitude);
    const longitude = parseFloat(settings.longitude);
    const apiKey = settings.apiKey;
    const dashboardtitle = settings.dashboardtitle;

    if (
        isNaN(latitude) ||
        isNaN(longitude) ||
        !apiKey ||
        typeof dashboardtitle !== 'string'
    ) {
      return res.status(400).json({ error: 'Invalid or missing settings data' });
    }

    // Respond with validated settings
    res.json({
      latitude,
      longitude,
      apiKey,
      dashboardtitle,
    });

  } catch (error) {
    console.error("Error reading settings file:", error);
    res.status(500).json({ error: 'Failed to load dashboard settings' });
  }
});


app.get('/api/moon-sign', async (req, res) => {
  try {
    const now = new Date();

    swisseph.swe_julday(
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
        now.getHours() + now.getMinutes() / 60,
        swisseph.SE_GREG_CAL,
        (julDay) => {
          swisseph.swe_calc_ut(julDay, swisseph.SE_MOON, 0, (result) => {
            if (result.error) {
              console.error("Moon calculation error:", result.error);
              return res.status(500).json({ error: 'Moon sign calculation failed' });
            }

            const signs = [
              "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
              "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
            ];
            const deg = result.longitude;
            const sign = signs[Math.floor(deg / 30)];
            const degInSign = (deg % 30).toFixed(2);

            res.json({
              sign,
              degrees: degInSign,
              fullLongitude: deg.toFixed(2)
            });
          });
        }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: 'Unexpected server error' });
  }
});
app.post('/api/save-settings', async (req, res) => {
  const { latitude, longitude, apiKey ,dashboardtitle} = req.body;
  const jsonData = {
    latitude: latitude,
    longitude: longitude,
    apiKey: apiKey,
    dashboardtitle:dashboardtitle
  };

  fs.writeFile('./public/setting.json', JSON.stringify(jsonData), err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });

});

app.get('/api/weather', async (req, res) => {
  let { use_case, days } = req.query;

  // Convert lat/lng to numbers if present
  //const settingsRaw = await fs.readFile('./public/setting.json', 'utf-8');
  var _lat
  var _lng
  const settingsRaw = await fs.readFile('./public/setting.json', 'utf8');
  const settings = JSON.parse(settingsRaw);
  _lat = parseFloat(settings.latitude);
  _lng = parseFloat(settings.longitude);
  var _title = settings.dashboard
  // Validate input: either city OR lat & lng required
  if ( (_lat === undefined || _lng === undefined || isNaN(_lat) || isNaN(_lng))) {
    return res.status(400).json({ error: 'Either city or valid lat and lng are required' });
  }

  try {
    let apiUrl;

    // Prepare query parameter based on what's provided
    let locationQuery;
    if (_lat !== undefined && _lng !== undefined && !isNaN(_lat) && !isNaN(_lng)) {
      locationQuery = `${_lat},${_lng}`;
    }

    if (use_case === 'current') {
      apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationQuery}`;
    } else if (use_case === 'forecast') {
      const forecastDays = days || 3;
      apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${locationQuery}&days=${forecastDays}`;
    } else {
      return res.status(400).json({ error: 'Unknown use_case. Use "current" or "forecast".' });
    }

    console.log(apiUrl)
    let apiUrl2 = `https://api.openweathermap.org/data/3.0/onecall?lat=${_lat}&lon=${_lng}&units=metric&exclude=minutely&appid=${apiKey_2}`;
    const response2 = await fetch(apiUrl2)
    if (!response2.ok) {
      const text = await response2.text();
      throw new Error(`Weather API error (status ${response2.status}): ${text}`);
    }

    const openweatherData = await response2.json();

    console.log(apiUrl2)
    res.json(openweatherData)

  } catch (error) {
    console.error("API fetch error:", error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// In your Express backend
app.get('/api/settings-exists', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'setting.json');

    const fileContent = await fs.readFile(filePath, 'utf8');
    const settings = JSON.parse(fileContent);

    if (
        !settings.latitude || isNaN(parseFloat(settings.latitude)) ||
        !settings.longitude || isNaN(parseFloat(settings.longitude)) ||
        !settings.apiKey || !settings.dashboardtitle
    ) {
      return res.json({ exists: false });
    }

    return res.json({ exists: true });
  } catch (err) {
    // File does not exist or has invalid JSON
    return res.json({ exists: false });
  }
});





app.listen(port,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});

