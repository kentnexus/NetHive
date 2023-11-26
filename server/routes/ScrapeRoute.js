// server/routes/scrape.js

const router = require("express").Router();
// const router = express.Router();
const scraperController = require("../controller/scraperController");

router.get("/ScrapeRoute", scraperController.scrapeData);

module.exports = router;
