const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { submitReview } = require('../controllers/reviewController');

router.post('/', upload.single('pdf'), submitReview);

module.exports = router;