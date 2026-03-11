const getReviewPrompt = (paperText, persona) => {
  const personas = {
    strict: "You are a strict and rigorous academic reviewer with very high standards.",
    constructive: "You are a constructive and encouraging academic reviewer who balances criticism with support.",
    expert: "You are a domain expert reviewer who focuses deeply on technical accuracy and methodology."
  };

  const reviewerPersona = personas[persona] || personas.constructive;

  return `${reviewerPersona}

You are reviewing the following academic paper. Provide a detailed peer review in valid JSON format only. No extra text, no markdown, just raw JSON.

Return this exact structure:
{
  "title": "detected paper title or Unknown",
  "summary": "2-3 sentence summary of the paper",
  "overallScore": <number 1-10>,
  "recommendation": "Accept / Minor Revision / Major Revision / Reject",
  "sections": {
    "originality": {
      "score": <number 1-10>,
      "feedback": "detailed feedback here"
    },
    "methodology": {
      "score": <number 1-10>,
      "feedback": "detailed feedback here"
    },
    "clarity": {
      "score": <number 1-10>,
      "feedback": "detailed feedback here"
    },
    "references": {
      "score": <number 1-10>,
      "feedback": "detailed feedback here"
    },
    "contribution": {
      "score": <number 1-10>,
      "feedback": "detailed feedback here"
    }
  },
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "weaknesses": ["weakness 1", "weakness 2", "weakness 3"],
  "suggestionsForImprovement": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Here is the paper to review:
${paperText.slice(0, 15000)}`;
};

module.exports = { getReviewPrompt };