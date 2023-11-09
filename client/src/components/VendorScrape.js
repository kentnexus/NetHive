// const { Cluster } = require('puppeteer-cluster');
// // const fs = require('fs');

// const urls = [
//     "https://www.cdw.com/search/networking/switches/?w=RJ",
//     "https://www.cdw.com/search/networking/routers/?w=RG",
//     "https://www.cdw.com/search/networking/network-security/?w=RF",
//     "https://www.cdw.com/search/networking/wireless-access-points/?w=RK",
// ];

// async function startBrowser() {
//     let browser;
//     let scrapedData = {};
//     try {
//         console.log("Opening the browser......");
//         browser = await Cluster.launch({
//             concurrency: Cluster.CONCURRENCY_PAGE,
//             maxConcurrency: 4,
//             monitor: true,
//             puppeteerOptions: {
//                 headless: "new",
//                 defaultViewport: false,
//                 args: ["--disable-setuid-sandbox"],
//                 'ignoreHTTPSErrors': true,
//             }
//         });

//         browser.on('taskerror', (err, data) => {
//             console.log(`Error crawling ${data}: ${err.message}`);
//         });


//         await browser.task(async ({ page, data: url }) => {
//             console.log(`Navigating to ...` + url);
//             await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
//             //add scraping here
//             scrapedData = await page.evaluate(() => {
//                 console.log(`Scraping ..` + url);
//                 const devices = Array.from(document.querySelectorAll('div.search-results > div.search-result'))
//                 const data = devices.map(device => ({
//                     product: device.querySelector('h2 > a').innerText,
//                     model: device.querySelector('.product-codes > .mfg-code').innerText,
//                     price: device.querySelector('div.price-type-price').innerText,
//                     url: "https://www.cdw.com" + device.querySelector('h2 > a').getAttribute('href'),
//                 }))
//                 console.log(`Data Scraped for..` + url);
//                 return data
//             })

//         });
//         for (const url of urls) {
//             await browser.queue(url);
//         }

//         //next page: PROBLEM: Selector
//         let nextButtonExist = false;
//         try {
//             const nextButton = await page.$eval('.search-pagination-list-container.tagman.search-pagination-footer > a.no-hover', a => a.textContent);
//             nextButtonExist = true;
//         }
//         catch (err) {
//             nextButtonExist = false;
//         }
//         if (nextButtonExist) {
//             await page.click('.search-pagination-list-container.tagman.search-pagination-footer > a.no-hover');
//             return startBrowser(); // Call this function recursively
//         }


//         await browser.idle();
//         await browser.close();

//         // fs.writeFile("scraped_data.json", JSON.stringify(scrapedData), 'utf8', function (err) {
//         //     if (err) {
//         //         return console.log(err);
//         //     }
//         //     console.log("The data has been scraped and saved successfully! View it at './scraped_data.json'");
//         // });

//     } catch (err) {
//         console.log("Could not create a browser instance => : ", err);
//     }
//     // return browser;
// }

// export default {
//     startBrowser
// };
