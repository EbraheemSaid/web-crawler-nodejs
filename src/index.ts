import axios from "axios";
import * as cheerio from "cheerio";

async function main(maxPages = 50) {
    
  // initialized with the first web page to visit
  const paginationUrlToVisit: string[] = ["https://scrapeme.live/shop/"];

  // adding the visited urls to an array to avoid crawling the same page
  const visitedUrls: string[] = [];

  // using Set() to add only unique links
  const productUrls = new Set();

  // iterating over paginationUrlToVisit until its empty or it hits the max pages
  while (paginationUrlToVisit.length !== 0 && visitedUrls.length <= maxPages) {

    // the current web page to crawl
    const paginationUrl: string = paginationUrlToVisit.pop()!;

    // using axios to get the HTML of the page
    const pageHTML = await axios.get(paginationUrl);

    // adding the current web page to visitedUrls
    visitedUrls.push(paginationUrl)

    // integrating cheerio (jQuery alike) but for the server-side
    const $ = cheerio.load(pageHTML.data)

    // iterating over the pagination section to find all urls and adding them to paginationUrlToVisit
    // if it wasnt already crawled 
    $('.page-numbers a').each((index, element) => {
        const paginationUrl = $(element).attr('href')!;

        if( !visitedUrls.includes(paginationUrl) && !paginationUrlToVisit.includes(paginationUrl) ) {
            paginationUrlToVisit.push(paginationUrl)
        }
    });

    // retrieving the links and adding them to the unique Set
    $("li.product a.woocommerce-LoopProduct-link").each((index, element) => {
        const productUrl = $(element).attr('href')
        productUrls.add(productUrl)
    })
  }

  // logging the retrieved urls
  console.log([...productUrls]);
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        // logging the error message
        console.error(e);

        process.exit(1);
    });