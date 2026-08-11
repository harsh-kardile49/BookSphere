# BookSphere

A production-grade Full Stack Library Management System built with **Spring Boot 4.x**, **Java 26**, **MySQL**, **React 19**, **Vite 8**, **TypeScript**, and **Bootstrap 5**.

---

## 1. Project Overview

**BookSphere** is an enterprise-ready, full-stack web application designed to automate and streamline core operations for academic, institutional, and public libraries. The system replaces fragmented manual processes with a centralized digital management platform.

It facilitates complete physical library book cataloging, user/member lifecycle management, real-time stock-aware borrowing and returning operations, automated due date tracking, and dynamic operational analytics dashboards.

The application adheres to modern software design patterns, employing a layered architecture on the backend with Spring Boot and Spring Security (JWT authentication), a decoupled single-page frontend (SPA) built with React and Vite, and a normalized MySQL database.

---

## 2. Problem Statement

Traditional library administration relies heavily on physical registers or disconnected spreadsheet software, introducing major operational bottlenecks:

- **Inventory Discrepancy**: Manual record-keeping causes mismatches between catalog records and physical bookshelf availability.
- **Transaction Delays**: Issuing and returning books requires redundant manual entry, increasing queue times during peak hours.
- **Unreachable Overdue Tracking**: Lack of automated loan tracking makes identifying overdue items and calculating fines error-prone.
- **User Frustration**: Library members lack visibility into available book stock before visiting the library physically.

**BookSphere** solves these issues by providing a synchronized platform where every transaction (borrowing or returning) dynamically updates inventory stock levels and user loan records in real time.

---

## 3. Objectives

- **RESTful Backend Infrastructure**: Deliver high-performance, validated, and documented REST endpoints using Spring Boot 4.x.
- **Stateless JWT Security**: Implement secure authentication and token-based authorization via Spring Security and JSON Web Tokens.
- **Dynamic Inventory Control**: Ensure strict database-level transactional integrity so book issuing decrements stock while book returning restores stock automatically.
- **Modern User Experience**: Build an intuitive React UI featuring 3D editorial book cards, instant client-side search, real-time KPI metrics, and responsive modal workflows.
- **Data Integrity & Robust Error Handling**: Enforce strict Bean Validation rules and return standardized JSON error messages for all exception scenarios.

---

## 4. Key Features

### 🔐 Authentication & Access Control
- **User Registration with Auto-Login**: New users register with custom roles (`STUDENT`, `LIBRARIAN`, `ADMIN`, `USER`) and receive a JWT token immediately upon signup.
- **Secure JWT Session Policy**: Single-token stateless authentication with automatic session restoration and token attachment across requests.
- **Password Security**: Passwords stored using Spring Security's `BCryptPasswordEncoder`.

### 📚 Book Catalog Management
- **Full RESTful CRUD**: Add, retrieve, update, and delete books with fields including Title, Author, Publisher, ISBN, Category, Price, Quantity, Published Year, and Image URL.
- **3D Editorial Book Showcase**: Interactive detail view featuring dynamic color cover generation, fallback initials, and shelf placement metrics (`Section B4 • Shelf 12`).
- **Instant Client-Side Filtering**: Live instant search across Title, Author, Category, and ISBN.

### 👥 Member Management
- **Centralized User Database**: Admin/Librarian view of all registered members linked directly to backend `/users` endpoints.
- **Member CRUD Operations**: Create new members, edit profile details, update roles, and delete member accounts.
- **Active Loan Integration**: View current borrowed books and overdue counts directly within member details drawers.

### 🔄 Book Lending & Return Workflows
- **Stock-Aware Issue Transaction**: Issue books to members with automated due-date calculation (default 14 days). Issuing automatically decrements available book stock in MySQL.
- **Inventory-Restoring Return Transaction**: Return active loans; automatically updates loan status to `RETURNED` and increments available catalog stock (+1).

### 📊 Real-Time Operations Dashboard
- **Dynamic Database KPIs**: Live card widgets reflecting exact counts for Total Books, Total Available Stock, Active Loans, and Registered Members.
- **Recent Borrowing Table**: Displays recent library transactions with borrower names, book titles, due dates, and status badges.

---

## 5. Technology Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Java** | 26 | Core Programming Language |
| **Spring Boot** | 4.1.0 | Application Framework |
| **Spring Security** | 6.x / 7.x | Authentication & Authorization Framework |
| **Spring Data JPA** | 4.x | Database Abstraction & ORM |
| **Hibernate** | 6.x | JPA Provider |
| **jjwt (Java JWT)** | 0.12.6 | JWT Token Generation & Validation |
| **MySQL Connector/J** | 9.x | Database Driver |
| **Lombok** | 1.18+ | Boilerplate Code Reduction |
| **Jakarta Validation** | 3.x | DTO & Entity Bean Validation |
| **Maven** | 3.x | Build and Dependency Management |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19.2.8 | User Interface Library |
| **Vite** | 8.2.0 | Frontend Build Tool & Dev Server |
| **TypeScript** | 6.0.2 | Static Type Safety |
| **React Router DOM** | 7.18.2 | Single-Page Routing |
| **Axios** | 1.19.0 | HTTP Client with Interceptors |
| **Bootstrap** | 5.3.8 | UI Components & Grid |
| **Framer Motion** | 13.0.0 | Dynamic Animations & Micro-interactions |
| **Lucide React** | 1.29.0 | Icon Library |
| **Zustand** | 5.0.14 | Global State Management |
| **React Hook Form** | 7.84.0 | Form State Management |
| **Zod** | 4.4.3 | Client-side Schema Validation |
| **Sonner** | 2.0.7 | Toast Notification System |

### Database & Dev Tools
- **Database**: MySQL 8.0 / MySQL 8.4 (Compatible with Localhost MySQL & Aiven Cloud MySQL)
- **API Testing**: Postman / cURL
- **IDE**: IntelliJ IDEA / VS Code

---

## 6. System Architecture

BookSphere uses a decoupled, two-tier client-server architecture:

```
+-------------------------------------------------------------+
|                      React 19 SPA (Vite)                    |
|  [ Dashboard ]  [ Books Catalog ]  [ Members ]  [ Borrow ]  |
+------------------------------+------------------------------+
                               |
                        HTTP / REST APIs
                      (Authorization: Bearer <JWT>)
                               |
+------------------------------v------------------------------+
|                     Spring Boot 4.x Backend                 |
|                                                             |
|  [ Security Filter / JwtAuthenticationFilter ]             |
|                                                             |
|  [ RestControllers ]                                        |
|      ├── AuthController    ├── BookController               |
|      ├── UserController    └── BorrowController             |
|                                                             |
|  [ Service Layer ]                                          |
|      ├── AuthServiceImpl   ├── BookServiceImpl              |
|      ├── UserServiceImpl   └── BorrowServiceImpl            |
|                                                             |
|  [ Repositories (Spring Data JPA) ]                        |
|      ├── UserRepository    ├── BookRepository               |
|      └── BorrowRepository                                   |
+------------------------------+------------------------------+
                               |
                           JDBC / SQL
                               |
+------------------------------v------------------------------+
|                        MySQL Database                       |
|   Tables: [ users ]    [ books ]    [ borrow_transactions ] |
+-------------------------------------------------------------+
```

---

## 7. Project Structure

```
BookSphere/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ibm/
│   │   │   │   ├── config/
│   │   │   │   │   ├── PasswordConfig.java
│   │   │   │   │   ├── SecurityConfig.java
│   │   │   │   │   └── WebConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   ├── BookController.java
│   │   │   │   │   ├── BorrowController.java
│   │   │   │   │   └── UserController.java
│   │   │   │   ├── dto/
│   │   │   │   │   ├── BorrowRequest.java
│   │   │   │   │   ├── BorrowResponse.java
│   │   │   │   │   ├── JwtResponse.java
│   │   │   │   │   ├── LoginRequest.java
│   │   │   │   │   ├── RegisterRequest.java
│   │   │   │   │   ├── UserRequest.java
│   │   │   │   │   └── UserResponse.java
│   │   │   │   ├── entity/
│   │   │   │   │   ├── Book.java
│   │   │   │   │   ├── BorrowTransaction.java
│   │   │   │   │   ├── Role.java
│   │   │   │   │   └── User.java
│   │   │   │   ├── exception/
│   │   │   │   │   ├── BookNotFoundException.java
│   │   │   │   │   ├── EmailAlreadyExistsException.java
│   │   │   │   │   ├── ErrorResponse.java
│   │   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   │   └── UserNotFoundException.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── BookRepository.java
│   │   │   │   │   ├── BorrowRepository.java
│   │   │   │   │   └── UserRepository.java
│   │   │   │   ├── security/
│   │   │   │   │   ├── CustomUserDetailsService.java
│   │   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   │   ├── JwtService.java
│   │   │   │   │   └── UserPrincipal.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   ├── AuthServiceImpl.java
│   │   │   │   │   ├── BookService.java
│   │   │   │   │   ├── BookServiceImpl.java
│   │   │   │   │   ├── BorrowService.java
│   │   │   │   │   ├── BorrowServiceImpl.java
│   │   │   │   │   ├── UserService.java
│   │   │   │   │   └── UserServiceImpl.java
│   │   │   │   └── BooksphereApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── common/ (Navbar, Sidebar, Footer, LoadingSpinner, Toast, etc.)
│   │   ├── layouts/
│   │   │   ├── AdminLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── pages/
│   │   │   ├── Auth/ (Login.tsx, Register.tsx)
│   │   │   ├── Books/ (Books.tsx, BookDetail.tsx, AddBook.tsx)
│   │   │   ├── Borrow/ (Borrow.tsx)
│   │   │   ├── Dashboard/ (Dashboard.tsx, KpiCards.tsx, RecentActivity.tsx)
│   │   │   ├── Members/ (Members.tsx, AddMemberModal.tsx, EditMemberModal.tsx)
│   │   │   ├── Return/ (Return.tsx)
│   │   │   ├── Settings/ (Settings.tsx)
│   │   │   └── NotFound.tsx
│   │   ├── routes/
│   │   │   ├── AppRoutes.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── book.service.ts
│   │   │   ├── borrow.service.ts
│   │   │   └── user.service.ts
│   │   ├── store/
│   │   │   └── authStore.ts
│   │   ├── types/
│   │   │   ├── auth.ts
│   │   │   └── book.ts
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   ├── helper.ts
│   │   │   └── storage.ts
│   │   ├── validation/
│   │   │   ├── loginSchema.ts
│   │   │   └── registerSchema.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── docs/
│   ├── BACKEND_API_DOCUMENTATION.md
│   ├── PROJECT_COMPLETION_REPORT.md
│   └── PROJECT_IMPLEMENTATION_STATUS_AND_NEXT_STEPS.md
├── ACTIONPLAN.md
└── README.md
```

---

## 8. User Roles and Permissions

User roles are represented by the Java Enum `Role`:

```java
public enum Role {
    STUDENT,
    LIBRARIAN,
    ADMIN,
    USER
}
```

| Role | Catalog Operations | Member Operations | Borrow & Return Operations | Dashboard Access |
|---|---|---|---|---|
| **ADMIN** | Full Access (Create, Read, Update, Delete) | Full Access (Create, Read, Update, Delete) | Full Access (Issue & Return Books) | Full Access |
| **LIBRARIAN** | Full Access (Create, Read, Update, Delete) | Full Access (Create, Read, Update, Delete) | Full Access (Issue & Return Books) | Full Access |
| **STUDENT** | Read Access (Browse & View Details) | Read Access (View Self Profile) | Can initiate borrow requests / view active loans | Student View |
| **USER** | Read Access | Read Access | Can initiate borrow requests | Standard View |

---

## 9. Authentication and Authorization Flow

```
   [ Client Browser ]                              [ Spring Boot Backend ]
           |                                                  |
           |  1. POST /auth/login {email, password}           |
           |------------------------------------------------->|
           |                                                  |-- Authenticate via DaoAuthenticationProvider
           |                                                  |-- Generate JWT with UserPrincipal
           |  2. Returns 200 OK + JwtResponse                 |
           |<-------------------------------------------------|
           |     { token, userId, firstName, email, role }    |
           |                                                  |
           |-- Save token & user to localStorage              |
           |                                                  |
           |  3. Subsequent Requests: GET /books              |
           |     Header -> Authorization: Bearer <token>      |
           |------------------------------------------------->|
           |                                                  |-- JwtAuthenticationFilter validates token
           |                                                  |-- Sets SecurityContextHolder Authentication
           |  4. Returns 200 OK + Requested JSON Payload      |
           |<-------------------------------------------------|
```

- **Stateless Session**: Session creation policy is set to `SessionCreationPolicy.STATELESS`.
- **CORS Setup**: Configured in `WebConfig.java` to permit requests from frontend origins (`http://localhost:*`, `http://127.0.0.1:*`).
- **Automatic Session Cleanup**: Frontend Axios response interceptor redirects to `/login` upon receiving `401 Unauthorized`.

---

## 10. Functional Modules

### 1. Auth Module
- **Endpoints**: `POST /auth/register`, `POST /auth/login`
- **Key Logic**: Encrypts raw passwords using BCrypt, registers user, auto-generates JWT token, and returns user metadata.

### 2. Book Management Module
- **Endpoints**: `POST /books`, `GET /books`, `GET /books/{id}`, `PUT /books/{id}`, `DELETE /books/{id}`
- **Key Logic**: Performs CRUD operations on `Book` entity in MySQL database.

### 3. User & Member Module
- **Endpoints**: `GET /users`, `GET /users/{id}`, `POST /users`, `PUT /users/{id}`, `DELETE /users/{id}`
- **Key Logic**: Manages library members, supports profile creation and role assignment.

### 4. Borrowing & Returning Module
- **Endpoints**: `POST /borrow`, `GET /borrow`, `GET /borrow/active`, `PUT /borrow/{id}/return`
- **Key Logic**: 
  - `POST /borrow`: Verifies book stock availability (`quantity > 0`), decrements stock by 1, creates an `ACTIVE` loan record with a due date.
  - `PUT /borrow/{id}/return`: Updates transaction status to `RETURNED`, records `returnDate`, and increments book stock by 1 in MySQL.

---

## 11. Database Design

BookSphere uses MySQL as its relational database. The schema consists of three core tables and a String-based Role Enum mapping.

### Table: `users`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | `PRIMARY KEY, AUTO_INCREMENT` | Unique User ID |
| `first_name` | `VARCHAR(255)` | `NOT NULL` | First Name |
| `last_name` | `VARCHAR(255)` | `NOT NULL` | Last Name |
| `email` | `VARCHAR(255)` | `NOT NULL, UNIQUE` | User Email (Login Username) |
| `password` | `VARCHAR(255)` | `NOT NULL` | BCrypt Hashed Password |
| `phone` | `VARCHAR(255)` | `NULLABLE` | Contact Phone Number |
| `role` | `VARCHAR(255)` | `NOT NULL` | Enum: `STUDENT`, `LIBRARIAN`, `ADMIN`, `USER` |

### Table: `books`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | `PRIMARY KEY, AUTO_INCREMENT` | Unique Book ID |
| `title` | `VARCHAR(255)` | `NOT NULL` | Book Title |
| `author` | `VARCHAR(255)` | `NOT NULL` | Book Author |
| `publisher` | `VARCHAR(255)` | `NOT NULL` | Publisher Name |
| `isbn` | `VARCHAR(255)` | `NOT NULL, UNIQUE` | International Standard Book Number |
| `category` | `VARCHAR(255)` | `NULLABLE` | Book Category (e.g. Programming) |
| `price` | `DOUBLE` | `NOT NULL, CHECK (price > 0)` | Price / Replacement Value (₹) |
| `quantity` | `INT` | `NOT NULL, CHECK (quantity >= 0)` | Available Physical Copy Count |
| `published_year` | `INT` | `NULLABLE` | Year of Publication |
| `image_url` | `VARCHAR(255)` | `NULLABLE` | Cover Image URL |

### Table: `borrow_transactions`
| Field | Type | Constraints | Description |
|---|---|---|---|
| `id` | `BIGINT` | `PRIMARY KEY, AUTO_INCREMENT` | Unique Transaction ID |
| `user_id` | `BIGINT` | `NOT NULL, FOREIGN KEY -> users(id)` | Borrower User Reference |
| `book_id` | `BIGINT` | `NOT NULL, FOREIGN KEY -> books(id)` | Borrowed Book Reference |
| `borrow_date` | `DATE` | `NOT NULL` | Transaction Issue Date |
| `due_date` | `DATE` | `NOT NULL` | Calculated Return Due Date |
| `return_date` | `DATE` | `NULLABLE` | Actual Return Date |
| `status` | `VARCHAR(255)` | `NOT NULL` | Status: `ACTIVE`, `RETURNED`, `OVERDUE` |
| `fine` | `DOUBLE` | `NULLABLE` | Fine Amount (₹) |

---

## 12. Entity Relationships

```
+-------------------+              +-------------------------+              +-------------------+
|       User        |              |    BorrowTransaction    |              |       Book        |
+-------------------+              +-------------------------+              +-------------------+
| id (PK)           | 1          * | id (PK)                 | *          1 | id (PK)           |
| firstName         |<-------------| user_id (FK)            |------------->| title             |
| lastName          |              | book_id (FK)            |              | author            |
| email             |              | borrowDate              |              | publisher         |
| password          |              | dueDate                 |              | isbn              |
| phone             |              | returnDate              |              | price             |
| role              |              | status                  |              | quantity          |
+-------------------+              | fine                    |              +-------------------+
                                   +-------------------------+
```

- **User to BorrowTransaction**: One-to-Many (`User` can have multiple `BorrowTransaction` records).
- **Book to BorrowTransaction**: One-to-Many (`Book` can be associated with multiple `BorrowTransaction` records).

---

## 13. Backend Architecture

The backend follows the Spring Boot Layered Architecture pattern:

```
[ HTTP Requests ]
       │
       ▼
[ Controller Layer ] (@RestController)
  - Maps HTTP requests to DTOs
  - Invokes Service methods
  - Returns ResponseEntity<T>
       │
       ▼
[ Service Layer ] (@Service Interface & Implementation)
  - Enforces Business Rules
  - Performs stock quantity updates
  - Manages Transactions (@Transactional)
       │
       ▼
[ Repository Layer ] (Spring Data JPA interfaces)
  - Interacts with Database via SQL/JPQL
       │
       ▼
[ MySQL Database ]
```

---

## 14. Frontend Architecture

The frontend is structured into modular components, routes, layouts, and services:

- **Routing (`AppRoutes.tsx`)**: Configured with `react-router-dom` using nested layouts (`AuthLayout` for public routes, `AdminLayout` for application views).
- **Route Guard (`ProtectedRoute.tsx`)**: Inspects authentication state and role permissions before rendering protected views.
- **Service Layer (`services/`)**: Centralized HTTP client (`api.ts`) with service files for `auth`, `book`, `user`, and `borrow` API communication.
- **State Management (`authStore.ts`)**: Zustand store synced with browser `localStorage` for immediate user session availability across component mounts.

---

## 15. REST API Documentation

### 1. Authentication Endpoints

| HTTP Method | Endpoint | Purpose | Auth Required | Expected Status | Response Body |
|---|---|---|---|---|---|
| `POST` | `/auth/register` | Register new user (Auto-logins) | No | `201 CREATED` | `JwtResponse` (token, userId, name, role) |
| `POST` | `/auth/login` | Authenticate user credentials | No | `200 OK` | `JwtResponse` (token, userId, name, role) |

### 2. Book Management Endpoints

| HTTP Method | Endpoint | Purpose | Auth Required | Expected Status | Response Body |
|---|---|---|---|---|---|
| `GET` | `/books` | Get all books | Yes (JWT) | `200 OK` | `List<Book>` |
| `GET` | `/books/{id}` | Get book details by ID | Yes (JWT) | `200 OK` | `Book` object |
| `POST` | `/books` | Add new book | Yes (JWT) | `201 CREATED` | Created `Book` object |
| `PUT` | `/books/{id}` | Update existing book | Yes (JWT) | `200 OK` | Updated `Book` object |
| `DELETE` | `/books/{id}` | Delete book by ID | Yes (JWT) | `204 NO CONTENT` | Empty |

### 3. User / Member Endpoints

| HTTP Method | Endpoint | Purpose | Auth Required | Expected Status | Response Body |
|---|---|---|---|---|---|
| `GET` | `/users` | Get all registered members | Yes (JWT) | `200 OK` | `List<UserResponse>` |
| `GET` | `/users/{id}` | Get member by ID | Yes (JWT) | `200 OK` | `UserResponse` |
| `POST` | `/users` | Create new member | Yes (JWT) | `201 CREATED` | `UserResponse` |
| `PUT` | `/users/{id}` | Update member profile | Yes (JWT) | `200 OK` | Updated `UserResponse` |
| `DELETE` | `/users/{id}` | Delete member | Yes (JWT) | `204 NO CONTENT` | Empty |

### 4. Borrow / Transaction Endpoints

| HTTP Method | Endpoint | Purpose | Auth Required | Expected Status | Response Body |
|---|---|---|---|---|---|
| `POST` | `/borrow` | Issue book to member | Yes (JWT) | `201 CREATED` | `BorrowResponse` (decrements book stock) |
| `GET` | `/borrow` | Get all borrow transactions | Yes (JWT) | `200 OK` | `List<BorrowResponse>` |
| `GET` | `/borrow/active` | Get active borrowings | Yes (JWT) | `200 OK` | `List<BorrowResponse>` |
| `PUT` | `/borrow/{id}/return` | Return borrowed book | Yes (JWT) | `200 OK` | `BorrowResponse` (restores book stock) |

---

## 16. Validation

Validation is enforced across both backend and frontend layers:

### Backend Bean Validation Annotations
- `Book.java`: `@NotBlank` on `title`, `author`, `publisher`, `isbn`; `@Positive` on `price`; `@Min(0)` on `quantity`.
- `User.java`: `@NotBlank` on `firstName`, `lastName`, `password`; `@Email` on `email`.
- Validation errors return HTTP `400 Bad Request` with a JSON map of field names to error messages.

### Frontend Validation (Zod & React Hook Form)
- `loginSchema.ts`: Validates email format and password presence.
- `registerSchema.ts`: Enforces password minimum length (6+ characters) and matching password confirmations.

---

## 17. Exception Handling

Centralized exception handling is implemented in `GlobalExceptionHandler.java` using Spring's `@RestControllerAdvice`:

```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
        ErrorResponse error = new ErrorResponse(409, ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleBadCredentials(BadCredentialsException ex) {
        ErrorResponse error = new ErrorResponse(401, "Invalid email or password.", LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleBookNotFound(BookNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(404, ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        ErrorResponse error = new ErrorResponse(500, ex.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

---

## 18. Postman Testing Workflow

To test the backend APIs using Postman:

1. **User Registration**:
   - `POST http://localhost:8080/auth/register`
   - Payload:
     ```json
     {
       "firstName": "Admin",
       "lastName": "User",
       "email": "admin@booksphere.com",
       "password": "password123",
       "role": "ADMIN",
       "phone": "+919876543210"
     }
     ```
   - Copy the returned `token` string from the JSON response.

2. **Set Authorization Header**:
   - In Postman, add header to subsequent requests:
     - Key: `Authorization`
     - Value: `Bearer <YOUR_COPIED_JWT_TOKEN>`

3. **Create a Book**:
   - `POST http://localhost:8080/books`
   - Payload:
     ```json
     {
       "title": "Clean Code",
       "author": "Robert C. Martin",
       "publisher": "Prentice Hall",
       "isbn": "9780132350884",
       "category": "Programming",
       "price": 699.0,
       "quantity": 10,
       "publishedYear": 2008
     }
     ```

4. **Issue a Book**:
   - `POST http://localhost:8080/borrow`
   - Payload:
     ```json
     {
       "userId": 1,
       "bookId": 1,
       "dueDate": "2026-08-25"
     }
     ```
   - Observe that `quantity` for book ID 1 is now `9` in the database.

5. **Return a Book**:
   - `PUT http://localhost:8080/borrow/1/return`
   - Observe transaction status changed to `RETURNED` and `quantity` for book ID 1 is restored back to `10`.

---

## 19. Application Setup and Installation

### Prerequisites
- **Java Development Kit (JDK)**: Version 21 or Version 26
- **Node.js**: Version 18+ and `npm`
- **MySQL Database Server**: Version 8.0+
- **Git**

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/harsh-kardile49/BookSphere.git
   cd BookSphere
   ```

2. Setup Database:
   Create a MySQL database named `defaultdb` or `booksphere_db`:
   ```sql
   CREATE DATABASE defaultdb;
   ```

---

## 20. Database Configuration

Configure backend database properties in `backend/src/main/resources/application.properties`:

```properties
spring.application.name=booksphere

# MySQL Connection Settings (Update placeholders with your credentials)
spring.datasource.url=jdbc:mysql://<DB_HOST>:<DB_PORT>/<DB_NAME>?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=<DB_USERNAME>
spring.datasource.password=<DB_PASSWORD>

# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Token Configuration
jwt.secret=${JWT_SECRET:<YOUR_SECURE_JWT_SECRET_KEY>}
jwt.expiration=86400000
```

---

## 21. How to Run the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the Spring Boot application using Maven wrapper:
   - On Windows:
     ```cmd
     mvnw.cmd spring-boot:run
     ```
   - On Linux/macOS:
     ```bash
     ./mvnw spring-boot:run
     ```

3. The server will start on port `8080`: `http://localhost:8080`.

---

## 22. How to Run the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to: `http://localhost:5173`.

---

## 23. Complete User Workflows

### 1. Authentication & Registration Workflow
1. User opens `/register` and submits registration details.
2. Spring Boot registers the user in MySQL (encrypting password with BCrypt).
3. Backend auto-authenticates the user and returns a JWT token + user details.
4. Client stores JWT in `localStorage` and routes the user directly to `/dashboard`.

### 2. Book Curation & Editorial View Workflow
1. User navigates to `/books` to view the catalog grid.
2. User can search by title or author or filter by category.
3. Clicking a book card opens `/books/:id` rendering the 3D editorial showcase with publisher metadata, replacement price, stock quantity, and shelf placement.
4. Clicking **"Issue / Borrow Book"** transitions directly into the borrowing workflow.

### 3. Book Borrowing Workflow
1. User visits `/borrow`.
2. **Step 1**: Select eligible library member from dropdown.
3. **Step 2**: Select available book from catalog.
4. **Step 3**: Confirm issue date and due date (automatically defaulted to +14 days).
5. User clicks **"Confirm Issue"**. Frontend sends `POST /borrow`.
6. Backend checks `book.quantity > 0`, decrements stock count by 1 in MySQL, saves `BorrowTransaction` (`ACTIVE`), and returns success response.

### 4. Book Return Workflow
1. User visits `/return`.
2. Select active loan from dropdown or lookup by borrower/book.
3. Review loan summary card displaying original issue date and overdue status.
4. User clicks **"Confirm Return"**. Frontend sends `PUT /borrow/{id}/return`.
5. Backend sets status to `RETURNED`, sets `returnDate` to current date, increments book `quantity` by 1 in MySQL, and updates UI state.

---

## 24. Testing

### Automated & Unit Test Setup
- **Spring Boot Tests**: Controller tests and JPA repository tests using `@SpringBootTest` and `@DataJpaTest`.
- **Validation Testing**: Verifies `@NotBlank`, `@Email`, `@Positive`, and `@Min` constraint enforcement on invalid payloads.

### Manual End-to-End Verification
- Tested registration and login flows against Spring Security filter chain.
- Verified database transactional isolation during concurrent book borrow/return requests.
- Validated error toast presentation upon receiving `409 CONFLICT` (duplicate email) and `401 UNAUTHORIZED` (bad credentials).

---

## 25. Assignment Requirements vs Implementation

The table below outlines a comparison between the original specification (`ACTIONPLAN.md`) and the actual implementation in BookSphere:

| Feature / Requirement | Assignment Requirement (`ACTIONPLAN.md`) | Actual Implementation in Codebase | Implementation Status |
|---|---|---|---|
| **Database Engine** | PostgreSQL | MySQL 8.x (Aiven Cloud / Localhost) | 🟢 Fully Implemented (Adapted) |
| **Authentication** | JWT Authentication | Single-token Stateless JWT with BCrypt password encoding | 🟢 Fully Implemented |
| **Role Management** | Database `roles` table | Java Enum (`STUDENT`, `LIBRARIAN`, `ADMIN`, `USER`) | 🟢 Fully Implemented (Simplified) |
| **User Auto-Login** | Not explicitly required | Auto-authenticates and returns JWT upon signup | 🌟 Bonus Feature |
| **Book CRUD APIs** | `POST`, `GET`, `PUT`, `DELETE /books` | Standard RESTful CRUD endpoints in `BookController.java` | 🟢 Fully Implemented |
| **User/Member APIs** | `POST`, `GET`, `PUT`, `DELETE /members` | Fully integrated `/users` REST endpoints (`UserController.java`) | 🟢 Fully Implemented |
| **Borrow Operations** | `POST /transactions/issue` | `POST /borrow` with automated stock decrementing | 🟢 Fully Implemented |
| **Return Operations** | `POST /transactions/return` | `PUT /borrow/{id}/return` with stock incrementing (+1) | 🟢 Fully Implemented |
| **Dashboard KPIs** | Dynamic counts | Live database metrics for Total Books, Stock, Loans, Members | 🟢 Fully Implemented |
| **3D Editorial Showcase**| Standard UI | Interactive 3D cover cards, initials cover generator, shelf metrics | 🌟 Bonus Feature |
| **Backend Search/Page**| `GET /books/search`, `/books/page` | High-performance client-side search & filtering in React | 🟡 Shifted to Client-side |
| **Refresh Tokens** | Refresh token rotation | Single-token architecture for simplicity & reliability | 🟡 Intentionally Omitted |
| **Reservations System**| `Reservations` entity & APIs | Deferred for future enhancement | 🔴 Not Implemented |
| **Email Notifications**| Due-date email notifications | Deferred for future enhancement | 🔴 Not Implemented |

---

## 26. Known Limitations

- **Granular Method-Level Authorization**: Spring Security enforces authentication across all API endpoints, but individual controller methods rely on route-based UI role checks rather than backend `@PreAuthorize("hasRole('ADMIN')")` annotations.
- **Client-Side Filtering**: Catalog filtering and search are currently executed in the browser; large catalogs (10,000+ items) will benefit from migrating pagination back to SQL `LIMIT`/`OFFSET` queries.
- **Payment Processing**: Fine amounts are computed and displayed on loan records, but online payment gateway integration (e.g. Razorpay, Stripe) is not built-in.

---

## 27. Future Enhancements

- **Reservation System**: Introduce a `reservations` entity allowing users to reserve books currently out of stock.
- **Email Notifications**: Implement Spring Mail starter to send automated reminder emails 2 days prior to loan due dates.
- **Barcode & QR Code Scanner**: Integrate camera-based scanning in the React UI for instant ISBN lookup during checkout.
- **Docker Compose**: Package backend, frontend, and MySQL into a single multi-container `docker-compose.yml` configuration.

---

## 28. Conclusion

BookSphere successfully translates the core requirements of a modern Library Management System into a robust full-stack solution. By pairing a high-performance Java 26 Spring Boot backend with a responsive React 19 frontend and a normalized MySQL database, BookSphere demonstrates production-grade software development practices, secure authentication, clean architecture, and real-time data synchronization.

---
