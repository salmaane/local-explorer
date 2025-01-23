import { CohereClientV2 } from 'cohere-ai'
import { GoogleGenerativeAI } from '@google/generative-ai'

const COHERE_API_KEY = process.env.COHERE_API;
const GEMINI_API_KEY = process.env.GEMINI_API;
const prompt = (weatherData, time) => {

  const textPrompt = `Suggest 3 activities for someone located at latitude ${weatherData.coord.lat}, longitude ${weatherData.coord.lon} 
  in ${weatherData.name} city, where the weather is ${weatherData.weather[0].description}, 
  and the time is ${time}. Include both indoor and outdoor options.`;

  const prompt = `You are a local activity suggestion engine. Given the location, time, and weather conditions, 
  suggest activities 4 or more in the following JSON format:
    {
      "activities": [
        {
          "name": "Activity Name",
          "description": "Brief description of the activity.",
          "category": "Outdoor" | "Indoor",
          "duration": "Estimated duration (e.g., 2 hours)",
          "location": "Specific location or area (e.g., Central Park)",
          "weather_condition": "Ideal weather for this activity (e.g., Sunny, Rainy)",
          "complete_location": "the complete location name so i can search the exact location in google maps, so its better to include city name too "
        }
      ]
    }
    Latitude: ${weatherData.coord.lat}
    Longitude: ${weatherData.coord.lon}
    Location: ${weatherData.name}
    Time: ${time}
    Weather: ${weatherData.weather[0].description}
    
    Note: Dont send me additional text before the JSON! give only the JSON text directly`;

  return prompt;
};

export const getActivitySuggestionCohere = async (weatherData) => {
    const cohere = new CohereClientV2({
        token: COHERE_API_KEY,
    });

    const response = await cohere.chat({
        model: 'command-r',
        messages: [
          {
            role: 'user',
            content: prompt(weatherData, getCurrentTime()),
          },
        ],
    });

    return cleanLLMJson(response.message.content[0].text);
};

export const getActivitySuggestionGemini = async (weatherData) => {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt(weatherData, getCurrentTime()));
    return cleanLLMJson(result.response.text());
}


const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' });
  const season = getCurrentSeason(now);

  return `${hours}:${minutes} on a ${dayOfWeek} in ${season}`;
};

const getCurrentSeason = (date) => {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'autumn';
  return 'winter';
};

function cleanLLMJson(rawData) {
  try {
    const cleaned = rawData.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleaned);
  } catch(err) {
    console.log(err);
    throw new Error('Failed to parse JSON string. : ' + err)
  }
}