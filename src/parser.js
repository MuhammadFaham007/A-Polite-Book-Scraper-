const cheerio = require("cheerio");

function parseBooks(html, pageUrl) {
  const $ = cheerio.load(html);
  const books = [];

  $(".product_pod").each((index, element) => {
    const book = $(element);

    // Extract the title
    const title = book.find("h3 a").attr("title")?.trim();

    // Extract and convert the price to a number
    const priceText = book.find(".price_color").text().trim();
    const price = Number(priceText.replace(/[^\d.]/g, ""));

    // Extract availability
    const availability = book
      .find(".availability")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    // Extract the star rating
    const ratingClasses =
      book.find(".star-rating").attr("class") || "";

    const rating = ratingClasses
      .split(/\s+/)
      .find((className) => className !== "star-rating");

    // Convert the relative product URL to an absolute URL
    const href = book.find("h3 a").attr("href");
    const productUrl = href ? new URL(href, pageUrl).href : null;

    // Store the extracted information
    books.push({
      title: title || null,
      price: priceText ? price : null,
      availability: availability || null,
      rating: rating || null,
      productUrl,
    });
  });

  return books;
}

module.exports = { parseBooks };