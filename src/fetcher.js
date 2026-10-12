const axios = require("axios");

const USER_AGENT =
  "BookScraperLearningProject/1.0 (educational practice)";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPage(url) {
  // Wait before sending the request
  await wait(1500);

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html",
      },
      timeout: 10000,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        `Request failed with status ${error.response.status}`
      );
    }

    if (error.code === "ECONNABORTED") {
      throw new Error("Request timed out.");
    }

    throw new Error(`Could not fetch page: ${error.message}`);
  }
}

module.exports = { fetchPage };