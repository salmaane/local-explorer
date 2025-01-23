import { getWeatherForLocation } from "../service/weatherService.js"

// @desc    Get Weather Current Conditions
// @route   GET /api/weather
export const getWeatherCurrentConditions = async (req, res, next) => {
    const {lat, lon} = req.body;
    try {
        const weatherData = await getWeatherForLocation(lat, lon);
        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ msg: 'Failed to fetch weather data', error });
    }
}