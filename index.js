const axios = require("axios");
const OAuth1 = require("oauth-1.0a");
const crypto = require("crypto");

class SchoologyClient {
  constructor(key, secret) {
    if (!key || !secret) {
      throw new Error(
        "Key and secret are required to create an instance of SchoologyClient."
      );
    }
    this.key = key;
    this.secret = secret;
    this.baseURL = "https://api.schoology.com/v1/";
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

  async fetchData(url, method, data = null) {
    try {
      const requestData = {
        url: url,
        method: method,
        data: data,
      };
      const headers = this.oauth.toHeader(this.oauth.authorize(requestData));
      const response = await axios({ method, url, data, headers });
      return response.data;
    } catch (error) {
      const errorMessage = `Error while processing request to ${url}: ${error.message}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getSchools() {
    const url = `${this.baseURL}schools`;
    return this.fetchData(url, "GET");
  }

  async getSchool(schoolId) {
    if (!schoolId) {
      throw new Error("Cannot get school without school ID.");
    }
    const url = `${this.baseURL}schools/${schoolId}`;
    return this.fetchData(url, "GET");
  }

  async createSchool(schoolData) {
    if (!schoolData) {
      throw new Error("Cannot create school without school data.");
    }
    const url = `${this.baseURL}schools`;
    return this.fetchData(url, "POST", schoolData);
  }

  async editSchool(schoolId, schoolData) {
    if (!schoolId || !schoolData) {
      throw new Error("Cannot edit school without school ID and data.");
    }
    const url = `${this.baseURL}schools/${schoolId}`;
    return this.fetchData(url, "PUT", schoolData);
  }

  async deleteSchool(schoolId) {
    if (!schoolId) {
      throw new Error("Cannot delete school without school ID.");
    }
    const url = `${this.baseURL}schools/${schoolId}`;
    return this.fetchData(url, "DELETE");
  }

  async getBuildings(schoolId) {
    if (!schoolId) {
      throw new Error("Cannot get buildings without school ID.");
    }
    const url = `${this.baseURL}schools/${schoolId}/buildings`;
    return this.fetchData(url, "GET");
  }

  async getBuilding(schoolId, buildingId) {
    if (!schoolId || !buildingId) {
      throw new Error("Cannot get building without school ID and building ID.");
    }
    const url = `${this.baseURL}schools/${schoolId}/buildings/${buildingId}`;
    return this.fetchData(url, "GET");
  }

  async createBuilding(schoolId, buildingData) {
    if (!schoolId || !buildingData) {
      throw new Error("Cannot create building without school ID and data.");
    }
    const url = `${this.baseURL}schools/${schoolId}/buildings`;
    return this.fetchData(url, "POST", buildingData);
  }

  async createUser(userData) {
    if (!userData) {
      throw new Error("Cannot create user without user data.");
    }
    const url = `${this.baseURL}users`;
    return this.fetchData(url, "POST", userData);
  }

  async getUsers() {
    const url = `${this.baseURL}users`;
    return this.fetchData(url, "GET");
  }

  async getInactiveUsers() {
    const url = `${this.baseURL}users/inactive`;
    return this.fetchData(url, "GET");
  }

  async getUser(userId) {
    if (!userId) {
      throw new Error("Cannot get user without user ID.");
    }
    const url = `${this.baseURL}users/${userId}`;
    return this.fetchData(url, "GET");
  }

  async getInactiveUser(userId) {
    if (!userId) {
      throw new Error("Cannot get inactive user without user ID.");
    }
    const url = `${this.baseURL}users/inactive/${userId}`;
    return this.fetchData(url, "GET");
  }

  async updateUser(userId, userData) {
    if (!userId || !userData) {
      throw new Error("Cannot update user without user ID and data.");
    }
    const url = `${this.baseURL}users/${userId}`;
    return this.fetchData(url, "PUT", userData);
  }

  async deleteUser(userId) {
    if (!userId) {
      throw new Error("Cannot delete user without user ID.");
    }
    const url = `${this.baseURL}users/${userId}`;
    return this.fetchData(url, "DELETE");
  }
}

module.exports = SchoologyClient;
