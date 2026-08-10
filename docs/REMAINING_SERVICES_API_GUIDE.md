# 📋 BookSphere — Remaining Frontend Services & API Integration Guide

**Project:** BookSphere Library Management System  
**Backend:** Spring Boot 4.1.0 / Java 26  
**Frontend:** Vite + React + TypeScript  
**Status:** Services & APIs that still need frontend implementation

---

> [!NOTE]
> This document lists all services and APIs that are **NOT YET implemented** in the frontend.
> The following are **already implemented** and excluded from this list:
> - ✅ `book.service.ts` — All 9 Book CRUD endpoints (Add, GetAll, GetById, Update, Delete, Search by Title/Author, Filter by Category, Pagination)
> - ✅ `auth.service.ts` — Login, Register, Logout, Refresh Token (with mock fallback)
> - ✅ `api.ts` — Axios instance with JWT interceptors

---

## 📌 Table of Contents

1. [User Management Service](#1-user-management-service)
2. [Member / Borrow Transaction Service](#2-member--borrow-transaction-service)
3. [Return Transaction Service](#3-return-transaction-service)
4. [Dashboard Analytics Service](#4-dashboard-analytics-service)
5. [Fine Management Service](#5-fine-management-service)
6. [Reservation Service](#6-reservation-service)
7. [Notification Service](#7-notification-service)
8. [TypeScript Interfaces Required](#8-typescript-interfaces-required)
9. [Service File Checklist](#9-service-file-checklist)

---

## 1. User Management Service

**File to create:** `frontend/src/services/user.service.ts`  
**Backend Controller:** `UserController.java` (currently empty — needs backend implementation)  
**Backend Entity:** `User.java` (id, firstName, lastName, email, password, phone, role)

### APIs to Implement

| # | Method | Endpoint | Description | Auth Required |
|---|--------|----------|-------------|---------------|
| 1 | `GET` | `/users` | Get all registered users/members | ✅ ADMIN, LIBRARIAN |
| 2 | `GET` | `/users/{id}` | Get user by ID | ✅ ADMIN, LIBRARIAN |
| 3 | `PUT` | `/users/{id}` | Update user profile | ✅ ADMIN or self |
| 4 | `DELETE` | `/users/{id}` | Delete/deactivate user | ✅ ADMIN only |
| 5 | `GET` | `/users/search?query={query}` | Search users by name or email | ✅ ADMIN, LIBRARIAN |
| 6 | `GET` | `/users/role/{roleName}` | Filter users by role | ✅ ADMIN |
| 7 | `PUT` | `/users/{id}/role` | Change user role | ✅ ADMIN only |
| 8 | `GET` | `/users/me` | Get current logged-in user profile | ✅ Any authenticated |

### Request/Response Models

**User Object (Response):**
```json
{
  "id": 1,
  "firstName": "Harsh",
  "lastName": "Kardile",
  "email": "harsh@booksphere.com",
  "phone": "9876543210",
  "role": {
    "id": 1,
    "roleName": "Student"
  }
}
```

**Update User Request:**
```json
{
  "firstName": "Harsh",
  "lastName": "Kardile",
  "phone": "9876543210"
}
```

### Frontend Pages Using This Service
- `/members` — Members management page (currently uses hardcoded data)

---

## 2. Member / Borrow Transaction Service

**File to create:** `frontend/src/services/borrow.service.ts`  
**Backend Controller:** Needs to be created (`BorrowController.java`)  
**Backend Entity:** Needs to be created (`BorrowTransaction.java`)

### APIs to Implement

| # | Method | Endpoint | Description | Auth Required |
|---|--------|----------|-------------|---------------|
| 1 | `POST` | `/borrow` | Issue/borrow a book to a member | ✅ ADMIN, LIBRARIAN |
| 2 | `GET` | `/borrow` | Get all borrow transactions | ✅ ADMIN, LIBRARIAN |
| 3 | `GET` | `/borrow/{id}` | Get borrow transaction by ID | ✅ Authenticated |
| 4 | `GET` | `/borrow/user/{userId}` | Get all borrows for a specific user | ✅ ADMIN, LIBRARIAN or self |
| 5 | `GET` | `/borrow/book/{bookId}` | Get borrow history for a specific book | ✅ ADMIN, LIBRARIAN |
| 6 | `GET` | `/borrow/active` | Get all currently active/unreturned borrows | ✅ ADMIN, LIBRARIAN |
| 7 | `GET` | `/borrow/overdue` | Get all overdue borrow transactions | ✅ ADMIN, LIBRARIAN |
| 8 | `PUT` | `/borrow/{id}/renew` | Renew/extend a borrow period | ✅ ADMIN, LIBRARIAN or self |

### Request/Response Models

**Borrow Request:**
```json
{
  "userId": 1,
  "bookId": 3,
  "dueDate": "2026-08-23"
}
```

**Borrow Transaction Response:**
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "firstName": "Harsh",
    "lastName": "Kardile",
    "email": "harsh@booksphere.com"
  },
  "book": {
    "id": 3,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884"
  },
  "borrowDate": "2026-08-09",
  "dueDate": "2026-08-23",
  "returnDate": null,
  "status": "ACTIVE",
  "fine": 0.0
}
```

### Frontend Pages Using This Service
- `/borrow` — Borrow management page (currently uses hardcoded data)

---

## 3. Return Transaction Service

**File to create:** `frontend/src/services/return.service.ts`  
**Backend Controller:** Needs to be created (`ReturnController.java` or extend `BorrowController.java`)

### APIs to Implement

| # | Method | Endpoint | Description | Auth Required |
|---|--------|----------|-------------|---------------|
| 1 | `PUT` | `/borrow/{id}/return` | Process a book return | ✅ ADMIN, LIBRARIAN |
| 2 | `GET` | `/returns` | Get all completed return transactions | ✅ ADMIN, LIBRARIAN |
| 3 | `GET` | `/returns/recent` | Get recent returns (last 7 days) | ✅ ADMIN, LIBRARIAN |
| 4 | `GET` | `/returns/user/{userId}` | Get return history for a user | ✅ ADMIN, LIBRARIAN or self |

### Request/Response Models

**Return Request:**
```json
{
  "condition": "GOOD",
  "remarks": "No damage"
}
```

**Return Response:**
```json
{
  "id": 1,
  "borrowTransactionId": 5,
  "returnDate": "2026-08-15",
  "condition": "GOOD",
  "fine": 0.0,
  "remarks": "No damage",
  "daysOverdue": 0
}
```

### Frontend Pages Using This Service
- `/return` — Return management page (currently uses hardcoded data)

---

## 4. Dashboard Analytics Service

**File to create:** `frontend/src/services/dashboard.service.ts`  
**Backend Controller:** Needs to be created (`DashboardController.java`)

### APIs to Implement

| # | Method | Endpoint | Description | Auth Required |
|---|--------|----------|-------------|---------------|
| 1 | `GET` | `/dashboard/stats` | Get library KPI statistics | ✅ Authenticated |
| 2 | `GET` | `/dashboard/recent-borrows` | Get last 10 borrow transactions | ✅ ADMIN, LIBRARIAN |
| 3 | `GET` | `/dashboard/popular-books` | Get top 10 most borrowed books | ✅ Authenticated |
| 4 | `GET` | `/dashboard/overdue-count` | Get count of overdue books | ✅ ADMIN, LIBRARIAN |
| 5 | `GET` | `/dashboard/category-distribution` | Get book count per category | ✅ Authenticated |
| 6 | `GET` | `/dashboard/monthly-borrows` | Get borrow trends (last 12 months) | ✅ ADMIN, LIBRARIAN |

### Response Models

**Dashboard Stats Response:**
```json
{
  "totalBooks": 150,
  "totalMembers": 85,
  "activeLoans": 42,
  "overdueBooks": 7,
  "availableBooks": 108,
  "totalCategories": 12,
  "totalFinesCollected": 3500.0,
  "booksAddedThisMonth": 15
}
```

**Category Distribution Response:**
```json
[
  { "category": "Programming", "count": 35 },
  { "category": "Fiction", "count": 28 },
  { "category": "Science", "count": 22 }
]
```

### Frontend Pages Using This Service
- `/dashboard` — Dashboard page (currently uses hardcoded KPI data)

---

## 5. Fine Management Service

**File to create:** `frontend/src/services/fine.service.ts`  
**Backend Controller:** Needs to be created (`FineController.java`)  
**Backend Entity:** Needs to be created (`Fine.java`)

### APIs to Implement

| # | Method | Endpoint | Description | Auth Required |
|---|--------|----------|-------------|---------------|
| 1 | `GET` | `/fines` | Get all fines | ✅ ADMIN, LIBRARIAN |
| 2 | `GET` | `/fines/user/{userId}` | Get fines for a specific user | ✅ ADMIN, LIBRARIAN or self |
| 3 | `GET` | `/fines/pending` | Get all unpaid fines | ✅ ADMIN, LIBRARIAN |
| 4 | `PUT` | `/fines/{id}/pay` | Mark a fine as paid | ✅ ADMIN, LIBRARIAN |
| 5 | `GET` | `/fines/total` | Get total fine amount collected | ✅ ADMIN |

### Response Models

**Fine Object:**
```json
{
  "id": 1,
  "userId": 3,
  "userName": "Alex Morgan",
  "borrowTransactionId": 5,
  "bookTitle": "Clean Code",
  "amount": 50.0,
  "daysOverdue": 5,
  "status": "PENDING",
  "createdAt": "2026-08-09T10:30:00"
}
```

---

## 6. Reservation Service

**File to create:** `frontend/src/services/reservation.service.ts`  
**Backend Controller:** Needs to be created (`ReservationController.java`)  
**Backend Entity:** Needs to be created (`Reservation.java`)

### APIs to Implement

| # | Method | Endpoint | Description | Auth Required |
|---|--------|----------|-------------|---------------|
| 1 | `POST` | `/reservations` | Reserve a book | ✅ Authenticated |
| 2 | `GET` | `/reservations` | Get all reservations | ✅ ADMIN, LIBRARIAN |
| 3 | `GET` | `/reservations/user/{userId}` | Get reservations for a user | ✅ ADMIN, LIBRARIAN or self |
| 4 | `GET` | `/reservations/book/{bookId}` | Get reservation queue for a book | ✅ ADMIN, LIBRARIAN |
| 5 | `PUT` | `/reservations/{id}/cancel` | Cancel a reservation | ✅ ADMIN, LIBRARIAN or self |
| 6 | `PUT` | `/reservations/{id}/fulfill` | Fulfill/convert reservation to borrow | ✅ ADMIN, LIBRARIAN |

### Response Models

**Reservation Object:**
```json
{
  "id": 1,
  "userId": 3,
  "userName": "Alex Morgan",
  "bookId": 5,
  "bookTitle": "Clean Code",
  "reservedAt": "2026-08-09T10:30:00",
  "expiresAt": "2026-08-12T10:30:00",
  "status": "ACTIVE",
  "queuePosition": 1
}
```

---

## 7. Notification Service

**File to create:** `frontend/src/services/notification.service.ts`  
**Backend Controller:** Needs to be created (`NotificationController.java`)

### APIs to Implement

| # | Method | Endpoint | Description | Auth Required |
|---|--------|----------|-------------|---------------|
| 1 | `GET` | `/notifications` | Get all notifications for current user | ✅ Authenticated |
| 2 | `GET` | `/notifications/unread` | Get unread notification count | ✅ Authenticated |
| 3 | `PUT` | `/notifications/{id}/read` | Mark a notification as read | ✅ Authenticated |
| 4 | `PUT` | `/notifications/read-all` | Mark all notifications as read | ✅ Authenticated |

### Response Models

**Notification Object:**
```json
{
  "id": 1,
  "userId": 3,
  "title": "Book Due Reminder",
  "message": "\"Clean Code\" is due for return in 2 days.",
  "type": "DUE_REMINDER",
  "isRead": false,
  "createdAt": "2026-08-09T10:30:00"
}
```

---

## 8. TypeScript Interfaces Required

**File to create:** `frontend/src/types/` (new type files)

### `user.ts`
```typescript
export interface BackendUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: {
    id: number;
    roleName: string;
  };
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
}
```

### `borrow.ts`
```typescript
export interface BorrowRequest {
  userId: number;
  bookId: number;
  dueDate: string; // ISO date
}

export interface BorrowTransaction {
  id: number;
  user: { id: number; firstName: string; lastName: string; email: string };
  book: { id: number; title: string; author: string; isbn: string };
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "ACTIVE" | "RETURNED" | "OVERDUE" | "RENEWED";
  fine: number;
}
```

### `dashboard.ts`
```typescript
export interface DashboardStats {
  totalBooks: number;
  totalMembers: number;
  activeLoans: number;
  overdueBooks: number;
  availableBooks: number;
  totalCategories: number;
  totalFinesCollected: number;
  booksAddedThisMonth: number;
}

export interface CategoryDistribution {
  category: string;
  count: number;
}
```

### `fine.ts`
```typescript
export interface Fine {
  id: number;
  userId: number;
  userName: string;
  borrowTransactionId: number;
  bookTitle: string;
  amount: number;
  daysOverdue: number;
  status: "PENDING" | "PAID" | "WAIVED";
  createdAt: string;
}
```

### `reservation.ts`
```typescript
export interface Reservation {
  id: number;
  userId: number;
  userName: string;
  bookId: number;
  bookTitle: string;
  reservedAt: string;
  expiresAt: string;
  status: "ACTIVE" | "FULFILLED" | "CANCELLED" | "EXPIRED";
  queuePosition: number;
}
```

### `notification.ts`
```typescript
export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: "DUE_REMINDER" | "OVERDUE_ALERT" | "RESERVATION_READY" | "FINE_ADDED" | "GENERAL";
  isRead: boolean;
  createdAt: string;
}
```

---

## 9. Service File Checklist

| # | Service File | Backend Controller | Backend Status | Frontend Status |
|---|---|---|---|---|
| 1 | `book.service.ts` | `BookController.java` | ✅ Implemented | ✅ Implemented |
| 2 | `auth.service.ts` | `AuthController.java` | ✅ Implemented | ✅ Implemented (with mock fallback) |
| 3 | `user.service.ts` | `UserController.java` | ⚠️ Empty shell | ❌ Not created |
| 4 | `borrow.service.ts` | `BorrowController.java` | ❌ Not created | ❌ Not created |
| 5 | `return.service.ts` | Part of Borrow flow | ❌ Not created | ❌ Not created |
| 6 | `dashboard.service.ts` | `DashboardController.java` | ❌ Not created | ❌ Not created |
| 7 | `fine.service.ts` | `FineController.java` | ❌ Not created | ❌ Not created |
| 8 | `reservation.service.ts` | `ReservationController.java` | ❌ Not created | ❌ Not created |
| 9 | `notification.service.ts` | `NotificationController.java` | ❌ Not created | ❌ Not created |

---

## Priority Order for Implementation

> [!IMPORTANT]
> Recommended implementation order based on core library management functionality:

1. **🔴 High Priority** — User Management Service (connects `/members` page to real data)
2. **🔴 High Priority** — Borrow Transaction Service (core library function — issue books)
3. **🔴 High Priority** — Return Transaction Service (core library function — return books)
4. **🟡 Medium Priority** — Dashboard Analytics Service (replace hardcoded KPIs)
5. **🟡 Medium Priority** — Fine Management Service (automated overdue penalty tracking)
6. **🟢 Low Priority** — Reservation Service (hold/queue books for members)
7. **🟢 Low Priority** — Notification Service (due reminders, alerts)

---

> [!TIP]
> Each service requires **both backend and frontend** work:
> 1. Create the JPA Entity + Repository in Spring Boot
> 2. Create the Service Interface + Implementation
> 3. Create the REST Controller with proper `@RequestMapping`
> 4. Add endpoint permissions in `SecurityConfig.java`
> 5. Create the frontend TypeScript service + types
> 6. Connect the React page components to the service
