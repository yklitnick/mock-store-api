# Store API

This is a REST API for a store application, built with Node.js, Express, and MongoDB. It allows users to fetch, filter, sort, and paginate product data.

## Features

- **Filtering**: Filter products by name, company, featured status, price, and rating.
- **Sorting**: Sort results by any field (ascending or descending).
- **Field Selection**: Retrieve only specific fields to reduce payload size.
- **Pagination**: Efficiently paginate through large datasets.

## Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:yklitnick/mock-store-api.git
    cd mock-store-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your MongoDB connection string:

    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbName>
    ```

4.  **Populate the Database (Optional):**
    If you want to seed the database with initial data (from `products.json`), run:
    ```bash
    node populate.js
    ```
    _Note: This will delete all existing products in the database._

## Running the API

Start the server in development mode (using `nodemon`):

```bash
npm start
```

The server will start on port **3000** (or the port defined in `process.env.PORT`).

- **Home**: [http://localhost:3000/](http://localhost:3000/)
- **API Endpoint**: [http://localhost:3000/api/v1/products](http://localhost:3000/api/v1/products)

## API Documentation

### Get All Products

`GET /api/v1/products`

Retrieves a list of products.

#### Query Parameters

| Parameter        | Type      | Description                                                                                   | Example                              |
| :--------------- | :-------- | :-------------------------------------------------------------------------------------------- | :----------------------------------- |
| `featured`       | `boolean` | Filter by featured status (`true`/`false`).                                                   | `?featured=true`                     |
| `company`        | `string`  | Filter by company name (exact match).                                                         | `?company=ikea`                      |
| `name`           | `string`  | Search by product name (case-insensitive partial match).                                      | `?name=sofa`                         |
| `sort`           | `string`  | Sort by fields. Use `-` for descending order. Comma-separated for multiple fields.            | `?sort=name,-price`                  |
| `fields`         | `string`  | Select specific fields to return. Comma-separated.                                            | `?fields=name,price`                 |
| `numericFilters` | `string`  | Filter by numeric values (`price`, `rating`). Supported operators: `>`, `>=`, `=`, `<`, `<=`. | `?numericFilters=price>30,rating>=4` |
| `page`           | `number`  | Page number for pagination. Default is 1.                                                     | `?page=2`                            |
| `limit`          | `number`  | Number of items per page. Default is 10.                                                      | `?limit=5`                           |

#### Examples

1.  **Search by name and sort by price (descending):**

    ```
    GET /api/v1/products?name=a&sort=-price
    ```

2.  **Filter by price (> 30) and rating (>= 4):**

    ```
    GET /api/v1/products?numericFilters=price>30,rating>=4
    ```

3.  **Select only name and price fields:**
    ```
    GET /api/v1/products?fields=name,price
    ```

### Static Route (For Testing)

`GET /api/v1/products/static`

A route with hardcoded filters for testing purposes.
