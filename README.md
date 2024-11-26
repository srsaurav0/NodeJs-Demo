# Hotel Management API

## Overview
The **Hotel Management API** is a RESTful service built using Node.js and Express.js with TypeScript for strong typing and scalability. It provides an API to manage hotel and room data, including CRUD operations, image uploads, and data validation.

## Features
- **CRUD Operations**: Create, read, update, and delete hotel and room data.
- **Room Management**: Manage room information for each hotel.
- **Image Uploads**: Upload and associate images with hotels and rooms using `multer`.
- **Slug Generation**: Automatically generate slugs for hotel and room names.
- **Validation and Error Handling**: Comprehensive validation and error handling for data integrity.
- **Unit Tests**: Coverage of all key API functionalities using `Jest` and `Supertest`.


## How to Set Up Node.js, Express.js, and TypeScript

This guide will help you set up a Node.js project with Express.js and TypeScript from scratch. Follow these steps to create your environment and start building your application.

### Prerequisites

Ensure that the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (Version 14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/srsaurav0/NodeJs-ExpressJS-Typescript-Assignment-W3.git
```
### 2. Navigate to the Project Directory
```bash
cd NodeJs-ExpressJS-Typescript-Assignment-W3
```
### 3. Install Dependencies
```bash
npm install
```
### 4. Build the Project
If you're using TypeScript and need to compile the code:
```bash
npm run build
```
### 5. Start the Server
```bash
npm start
```
The server will run at `http://localhost:3000`.
## API Endpoints

### POST /api/hotel
**Create a new hotel**

#### cURL Command:
```bash
curl -X POST http://localhost:3000/api/hotel \
-H "Content-Type: application/json" \
-d '{
    "title": "Seaside Retreat",
    "description": "A beautiful retreat by the sea.",
    "guestCount": 4,
    "bedroomCount": 2,
    "bathroomCount": 1,
    "amenities": ["WiFi", "Ocean View"],
    "hostInformation": {
        "name": "Jane Doe",
        "contact": "jane@example.com"
    },
    "address": "123 Ocean Drive, Seaside City",
    "latitude": 36.7783,
    "longitude": -119.4179,
    "rooms": [
        {
            "hotelSlug": "seaside-retreat",
            "roomSlug": "ocean-suite",
            "roomImage": "/data/images/ocean-suite.jpg",
            "roomTitle": "Ocean Suite",
            "bedroomCount": 1
        }
    ]
}'
```
The hotel should be uploaded inside **/dist/data/hotels** with name ***{hotel-id}.json***
#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select POST** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotel`.
4. **Set Headers**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Navigate to the Body tab**:
   - Choose **raw** and set the type to **JSON**.
   - Paste the following JSON data:
   ```json
   {
       "title": "Seaside Retreat",
       "description": "A beautiful retreat by the sea.",
       "guestCount": 4,
       "bedroomCount": 2,
       "bathroomCount": 1,
       "amenities": ["WiFi", "Ocean View"],
       "hostInformation": {
           "name": "Jane Doe",
           "contact": "jane@example.com"
       },
       "address": "123 Ocean Drive, Seaside City",
       "latitude": 36.7783,
       "longitude": -119.4179,
       "rooms": [
           {
               "hotelSlug": "seaside-retreat",
               "roomSlug": "ocean-suite",
               "roomImage": "/data/images/ocean-suite.jpg",
               "roomTitle": "Ocean Suite",
               "bedroomCount": 1
           }
       ]
   }
   ```
6. **Send** the Request and view the response.
The hotel should be uploaded inside **/dist/data/hotels** with name ***{hotel-id}.json***

### GET /api/hotel
**Retrieve a hotel by ID**

#### cURL Command:
```bash
curl http://localhost:3000/api/hotel/{hotelId}
```
Replace {hotelId} with the actual hotel ID. Example: `curl http://localhost:3000/api/hotel/1731473306735`
The hotel details should appear as a json file.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select GET** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotel/{hotelId}`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/api/hotel/1731473306735`).
4. **Send** the Request and view the response.
The hotel details should appear as a json file.

### GET /api/hotels
**Retrieve all hotels**

#### cURL Command:
```bash
curl http://localhost:3000/api/hotels
```
The hotel details should appear as a json file.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select GET** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotels`.
4. **Send** the Request and view the response.
The hotel details should appear as a json file.

### PUT /api/hotel
**Update an existing hotel**

#### cURL Command:
```bash
curl -X PUT http://localhost:3000/api/hotel/{hotelId} \
-H "Content-Type: application/json" \
-d '{
    "title": "Updated Seaside Retreat",
    "description": "An updated description for the seaside retreat."
}'
```
The hotel with the specific id should be updated. Check if **dist/data/hotels/{hotel-id}.json** file is updated.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select PUT** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotel/{hotelId}`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/api/hotel/1731473306735`).
4. **Set Headers**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Select Body**:
   - Choose `raw` and set `type` to `JSON`.
   - Paste the JSON data for updating the hotel:
   ```json
    {
        "title": "Updated Seaside Retreat",
        "description": "An updated description for the seaside retreat with a luxurious experience.",
        "guestCount": 5,
        "bedroomCount": 3,
        "bathroomCount": 2,
        "amenities": ["WiFi", "Ocean View", "Private Pool"],
        "hostInformation": {
            "name": "Jane Doe Updated",
            "contact": "jane.updated@example.com"
        },
        "address": "456 Ocean Drive, Seaside City Updated",
        "latitude": 36.7785,
        "longitude": -119.4175,
        "rooms": [
            {
                "hotelSlug": "updated-seaside-retreat",
                "roomSlug": "updated-ocean-suite",
                "roomImage": "/data/images/updated-ocean-suite.jpg",
                "roomTitle": "Updated Ocean Suite",
                "bedroomCount": 2
            }
        ]
    }
   ```
6. **Send** the Request and view the response.
The hotel with the specific id should be updated. Check if **dist/data/hotels/{hotel-id}.json** file is updated.

### POST /api/hotel/images
**Upload images for a hotel**

#### cURL Command:
***Using Postman recommended for better experience***
```bash
curl -X POST http://localhost:3000/api/hotel/{hotelId}/images \
-F "images=@path/to/your/image1.jpg" \
-F "images=@path/to/your/image2.jpg"
```
The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of image/images. Check if **dist/data/hotels/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **dist/data/images/**.
#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select POST** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotel/{hotelId}/images`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/api/hotel/1731473306735/images` ).
4. **Set Body**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Navigate to the Body tab**:
   - Choose **form-data**.
   - Add a `key`: `images` for each image you want to upload, set the `type` to `File`, and choose the files from `Select files`.
6. **Send** the Request and view the response.
The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of images. Check if **dist/data/hotels/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **dist/data/images/**.

## Unit Tests
There are two test files inside this repository.
- `hotelRoutes.test.ts`
- `server.test.ts`

***Make sure the server port is available before running the tests***

`hotelroutes.tes.ts` is for testing the critical API functionality which includes **POST**,**PUT**, and **GET** endpoints.
`server.test.ts` is for testing if the connection is established.
To run these tests, use the terminal:
```bash
npm test -- hotelRoutes.test.ts
```
```bash
npm test -- server.test.ts
```
