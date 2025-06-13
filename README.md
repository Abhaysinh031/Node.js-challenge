# 🌦️ Weather CLI Tool

A simple Node.js command-line tool to get current weather information for any city using the [OpenWeatherMap API](https://openweathermap.org/api). Includes optional caching to reduce API calls.

---

## 📦 Features

- 🌍 Get weather by city name
- 🌡️ Shows temperature, weather condition, and wind speed
- 💾 Caching mechanism (10-minute cache)

---


---

## 🔧 Installation

1. Clone the repository or download the code.

2. Open a terminal in the project folder and run:

   ```bash
   npm install

   ```

---

## 🚀 Usage

### ✅ Run the CLI Tool:

 ```bash
    node weather.js <city_name>
    node wather.js mumbai
 ```


### Output:

```bash
☁️  Live weather for "London":
🌡️  Temperature: 18.3°C
🌥️  Condition: scattered clouds
💨 Wind Speed: 5.1 m/s
```

### If called again within 10 minutes, it uses cached data:

```bash
📦 Cached weather for "London":
🌡️  Temperature: 18.3°C
🌥️  Condition: scattered clouds
💨 Wind Speed: 5.1 m/s
```

## 📜 License
#### MIT — free to use and modify.
