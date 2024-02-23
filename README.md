# schoology.js

## Introduction

schoology.js is a Node.js library for interacting with the Schoology API. It allows developers to authenticate with Schoology and make requests to various API endpoints.

## Installation

You can install the package via npm:

`npm install schoology.js`

## Get Started

```
const SchoologyClient = require("schoology.js");

// Replace "your_key" and "your_secret" with your actual key and secret. 
// Obtain your key and secret by visiting https://[district_name].schoology.com/api
const client = new SchoologyClient("your_key", "your_secret");

// Example usage:
async function exampleUsage() {
  try {
    // Fetching a list of schools
    const schools = await client.makeRequest("schools", "GET");
    console.log("Schools:", schools);
    
    // Fetching a specific school by its ID
    const schoolId = 123; // Replace 123 with an actual school ID
    const school = await client.makeRequest(`schools/${schoolId}`, "GET");
    console.log(`School with ID ${schoolId}:`, school);
    
    // Creating a new school
    const newSchoolData = { name: "New School", location: "Somewhere" };
    const createdSchool = await client.makeRequest("schools", "POST", newSchoolData);
    console.log("Created School:", createdSchool);
    
    // Fetching buildings of a specific school
    const buildings = await client.makeRequest(`schools/${schoolId}/buildings`, "GET");
    console.log(`Buildings for school with ID ${schoolId}:`, buildings);
    
    // Fetching users
    const users = await client.makeRequest("users", "GET");
    console.log("Users:", users);
    
    // Creating a new user
    const newUser = { name: "John Doe", email: "john@example.com" };
    const createdUser = await client.makeRequest("users", "POST", newUser);
    console.log("Created User:", createdUser);
    
    // Fetching groups
    const groups = await client.makeRequest("groups", "GET");
    console.log("Groups:", groups);
    
    // Fetching group categories
    const groupCategories = await client.makeRequest("groups/categories", "GET");
    console.log("Group Categories:", groupCategories);
    
    // Fetching courses
    const courses = await client.makeRequest("courses", "GET");
    console.log("Courses:", courses);
    
    // Add more API calls as needed...
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

exampleUsage();

```

For more examples and details, see the  [API documentation]("https://developers.schoology.com/api-documentation/rest-api-v1/")

## Constructor

### `new SchoologyClient(key, secret)`

Creates a new instance of the SchoologyClient.

- `key` (string): The API key provided by Schoology.
- `secret` (string): The API secret provided by Schoology.

## Methods

### `makeRequest(endpoint, method, data = null, params = {})`

Make a request to the Schoology API.

- `endpoint` (string): The API endpoint.
- `method` (string): The HTTP method (GET, POST, PUT, DELETE, etc.).
- `data` (object|null): The data to be sent with the request (for POST or PUT).
- `params` (object): The query parameters.
