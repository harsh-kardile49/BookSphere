# BookSphere

<div align="center">

![BookSphere Dashboard](docs/images/dashboard.png)

### **Uncompromising, Enterprise-Grade Full-Stack Library Intelligence**

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.2-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-Stateless_Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

</div>

---

## Table of Contents

- [Executive Overview](#executive-overview)
- [Command Center Visuals](#command-center-visuals)
- [Core Capabilities](#core-capabilities)
- [Role Matrix & Permissions](#role-matrix--permissions)
- [Technology Stack](#technology-stack)
- [Architectural Blueprint](#architectural-blueprint)
- [Project Directory Structure](#project-directory-structure)
- [Deployment & Execution](#deployment--execution)
  - [Prerequisites](#prerequisites)
  - [1. Backend Deployment (Spring Boot & MySQL)](#1-backend-deployment-spring-boot--mysql)
  - [2. Frontend Deployment (React & Vite)](#2-frontend-deployment-react--vite)
- [API Interface Specs](#api-interface-specs)
- [License & Authorship](#license--authorship)

---

## Executive Overview

Average platforms manage records. **BookSphere dominates operations.** Built with **Spring Boot 3** and **React 19**, BookSphere is an enterprise-grade digital library ecosystem designed for organizations that accept nothing less than absolute precision. 

When you manage thousands of assets across members and staff, excuses are not an option. BookSphere eliminates friction by automating inventory tracking, role-gated circulation, real-time analytics, and automated fine enforcement.

### Strategic Advantages:
- **Zero-Trust Security Standard**: Stateless JWT authentication backed by role-gated authorization (`STUDENT`, `USER`, `LIBRARIAN`, `ADMIN`).
- **High-Velocity Cataloging**: Sub-millisecond client-side search, multi-tier price sorting, 7-category collapsible breakdown, and complete librarian CRUD control.
- **Flawless Stock Synchronization**: Real-time inventory deduction on issue and instant +1 copy restoration upon return.
- **Context-Adaptive Interface**: Precision dashboards tailored specifically to the user's role—delivering only the tools required to close the task.

---

## Command Center Visuals

### 1. User Onboarding
> Client-side validated registration interface with role assignment (`STUDENT` or `LIBRARIAN`).

![Register Page](docs/images/register.png)

---

### 2. Authentication Gateway
> High-security login portal issuing 24-hour cryptographic JWT tokens.

![Login Page](docs/images/login.png)

---

### 3. Operational Dashboard
> Executive command portal monitoring real-time KPIs: Active Inventory, Total Loans, Overdue Penalties, and Registered Members.

![Dashboard Page](docs/images/dashboard.png)

---

### 4. Book Catalog Command
> Dynamic catalog engine supporting live multi-parameter filtering, price sorting, modal CRUD operations, and instant CSV export.

![Book Page](docs/images/books.png)

---

### 5. Issue Circulation Workflow
> Streamlined loan issuance interface featuring auto-locked student borrower profiles and automatic 14-day due date calculation.

![Borrow Page](docs/images/borrow.png)

---

### 6. Return Processing Workflow
> Automated return processing engine with live loan matching, fine computation, and zero-loans empty state notice.

![Return Book Page](docs/images/return.png)

---

### 7. Member Directory Management
> Institutional membership directory separating student patrons from administrative library staff.

![Members Page](docs/images/members.png)

---

### 8. Policy & System Settings
> Role-gated control panel managing circulation rules, user credentials, and security parameters.

![Settings Page](docs/images/settings.png)

---

## Core Capabilities

### Authentication & Security
- **Strict Role Boundaries**: Enforces exact operational permissions for `STUDENT`, `USER`, `LIBRARIAN`, and `ADMIN`.
- **Stateless Bearer Interception**: Automated request interception and JWT injection via Axios interceptors.
- **Cryptographic Encryption**: Password hashing using Spring Security `BCryptPasswordEncoder`.

### Asset & Catalog Mastery
- **Full Operational CRUD**: Librarians create (`POST`), update (`PUT`), and remove (`DELETE`) catalog titles seamlessly.
- **Dynamic Sorting & Pagination**: Sort inventory by Price (Low to High / High to Low), Title, or Year across paginated grids.
- **Inventory Stock Protection**: Automatic stock decrement on checkout, preventing over-borrowing beyond physical copies.

### Circulation & Audit Logs
- **Transaction Continuity**: Connects loan issuance records directly to return audit histories.
- **CSV Data Exporter**: One-click catalog and audit report export for institutional reporting.

---

## Role Matrix & Permissions

| Platform Feature | Patrons (Student / Member) | Executive Staff (Librarian / Admin) |
|---|:---:|:---:|
| Search & Filter Catalog | Granted | Granted |
| Sort Inventory by Price & Year | Granted | Granted |
| Self-Service Book Checkout | Granted | Granted |
| Issue Loans for Any Patron | Restricted | Granted |
| Return Borrowed Assets | Granted | Granted |
| Add, Edit, or Delete Catalog Titles | Restricted | Granted |
| Access Institutional Member Directory | Restricted | Granted |
| Configure System Policies | Restricted | Granted |

---

## Technology Stack

### Backend Engine
- **Framework**: Spring Boot 3.4.2
- **Runtime**: Java 21 / Java 26
- **Database Engine**: MySQL 8.0+
- **Persistence**: Spring Data JPA & Hibernate 6
- **Security Standard**: Spring Security 6 & JSON Web Tokens (`jjwt` 0.12.6)
- **Build System**: Apache Maven

### Frontend Engine
- **Core Framework**: React 19 (Vite 8 SPA)
- **Type Safety**: TypeScript 5.0+
- **Styling Architecture**: Vanilla CSS3, Bootstrap 5.3 Grid, Lucide Icons
- **State Management**: Zustand 5
- **Network Layer**: Axios (Interceptors for Bearer Injection & Auto 401 Redirect)
- **Feedback & Validation**: Sonner Toast & Zod Schema Validation

---

## Architectural Blueprint

```
+-------------------------------------------------------------+
|                      React 19 SPA (Vite)                    |
| [ Dashboard ] [ Books ] [ Borrow ] [ Return ] [ Members ]   |
+------------------------------+------------------------------+
                               |
                        HTTP / REST APIs
                      (Authorization: Bearer <JWT>)
                               |
+------------------------------v------------------------------+
|                    Spring Boot 3.4 Backend                  |
|                                                             |
|  [ Security Filter / JwtAuthenticationFilter ]             |
|                                                             |
|  [ Controllers ] AuthController, BookController, etc.       |
|  [ Services ]    AuthService, BookService, BorrowService    |
|  [ Repositories] UserRepository, BookRepository, etc.       |
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

## Project Directory Structure

```
BookSphere/
├── docs/
│   └── images/
│       ├── register.png
│       ├── login.png
│       ├── dashboard.png
│       ├── books.png
│       ├── borrow.png
│       ├── return.png
│       ├── members.png
│       └── settings.png
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ibm/
│   │   │   │   ├── config/ (SecurityConfig, WebConfig)
│   │   │   │   ├── controller/ (AuthController, BookController, BorrowController)
│   │   │   │   ├── dto/ (LoginRequest, JwtResponse, BorrowRequest)
│   │   │   │   ├── entity/ (User, Book, BorrowTransaction)
│   │   │   │   ├── repository/ (UserRepository, BookRepository, BorrowRepository)
│   │   │   │   └── service/ (AuthService, BookService, BorrowService)
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/ (Sidebar, Header, Logo, BookCard, Modals)
    │   ├── pages/ (Auth, Books, Borrow, Dashboard, Members, Return, Settings)
    │   ├── services/ (api.ts, auth.service.ts, book.service.ts, borrow.service.ts)
    │   ├── store/ (authStore.ts)
    │   └── types/ (auth.ts, book.ts)
    ├── package.json
    └── vite.config.ts
```

---

## Deployment & Execution

### Prerequisites
- **Java Development Kit**: JDK 21 or higher
- **Node Environment**: Node 18+ and `npm`
- **Database Engine**: MySQL Server 8.0+ on `localhost:3306`

---

### 1. Backend Deployment (Spring Boot & MySQL)

1. **Initialize Database**:
   ```sql
   CREATE DATABASE booksphere_db;
   ```

2. **Configure Database Credentials**:
   Update `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/booksphere_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=root
   ```

3. **Execute Backend**:
   ```bash
   cd backend
   mvnw clean spring-boot:run
   ```
   Backend Service operational at `http://localhost:8080`.

---

### 2. Frontend Deployment (React & Vite)

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Frontend Client operational at `http://localhost:5173`.

---

## API Interface Specs

| Endpoint | Method | Access Level | Operational Description |
|---|---|---|---|
| `/auth/register` | `POST` | Public | Register new user account |
| `/auth/login` | `POST` | Public | Authenticate user & issue JWT bearer token |
| `/books` | `GET` | Authenticated | Fetch catalog books |
| `/books/{id}` | `GET` | Authenticated | Retrieve specific book details |
| `/books` | `POST` | Admin / Librarian | Create catalog title |
| `/books/{id}` | `PUT` | Admin / Librarian | Update existing title |
| `/books/{id}` | `DELETE` | Admin / Librarian | Delete title from catalog |
| `/users` | `GET` | Authenticated | Fetch member accounts |
| `/borrow` | `POST` | Authenticated | Issue book loan |
| `/borrow/active` | `GET` | Authenticated | Retrieve active circulation records |
| `/borrow/{id}/return` | `PUT` | Authenticated | Process return & restore inventory |

---

## License & Authorship

Distributed under the MIT License. See `LICENSE` for details.

<div align="center">
  <sub>Crafted by Harsh Kardile, Saumajit Malakar & Vedant Wasdikar. Excellence isn’t optional.</sub>
</div>
