// const scraperObject = {
//     url: 'https://www.cdw.com/search/networking/?w=R',
//     async scraper(browser, category){
//         let page = await browser.newPage();
//         console.log(`Navigating to ${this.url}...`);
//         // Navigate to the selected page
//         await page.goto(this.url);

//         //change navigation timeout from default 30 seconds to 2 mins
//         page.setDefaultNavigationTimeout(2 * 60 * 1000);

//         // Select the category of device to be displayed
// 		let selectedCategory = await page.$$eval('.filters-container > ul > li:nth-child(1) > div > div:nth-child(8) > div > label', (links, _category) => {

// 			// Search for the element that has the matching text
// 			links = links.map(label => label.textContent.replace(/(\r\n\t|\n|\r|\t|^\s|\s$|\B\s|\s\B)/gm, "") === _category ? label : null);
// 			let link = links.filter(tx => tx !== null)[0];
// 			return link.data-filter-url;
// 		}, category);
// 		// Navigate to the selected category
// 		await page.goto(selectedCategory);
//         let scrapedData = [];
//         // Wait for the required DOM to be rendered
//         async function scrapeCurrentPage(category){

//         //get device information
//         async(resolve, reject) => {
//                 let dataObj = Array.from(document.querySelectorAll('div.search-results > div.search-result'));
//                 dataObj['product'] = category;
//                 dataObj['title'] = await page.$eval('h2 > a').innerText;
//                 // dataObj['model'] = await page.$eval('.price_color', text => text.textContent);
//                 // dataObj['price'] = await page.$eval('#product_gallery img', img => img.src);
//                 // dataObj['url'] = await page.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
//                 resolve(dataObj);
//                 await page.close();
//             };

//             // When all the data on this page is done, click the next button and start the scraping of the next page
//             // You are going to check if this button exist first, so you know if there really is a next page.
//             let nextButtonExist = false;
//             try{
//                 const nextButton = await page.$eval('.search-pagination-list-container.tagman.search-pagination-footer > a', a => a.textContent);
//                 nextButtonExist = true;
//             }
//             catch(err){
//                 nextButtonExist = false;
//             }
//             if(nextButtonExist){
//                 await page.click('.search-pagination-list-container.tagman.search-pagination-footer > a');   
//                 return scrapeCurrentPage(); // Call this function recursively
//             }
//             await page.close();
//             return scrapedData;
//         }
//         let data = await scrapeCurrentPage();
//         console.log(data);
//         return data;
//     }
// }

// module.exports = scraperObject;