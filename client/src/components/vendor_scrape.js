const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();

  // Navigate the page to a URL and wait until loaded
  await page.goto('https://www.cdw.com/search/networking/switches/ethernet-switches/?w=RJ1&gclid=Cj0KCQjwhfipBhCqARIsAH9msbn2SlekrLn_naCV5CHCpFZSkw6GDBPTeK9PojtKHA1sRPM5U2smA6oaAnW9EALw_wcB&cm_ven=acquirgy&cm_cat=google&cm_pla=Juniper&cm_ite=Juniper+Ethernet+Switch+B&ef_id=Cj0KCQjwhfipBhCqARIsAH9msbn2SlekrLn_naCV5CHCpFZSkw6GDBPTeK9PojtKHA1sRPM5U2smA6oaAnW9EALw_wcB%3aG%3as&s_kwcid=AL!4223!3!322821752098!b!!g!!juniper+switch!1669121661!65672160478&ln=0&pcurrent=2',{
    waitUntil: 'load',
    timeout: 0
  });

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  //change navigation timeout from default 30 seconds to 2 mins
  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  // get products data
  const  deviceElements = await page.evaluate(() =>  {
  const devices = Array.from(document.querySelectorAll('div.search-results > div.search-result'))
  const data = devices.map(device => ({
      product: device.querySelector('h2 > a').innerText,
      model: device.querySelector('.product-codes > .mfg-code').innerText,
      price: device.querySelector('div.price-type-price').innerText,
      url: device.querySelector('h2 > a').getAttribute('href'),
    }))
    return data
  })

  console.log("log is running");
  console.log(deviceElements);
  await browser.close()

//collect the data 'deviceElements' into the database then display to "Soluitons tab"

  
})();