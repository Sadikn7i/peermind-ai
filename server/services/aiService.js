const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getReviewPrompt } = require('../prompts/reviewPrompt');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateReview = async (paperText, persona) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = getReviewPrompt(paperText, persona);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleaned = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return parsed;
  } catch (error) {
    throw new Error('AI review failed: ' + error.message);
  }
};

module.exports = { generateReview };