# 📚 Bookstore RESTful API

A RESTful API for managing books and authors, built with **TypeScript**, **Express.js**, **Knex.js**, and **MySQL/PostgreSQL**. This project supports full CRUD operations, input validation, error handling, pagination, and search functionality.

---

## Features

- Full CRUD for books and authors
- Express Validator for input validation
- Knex.js as SQL query builder
- PostgreSQL/MySQL support
- Views with nested relationships (e.g., authors with their books)
- Pagination and search support
- Centralized error handling
- Environment-based configuration
- Fully typed with TypeScript
- Clean, modular project structure

---

---

## 🧪 Technologies Used

- Node.js
- TypeScript
- Express.js
- Knex.js
- PostgreSQL / MySQL
- Express Validator
- dotenv
- ESLint + Prettier

---

## 🧾 API Endpoints

### 📖 Authors

| Method | Endpoint          | Description                   |
|--------|-------------------|-------------------------------|
| GET    | /authors          | Get all authors               |
| GET    | /authors/:id      | Get an author by ID           |
| POST   | /authors          | Create a new author           |
| PUT    | /authors/:id      | Update an author              |
| DELETE | /authors/:id      | Delete an author              |

### 📚 Books

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| GET    | /books            | Get all books                        |
| GET    | /books/:id        | Get a book by ID                     |
| POST   | /books            | Create a new book                    |
| PUT    | /books/:id        | Update a book                        |
| DELETE | /books/:id        | Delete a book                        |
| GET    | /books?author=6   | Filter books by author ID            |

---

## 📋 Validation Rules

Handled using **Zod**.

**Authors:**

- `name`: Required, non-empty string
- `birthdate`: Required, valid date

**Books:**

- `title`: Required, non-empty string
- `published_date`: Required, valid date
- `author_id`: Required, must reference an existing author

---

## 📄 Views

- **GET /authors-with-books**: List of authors with their books
- **GET /author-with-books/:id**: Details of an author and their books
- **GET /book-with-author/:id**: Details of a book with author info

---

## 🔐 Error Handling

Centralized error handling for:

- Resource not found
- Validation errors
- Database errors

Returns meaningful HTTP status codes and messages.

---

## ⚙️ Environment Setup

### Prerequisites

- Node.js (v18+)
- PostgreSQL
- npm

### Installation

```bash
git clone https://github.com/Anikroy7/bookstore_server.git
cd bookstore-api
npm install
npm run migrate

npm run start:dev

