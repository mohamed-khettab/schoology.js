const axios = require("axios");
const OAuth1 = require("oauth-1.0a");
const crypto = require("crypto");

/**
 * Schoology API Client for making authenticated requests.
 */
class SchoologyClient {
  /**
   * Creates an instance of SchoologyClient.
   * @param {string} key - The API key.
   * @param {string} secret - The API secret.
   */
  constructor(key, secret) {
    // Check if key and secret are provided
    if (!key || !secret) {
      throw new Error(
        "Key and secret are required to create an instance of SchoologyClient."
      );
    }

    // Initialize key, secret, and base URL
    this.key = key;
    this.secret = secret;
    this.baseURL = "https://api.schoology.com/v1/";

    // Initialize OAuth1 instance
    this.oauth = OAuth1({
      consumer: {
        key: this.key,
        secret: this.secret,
      },
      signature_method: "HMAC-SHA1",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha1", key)
          .update(base_string)
          .digest("base64");
      },
    });
  }

  /**
   * Makes a request to the Schoology API.
   * @param {string} endpoint - The API endpoint.
   * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
   * @param {object|null} data - The data to be sent with the request (for POST or PUT).
   * @param {object} params - The query parameters.
   * @returns {Promise<object>} The response data from the API.
   * @throws {Error} If there's an error processing the request.
   */
  async makeRequest(endpoint, method, data = null, params = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;

      // Construct request data
      const requestData = {
        url,
        method,
        data,
        params,
      };

      // Generate OAuth headers
      const headers = this.oauth.toHeader(this.oauth.authorize(requestData));

      // Make request using axios
      const response = await axios({ method, url, data, params, headers });

      return response.data;
    } catch (error) {
      const errorMessage = `Error while processing request: ${error.message}`;
      console.error(errorMessage);
      throw new Error(error); // Return the error object
    }
  }
}

module.exports = SchoologyClient;
