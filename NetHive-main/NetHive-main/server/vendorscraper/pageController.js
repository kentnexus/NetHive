const pageScraper = require('./pageScraper');
const fs = require('fs');
async function scrapeAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;
		let scrapedData = {};
		// Call the scraper for different set of books to be scraped
		scrapedData['Switches'] = await pageScraper.scraper(browser, 'Switches');
		scrapedData['Routers'] = await pageScraper.scraper(browser, 'Routers');
		scrapedData['Wireless Access Points'] = await pageScraper.scraper(browser, 'Wireless Access Points');
		scrapedData['Network Security'] = await pageScraper.scraper(browser, 'Network Security');

		await browser.close();
		fs.writeFile("scraped_data.json", JSON.stringify(scrapedData), 'utf8', function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("The data has been scraped and saved successfully! View it at './scraped_data.json'");
		});
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)