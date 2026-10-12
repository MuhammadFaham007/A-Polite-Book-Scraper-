const { fetchPage } = require("./src/fetcher");
const { parseBooks } = require("./src/parser");
const { bookSchema } = require("./src/schema");

const fs = require("fs/promises");
const path = require("path");

const BASE_URL = "https://books.toscrape.com/";

const pageUrls = [
  BASE_URL,
  `${BASE_URL}catalogue/page-2.html`,
  `${BASE_URL}catalogue/page-3.html`,
];

async function main() {
  const allBooks = [];
  const pageFailures = [];

  for (const [index, url] of pageUrls.entries()) {
    const pageNumber = index + 1;

    console.log(`\nFetching page ${pageNumber}: ${url}`);

    try {
      const html = await fetchPage(url);
      const books = parseBooks(html, url);

      if (books.length === 0) {
        pageFailures.push({
          page: pageNumber,
          url,
          error: "No books were extracted",
        });
        continue;
      }

      allBooks.push(...books);

      console.log(
        `Page ${pageNumber}: ${books.length} books extracted.`
      );
    } catch (error) {
      pageFailures.push({
        page: pageNumber,
        url,
        error: error.message,
      });

      console.error(`Page ${pageNumber} failed: ${error.message}`);
    }
  }

  const validBooks = [];
  const invalidBooks = [];

  for (const [index, book] of allBooks.entries()) {
    const result = bookSchema.safeParse(book);

    if (result.success) {
      validBooks.push(result.data);
    } else {
      invalidBooks.push({
        recordNumber: index + 1,
        title: book.title,
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
  }

  const outputDirectory = path.join(__dirname, "output");
  const outputFile = path.join(outputDirectory, "books.json");

  await fs.mkdir(outputDirectory, { recursive: true });

  await fs.writeFile(
    outputFile,
    JSON.stringify(validBooks, null, 2),
    "utf8"
  );

  console.log("\n========== SCRAPING SUMMARY ==========");
  console.log("Books collected:", allBooks.length);
  console.log("Valid books:", validBooks.length);
  console.log("Invalid books:", invalidBooks.length);
  console.log("Failed pages:", pageFailures.length);
  console.log("JSON saved to:", outputFile);

  if (invalidBooks.length > 0) {
    console.log("\nInvalid records:");
    console.log(JSON.stringify(invalidBooks, null, 2));
  }

  if (pageFailures.length > 0) {
    console.log("\nPage failures:");
    console.log(JSON.stringify(pageFailures, null, 2));
  }
}

main().catch((error) => {
  console.error("Unexpected scraper error:", error.message);
  process.exitCode = 1;
});