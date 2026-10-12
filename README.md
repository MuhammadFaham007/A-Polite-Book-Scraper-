# Polite Book Scraper

A beginner-friendly web scraper built with Node.js that collects book data from Books to Scrape.

## Features

- Fetches three catalogue pages politely.
- Uses Axios to retrieve HTML.
- Uses Cheerio to extract book details.
- Converts book prices into numbers.
- Validates records with Zod.
- Handles page failures without stopping the entire run.
- Saves validated records as JSON.

## Technologies

- Node.js
- Axios
- Cheerio
- Zod

## Installation

```bash
npm install
```

## Run the scraper

```bash
node index.js
```

## Output

The scraper saves valid book records to:

`output/books.json`

Each book includes its title, price, availability, rating, and product URL.

## Scope

The scraper collects data from the first three catalogue pages, targeting 60 books. It uses a descriptive User-Agent and a delay between requests.

## Educational purpose

This project was created to practice responsible web scraping, HTML parsing, data cleaning, validation, and JSON output.