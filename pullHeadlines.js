import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";

const pullHeadlines = async function() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://oregonlive.com", {
    waitUntil: "networkidle0",
  });

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  const content = await page.content();
  const htmlContent = await page.content();

  let stringText = "<ul>";
  let listOfUrls = [];
  const $ = cheerio.load(htmlContent);
  $(".subscriberExclusive").each((index, element) => {
	let url = $(element).closest("a").attr().href;
    	let processedUrl = new URL(url + "?outputType=amp&message=fuckYourPaywall");
	let headline = $(element).closest("a").text().replace("SubscriberKeyKey that denotes Subscriber Exclusive content.","").substring(0, 70);
    console.log(headline);
	stringText = stringText + `<li><a href="${processedUrl}">${headline}&#8230;</a></li>\n`;
  });

  stringText = stringText + `</ul>`;

fs.writeFileSync("_components/ol-headlines.webc", stringText)

  await browser.close();
}

export default pullHeadlines;
