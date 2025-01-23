import express from 'express'
import { getSuggestionsFromCohere, getSuggestionsFromGemini } from '../controller/suggestionController.js';

const router = express.Router();

// Get suggestions from Cohere LLM
router.post('/cohere', getSuggestionsFromCohere)

// Get suggestions from Gemini LLM
router.post('/gemini', getSuggestionsFromGemini)

export default router;