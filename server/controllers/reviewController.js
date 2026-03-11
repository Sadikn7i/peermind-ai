const { extractTextFromPDF } = require('../services/pdfParser');
const { generateReview } = require('../services/aiService');

const submitReview = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const persona = req.body.persona || 'constructive';

    console.log('Extracting text from PDF...');
    const paperText = await extractTextFromPDF(req.file.buffer);

    if (!paperText || paperText.trim().length < 100) {
      return res.status(400).json({ error: 'Could not extract enough text from PDF' });
    }

    console.log('Sending to AI for review...');
    const review = await generateReview(paperText, persona);

    res.status(200).json({ success: true, review });

  } catch (error) {
    console.error('Review error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitReview };