// server/controllers/scraperController.js

const { Cluster } = require('puppeteer-cluster');

const scrapeData = async (req, res) => {

  try {
    const urls = [
      "https://www.cdw.com/search/networking/switches/?w=RJ",
      // "https://www.cdw.com/search/networking/routers/?w=RG",
      // "https://www.cdw.com/search/networking/network-security/?w=RF",
      // "https://www.cdw.com/search/networking/wireless-access-points/?w=RK",
    ];

    // Create a new cluster
    console.log("Opening the browser......");
    const browser = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_PAGE,
      maxConcurrency: 4,
      monitor: true,
      puppeteerOptions: {
        headless: "new",
        defaultViewport: false,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true,
      }
    });

    for (const url of urls) {
      await browser.queue(url);
    }

    // Define the scraping task
    await browser.task(async ({ page, data }) => {
      const pageUrl = data;
      console.log(`Navigating to ...` + pageUrl);
      await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 0 });

      // Extract Contents
      const scrapedData = await page.evaluate((pageUrl) => {
        console.log(`Scraping ..` + pageUrl);
        const devices = Array.from(document.querySelectorAll('div.search-results > div.search-result'))
        const data = devices.map(device => ({
          product: device.querySelector('h2 > a').innerText,
          model: device.querySelector('.product-codes > .mfg-code').innerText,
          price: device.querySelector('div.price-type-price').innerText,
          url: "https://www.cdw.com" + device.querySelector('h2 > a').getAttribute('href'),
        }))
        console.log(`Data Scraped for..` + pageUrl);
        return data
      })
      console.log('Scraped data successful', scrapedData);

      //Send scraped data to the client
      res.json({ data: scrapedData });
    });



    browser.on('taskerror', (err, data) => {
      console.log(`Error crawling ${data}: ${err.message}`);
    });



    // Close the browser
    await browser.idle();
    await browser.close();

  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { scrapeData };
