// server/controllers/scraperController.js

const { Cluster } = require('puppeteer-cluster');

const scrapeData = async (req, res) => {

  try {
    // const urls = [
    //   "https://www.cdw.com/search/networking/switches/?w=RJ",
    //   "https://www.cdw.com/search/networking/routers/?w=RG",
    //   "https://www.cdw.com/search/networking/network-security/?w=RF",
    //   "https://www.cdw.com/search/networking/wireless-access-points/?w=RK",
    // ];

    const urlCategories = [
      { url: "https://www.cdw.com/search/networking/switches/?w=RJ", product: 'Switch' },
      { url: "https://www.cdw.com/search/networking/routers/?w=RG", product: 'Router' },
      { url: "https://www.cdw.com/search/networking/network-security/?w=RF", product: 'Firewall' },
      { url: "https://www.cdw.com/search/networking/wireless-access-points/?w=RK", product: 'AccessPoint' },
    ];

    // Create a new cluster
    console.log("Opening the browser......");
    const browser = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 4,
      monitor: true,
      puppeteerOptions: {
        headless: true,
        defaultViewport: false,
        args: ["--disable-setuid-sandbox"],
        'ignoreHTTPSErrors': true,
      }
    });

    const scrapedDataArray = [];

    for (const { url, product } of urlCategories) {
      await browser.queue({ url, product });
    }

    let pageIdx = 1;
    // Define the scraping task
    await browser.task(async ({ page, data }) => {
      let hasNextPage = true;
      while (hasNextPage) {
        const pageUrl = `${data.url}&pcurrent=${pageIdx}`;
        console.log(`Navigating to ...` + pageUrl);
        await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 0 });



        // Extract Contents
        try {
          const scrapedData = await page.evaluate((pageUrl, product) => {
            console.log(`Scraping ..` + pageUrl);
            const devices = Array.from(document.querySelectorAll('div.search-results > div.search-result'))
            const data = devices.map(device => ({
              product,
              productdesc: device.querySelector('h2 > a').innerText,
              model: device.querySelector('.product-codes > .mfg-code').innerText,
              price: device.querySelector('div.price-type-price').innerText,
              url: "https://www.cdw.com" + device.querySelector('h2 > a').getAttribute('href'),
            }))
            console.log(`Data Scraped for..` + pageUrl);
            return data
          },data.url, data.product)
          console.log('Scraped data was successful', scrapedData);
          scrapedDataArray.push(...scrapedData);

          // Check for the presence of the "next page" link
          hasNextPage = await page.evaluate(() => {
            const nextPageButton = document.querySelector('a.no-hover');
            return nextPageButton !== null;
          });

          // Move to the next page
          if (hasNextPage) {
            pageIdx++;
          }

        } catch (error) {
          console.error('Error during scraping:', error.message);
        }
      }
    });

    browser.on('taskerror', (err, data) => {
      console.log(`Error crawling ${data}: ${err.message}`);
    });


    // Close the browser
    await browser.idle();
    await browser.close();

    // Send scraped data to the client
    res.json({ data: scrapedDataArray });

  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { scrapeData };
