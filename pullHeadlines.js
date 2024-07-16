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
	listOfUrls.pop(processedUrl);	
	stringText = stringText + `<li><a href="${processedUrl}">${processedUrl}</a></li>\n`;
    console.log("Urls? We've got em");
    console.log(listOfUrls.length);
  });

  stringText = stringText + `</ul>`;

fs.writeFileSync("_components/ol-headlines.webc", stringText)

  await browser.close();
}

export default pullHeadlines;
