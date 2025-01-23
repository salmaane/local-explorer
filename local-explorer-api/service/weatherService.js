const OPENWEATHER_API_KEY = process.env.OPEN_WEATHER_API;

// Mock Data to preserve weather API available requests
const weatherdata = {
    coord: { lon: -7.6039, lat: 33.5899 },
    weather: [
      {
        id: 803,
        main: 'Clouds',
        description: 'broken clouds',
        icon: '04d'
      }
    ],
    base: 'stations',
    main: {
      temp: 297.2,
      feels_like: 296.57,
      temp_min: 297.2,
      temp_max: 298.25,
      pressure: 1012,
      humidity: 35,
      sea_level: 1012,
      grnd_level: 1004
    },
    visibility: 10000,
    wind: { speed: 2.68, deg: 260 },
    clouds: { all: 54 },
    dt: 1737555056,
    sys: {
      type: 2,
      id: 47681,
      country: 'MA',
      sunrise: 1737531138,
      sunset: 1737568283
    },
    timezone: 3600,
    id: 2553604,
    name: 'Casablanca',
    cod: 200
}

export const getWeatherForLocation = async (latitude, longitude) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(`Failed to get weather data: ${error}`);
        throw error
    }
}