# 📚 BookSphere API Documentation

**Project:** Library Management System  
**Backend:** Spring Boot 4.x  
**Database:** MySQL  
**API Version:** v1

---

# Base URL

```
http://localhost:8080
```

---

# Content Type

All requests and responses use:

```
Content-Type: application/json
```

---

# Book Object

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publisher": "Prentice Hall",
  "isbn": "9780132350884",
  "category": "Programming",
  "price": 699.0,
  "quantity": 12,
  "publishedYear": 2008
}
```

> **Note:**  
> Do **not** send the `id` field while creating a book. The backend generates it automatically.

---

# Validation Rules

| Field | Validation |
|---------|------------|
| title | Mandatory |
| author | Mandatory |
| publisher | Mandatory |
| isbn | Mandatory |
| price | Must be greater than 0 |
| quantity | Cannot be negative |

---

# REST APIs

---

## 1. Add Book

### Endpoint

```
POST /books
```

### Request Body

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publisher": "Prentice Hall",
  "isbn": "9780132350884",
  "category": "Programming",
  "price": 699,
  "quantity": 12,
  "publishedYear": 2008
}
```

### Success Response

```
201 CREATED
```

Example Response

```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "publisher": "Prentice Hall",
  "isbn": "9780132350884",
  "category": "Programming",
  "price": 699,
  "quantity": 12,
  "publishedYear": 2008
}
```

---

## 2. Get All Books

### Endpoint

```
GET /books
```

### Success Response

```
200 OK
```

Example Response

```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "publisher": "Prentice Hall",
    "isbn": "9780132350884",
    "category": "Programming",
    "price": 699,
    "quantity": 12,
    "publishedYear": 2008
  }
]
```

---

## 3. Get Book By ID

### Endpoint

```
GET /books/{id}
```

Example

```
GET /books/1
```

### Success Response

```
200 OK
```

### Error Response

```
404 NOT FOUND
```

---

## 4. Update Book

### Endpoint

```
PUT /books/{id}
```

Example

```
PUT /books/1
```

### Request Body

```json
{
  "title": "Clean Code (Updated)",
  "author": "Robert C. Martin",
  "publisher": "Prentice Hall",
  "isbn": "9780132350884",
  "category": "Programming",
  "price": 799,
  "quantity": 20,
  "publishedYear": 2008
}
```

### Success Response

```
200 OK
```

---

## 5. Delete Book

### Endpoint

```
DELETE /books/{id}
```

Example

```
DELETE /books/1
```

### Success Response

```
204 NO CONTENT
```

---

## 6. Search Books By Title

### Endpoint

```
GET /books/search/title?title={title}
```

Example

```
GET /books/search/title?title=java
```

### Success Response

```
200 OK
```

---

## 7. Search Books By Author

### Endpoint

```
GET /books/search/author?author={author}
```

Example

```
GET /books/search/author?author=martin
```

### Success Response

```
200 OK
```

---

## 8. Filter Books By Category

### Endpoint

```
GET /books/category?category={category}
```

Example

```
GET /books/category?category=Programming
```

### Success Response

```
200 OK
```

---

## 9. Pagination & Sorting

### Endpoint

```
GET /books/page?page=0&size=5&sortBy=price
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| page | Page Number |
| size | Number of Records |
| sortBy | Field Name |

Example

```
GET /books/page?page=0&size=5&sortBy=price
```

---

# HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Request Successful |
| 201 | Resource Created |
| 204 | Resource Deleted Successfully |
| 400 | Validation Failed |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

# Frontend Integration Guide

## Base URL

```
http://localhost:8080
```

## Axios Example

```javascript
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export default api;
```

---

# Expected React Pages

- Dashboard
- Book List
- Add Book
- Edit Book
- View Book Details

---

# Frontend Flow

## Book List

```
GET /books
```

Display all books in a table.

---

## Add Book

```
POST /books
```

Navigate back to Book List after successful creation.

---

## Edit Book

```
GET /books/{id}
```

Populate form.

```
PUT /books/{id}
```

Update book.

---

## View Book

```
GET /books/{id}
```

Display complete book details.

---

## Delete Book

```
DELETE /books/{id}
```

Show a confirmation dialog before deletion.

---

## Search

### By Title

```
GET /books/search/title?title=
```

### By Author

```
GET /books/search/author?author=
```

### By Category

```
GET /books/category?category=
```

---

## Pagination

```
GET /books/page?page=0&size=5&sortBy=price
```

---

# Notes for Frontend Developer

- Do not send `id` while creating a book.
- Use the returned `id` for update and delete operations.
- Validate all required fields before sending the request.
- Display backend validation messages.
- Handle HTTP 400, 404 and 500 responses appropriately.
- Show loading indicators while API requests are in progress.
- Display success and error notifications to users.

---

# Current Backend Features

- ✅ Add Book
- ✅ Get All Books
- ✅ Get Book By ID
- ✅ Update Book
- ✅ Delete Book
- ✅ Search By Title
- ✅ Search By Author
- ✅ Filter By Category
- ✅ Pagination
- ✅ Sorting
- ✅ Bean Validation
- ✅ Global Exception Handling
- ✅ MySQL Integration
