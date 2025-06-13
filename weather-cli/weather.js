

const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API_KEY = "a468fa277c2da10f2783c231b6462d5a";
const CACHE_FILE = path.join(__dirname, 'cache.json');
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Load cache
function loadCache() {
  if (!fs.existsSync(CACHE_FILE)) return {};
  return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
}

// Save cache
function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

// Fetch weather from OpenWeather
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const res = await axios.get(url);
  return res.data;
}

// CLI main function
async function main() {
  const city = process.argv.slice(2).join(' ');
  if (!city) {
    console.error('❌ Please provide a city name.');
    process.exit(1);
  }

  let cache = loadCache();
  const now = Date.now();

  // Check cache
  if (
    cache[city] &&
    now - cache[city].timestamp < CACHE_DURATION
  ) {
    console.log(`📦 Using cached data for "${city}":`);
    displayWeather(cache[city].data);
    return;
  }

  try {
    const data = await fetchWeather(city);
    cache[city] = { timestamp: now, data };
    saveCache(cache);

    console.log(`☁️  Live weather for "${city}":`);
    displayWeather(data);
  } catch (err) {
    console.error('❌ Error fetching weather:', err.response?.data?.message || err.message);
  }
}

// Display function
function displayWeather(data) {
  const temp = data.main.temp;
  const condition = data.weather[0].description;
  const wind = data.wind.speed;

  console.log(`🌡️  Temperature: ${temp}°C`);
  console.log(`🌥️  Condition: ${condition}`);
  console.log(`💨 Wind Speed: ${wind} m/s`);
}

main();
