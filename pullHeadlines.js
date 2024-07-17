import puppeteer from "puppeteer";
import cheerio from "cheerio";
import fs from "fs";

const pullHeadlines = async function () {
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

  const processLink = function (link, source) {
    let url = $(link).children("a").attr().href;
    let processedUrl = new URL(url + "?outputType=amp&message=fuckYourPaywall");
    let headline = $(link).text();

    if ($(link).hasClass(".article")) {
    }

    let processedHeadline = headline
      .replace(
        "SubscriberKeyKey that denotes Subscriber Exclusive content.",
        "",
      )
      .split(/\.(?=[^\.]+$)/)[0];

    if (source === "sidebar") {
      processedHeadline = processedHeadline
	.split(/(?<=^\S+)\s/)[1]
	.replace("KeyKey that denotes Subscriber Exclusive content.", "")
    }
    if (source === "main") {
      processedHeadline.replace("Subscriber", "");
    }

    stringText =
      stringText +
      `<li><a href="${processedUrl}">${processedHeadline}</a></li>\n`;
    console.log(stringText);
  };
  // Grab headlines from sidebar
  $(".module__recent li.article")
    .has(".subscriberExclusive")
    .each((index, element) => {
      processLink(element, "sidebar");
    });

  // Grab headlines from main
  $(".article--lead")
    .has(".subscriberExclusive")
    .each((index, element) => {
      processLink(element, "main");
    });

  stringText = stringText + `</ul>`;

  fs.writeFileSync("_components/ol-headlines.webc", stringText);

  await browser.close();
};

export default pullHeadlines;
