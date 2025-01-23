import express from 'express'
import { getWeatherCurrentConditions } from '../controller/weatherController.js';

const router = express.Router();

// Get suggestions from Cohere LLM
router.post('/', getWeatherCurrentConditions)

export default router;