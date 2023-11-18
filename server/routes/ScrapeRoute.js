// server/routes/scrape.js

const express = require('express');
const router = express.Router();
const scraperController = require('../controller/scraperController');

router.get('/ScrapeRoute', scraperController.scrapeData);

module.exports = router;
