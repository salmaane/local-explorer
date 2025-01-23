import { getWeatherForLocation } from "../service/weatherService.js"
import {getActivitySuggestionGemini, getActivitySuggestionCohere} from '../service/suggestionService.js'


// @desc    Get activity suggestions from Cohere LLM
// @route   GET /api/suggestions/cohere
export const getSuggestionsFromCohere = async (req, res, next) => {
    const {lat, lon} = req.body;

    try {
        const weatherData = await getWeatherForLocation(lat, lon)
        const suggestions = await getActivitySuggestionCohere(weatherData)
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ msg: 'Failed to fetch suggestions data', error });
    }
}

// @desc    Get activity suggestions from Gemini LLM
// @route   GET /api/suggestions/gemini
export const getSuggestionsFromGemini = async (req, res, next) => {
    const {lat, lon} = req.body;

    try {
        const weatherData = await getWeatherForLocation(lat, lon)
        const suggestions = await getActivitySuggestionGemini(weatherData)
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ msg: 'Failed to suggestions data', error });
    }
}