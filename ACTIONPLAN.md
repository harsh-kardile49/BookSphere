## Library Management System (LMS)

### Goal: Build a Production-Quality Full Stack Library Management System in 5 Days

---

# 📌 Project Objective

Develop a modern Library Management System that demonstrates industry-level software engineering practices rather than just CRUD operations.

The project should showcase:

- Clean Architecture
- Secure Authentication
- REST APIs
- Database Design
- Modern React UI
- Git Workflow
- Team Collaboration
- Documentation
- Testing
- Deployment

The project should be something that can confidently be shown in interviews and included in a portfolio.

---

# 🎯 Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Axios
- TailwindCSS
- React Hook Form
- Zod
- React Query (TanStack Query)
- React Hot Toast
- Lucide Icons

---

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Validation
- Lombok
- MapStruct
- Maven

---

## Database

- PostgreSQL

---

## Dev Tools

- Git
- GitHub
- Postman
- IntelliJ IDEA
- VS Code
- Docker (Optional)
- pgAdmin

---

# Project Folder Structure

```
Library-Management-System/

frontend/
backend/

docs/
api/
database/
screenshots/

README.md
ActionPlan.md
```

---

# Git Workflow

Never push directly to main.

Workflow:

```
main
   │
   └── dev
        │
        ├── harsh/*
        ├── vedant/*
        └── saumajit/*
```

Workflow:

```
Create Branch

↓

Code

↓

Commit

↓

Push

↓

Pull latest dev

↓

Raise Pull Request

↓

Code Review

↓

Merge into dev
```

---

# Commit Convention

```
feat:
fix:
docs:
style:
refactor:
test:
build:
chore:
```

Examples

```
feat(auth): implement JWT login

feat(book): add issue book API

fix(user): resolve login bug

docs: update README

refactor(book): simplify service layer
```

---

# Database Design

## Users

- id
- name
- email
- password
- role
- createdAt

---

## Books

- id
- title
- author
- isbn
- category
- publisher
- quantity
- availableQuantity
- imageUrl

---

## Members

- id
- studentId
- department
- year
- phone

---

## Transactions

- id
- bookId
- memberId
- issueDate
- dueDate
- returnDate
- fine

---

## Reservations

- id
- memberId
- bookId
- status

---

# Relationships

```
User
  |
  | One
  |
Many
Transactions

Book
 |
Many
Transactions

Member
 |
Many
Transactions

Book
 |
Many
Reservations
```

---

# Backend Architecture

```
Controller

↓

Service

↓

Repository

↓

Database
```

DTO Layer

```
Request DTO

↓

Entity

↓

Response DTO
```

Never expose Entity directly.

---

# Security

Use JWT Authentication.

Roles:

```
ADMIN

LIBRARIAN

STUDENT
```

Endpoints should be role based.

---

# REST APIs

## Authentication

```
POST /auth/register

POST /auth/login

GET /auth/profile
```

---

## Books

```
GET /books

GET /books/{id}

POST /books

PUT /books/{id}

DELETE /books/{id}

GET /books/search
```

---

## Members

```
GET /members

POST /members

PUT /members

DELETE /members
```

---

## Transactions

```
POST /transactions/issue

POST /transactions/return

GET /transactions

GET /transactions/history
```

---

## Reservations

```
POST /reservations

DELETE /reservations

GET /reservations
```

---

# Validation Rules

Books

- ISBN unique
- Title required
- Quantity > 0

Users

- Email unique
- Password minimum 8 chars

Members

- Student ID unique
- Phone valid

Transactions

- Due date > Issue date

---

# Frontend Pages

Authentication

- Login
- Register

Dashboard

- Overview
- Statistics

Books

- List
- Details
- Add
- Edit

Members

- List
- Add
- Edit

Transactions

- Issue
- Return
- History

Reservations

- List

Profile

Settings

404 Page

---

# Dashboard Widgets

Cards

- Total Books
- Available Books
- Borrowed Books
- Members
- Overdue Books

Charts

- Monthly Issues
- Category Distribution
- Popular Books

Recent Activity Table

---

# Frontend Folder Structure

```
src/

components/

pages/

layouts/

hooks/

services/

context/

routes/

utils/

assets/

types/

constants/
```

---

# UI Principles

- Responsive
- Dark Mode (Optional)
- Loading Skeletons
- Empty States
- Error Pages
- Toast Notifications
- Confirmation Dialogs

---

# Backend Folder Structure

```
controller/

service/

repository/

entity/

dto/

mapper/

security/

config/

exception/

util/
```

---

# Exception Handling

Create Global Exception Handler

Return

```
status
message
timestamp
path
```

---

# Logging

Log

- Login
- Book Issue
- Book Return
- Errors

---

# API Response Format

```
{
    "success": true,
    "message": "",
    "data": {}
}
```

Error

```
{
    "success": false,
    "message": "",
    "errors": []
}
```

---

# Coding Standards

Backend

- Constructor Injection
- No Field Injection
- DTOs
- Services Interface
- Layered Architecture

Frontend

- Reusable Components
- No Duplicate Code
- Custom Hooks
- API Layer Separate
- Constants Folder

---

# Testing Checklist

Backend

- Login
- Register
- CRUD
- Validation
- JWT
- Role Access

Frontend

- Forms
- Navigation
- API Integration
- Responsive UI

---

# Deployment

Backend

Render / Railway

Frontend

Vercel / Netlify

Database

Neon PostgreSQL

---

# Documentation

Must include

README

- Project Overview
- Tech Stack
- Features
- Installation
- API
- Folder Structure
- Team Members
- Screenshots

---

# Team Responsibilities

## Harsh

Frontend Lead

Responsibilities

- React Setup
- UI Components
- Dashboard
- Authentication Pages
- Books UI
- API Integration

---

## Saumajit

Backend Lead

Responsibilities

- Spring Boot Setup
- Security
- Authentication
- Books APIs
- Transactions APIs
- PostgreSQL Integration

---

## Vedant

Database & Integration Lead

Responsibilities

- Database Design
- Entity Relationships
- JPA Mapping
- Postman Collection
- Testing
- Documentation
- CI/CD Support

---

# 5-Day Sprint Plan

## Day 1 – Foundation

- Initialize repositories
- Configure Spring Boot
- Configure React + Vite
- Set up PostgreSQL
- Design database schema
- Configure Git workflow
- Create folder structure
- Add dependencies

Deliverable:
Project runs locally with frontend and backend connected.

---

## Day 2 – Core Features

Backend:

- JWT Authentication
- User management
- Book CRUD
- Validation

Frontend:

- Login
- Register
- Dashboard Layout
- Book Listing

Deliverable:
Authentication and Book Module completed.

---

## Day 3 – Library Operations

Backend:

- Member CRUD
- Issue Book
- Return Book
- Reservation APIs

Frontend:

- Member Management
- Issue Book Form
- Return Book Form
- API Integration

Deliverable:
Complete library workflow functional.

---

## Day 4 – Polish & Testing

- Dashboard analytics
- Search & Filters
- Pagination
- Exception handling
- Toasts
- Validation
- Responsive UI
- Integration testing
- Bug fixes

Deliverable:
Feature-complete application.

---

## Day 5 – Production Ready

- Final testing
- Documentation
- Screenshots
- Deployment
- Presentation preparation
- Demo rehearsal
- Merge dev → main
- Create release tag

Deliverable:
Deployed, documented, presentation-ready project.

---

# Daily Team Checklist

Every member should complete the following before ending the day:

- Pull latest `dev`
- Resolve merge conflicts
- Write meaningful commits
- Push feature branch
- Open Pull Request
- Review at least one teammate's PR
- Test your changes
- Update documentation if required
- Share progress with the team

---

# Definition of Done (DoD)

A task is considered complete only when:

- Code compiles successfully
- No console or server errors
- Feature is fully functional
- Input validation implemented
- API tested in Postman
- UI integrated with backend
- Responsive on desktop and mobile
- Code reviewed by a teammate
- Merged into `dev`
- Documentation updated

---

# Stretch Goals (If Time Permits)

- Email notifications for due dates
- Barcode/QR code support
- Fine payment simulation
- Book recommendation engine
- Audit logs
- Docker Compose setup
- GitHub Actions CI/CD
- Advanced analytics dashboard
- Export reports to PDF/Excel
- Search with pagination and sorting

---

# Final Presentation Flow (10 Minutes)

1. Problem Statement
2. Project Architecture
3. Technology Stack
4. Authentication & Security
5. Database Design
6. Live Demo
7. API Demonstration (Postman)
8. Challenges Faced
9. Team Contributions
10. Future Enhancements

---

# Success Criteria

By the end of Day 5, the project should:

- Be fully functional end-to-end.
- Follow clean architecture and coding standards.
- Demonstrate secure authentication and role-based access.
- Be deployed and publicly accessible.
- Include comprehensive documentation.
- Showcase effective team collaboration through Git.
- Be polished enough to present confidently in interviews, hackathons, and academic evaluations.

Remember: **quality over quantity**. A polished application with well-implemented core features is far more impressive than an unfinished project with many incomplete features.
