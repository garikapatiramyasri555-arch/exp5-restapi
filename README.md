# Experiment 5 - Complete RESTful API

## Aim
To build a complete RESTful API using Node.js, Express.js and SQLite with CRUD operations, input validation, structured JSON responses, and error handling.

## Technologies Used
- Node.js
- Express.js
- SQLite
- better-sqlite3

## Features
- Create a book
- View all books
- View a book by ID
- Update a book
- Delete a book
- Input validation
- Consistent JSON responses
- Error handling

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/books` | Create a new book |
| GET | `/books` | Get all books |
| GET | `/books/:id` | Get a book by ID |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## Run Locally

```bash
npm install
npm start
