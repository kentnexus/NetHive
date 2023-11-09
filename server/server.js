const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => console.log(`Server up and running on port ${PORT} !`));

// //initiate scraper 
// const browserObject = require('./client/src/components/VendorScrape');
// browserObject.startBrowser();