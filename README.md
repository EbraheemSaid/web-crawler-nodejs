This is a simple web crawler using Nodejs & Cheerio (jQuery alike but for Node) & Axios 
it first uses Axios to make HTTP requests to a specific web page using Promises 
then it gets all the HTML for the requested web page 
after that Cheerio (jQuery) comes in handy and select the various needed tags to crawl a web page
also it supports pagination.