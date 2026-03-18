# NexTask V2

A full-stack task management application rebuilt from an earlier MERN-based version into a stronger, more structured architecture using Next.js, Spring Boot, and PostgreSQL.

NexTask V2 reflects a deliberate upgrade in both stack choice and implementation quality. The project keeps the original product direction of a personal productivity app, but improves the system with a typed frontend, a Java backend, JWT-based authentication, relational persistence, and cleaner separation between client and server responsibilities.

## Overview

This version was created as a major evolution of the original project. Instead of continuing with the first MERN implementation, the app was reworked into a modern frontend + backend architecture:

- `Next.js 14` for the client application
- `Spring Boot 3` for the REST API
- `PostgreSQL` for persistent relational storage
- `JWT authentication` for secure session handling

The goal of V2 was not just to switch technologies, but to improve the project overall by making it more scalable, more maintainable, and more aligned with production-style development.

## Highlights

- Rebuilt from a previous MERN stack version into a Next.js + Spring Boot architecture
- Implemented JWT-based authentication and protected API access
- Added profile update and password change flows
- Built task CRUD with user-specific task ownership
- Added task segmentation for all, pending, completed, and overdue views
- Added priority filtering and task progress visualization
- Structured for deployment with Vercel on the frontend and Render on the backend

## Features

- User registration and login
- Authenticated user lookup with `/auth/me`
- Profile editing
- Password update support
- Create, update, delete, and fetch tasks
- Priority-based filtering: `low`, `medium`, `high`
- Dedicated views for:
  - all tasks
  - pending tasks
  - completed tasks
  - overdue tasks
- Frontend analytics widget for task completion tracking
- Backend health check endpoint for monitoring

## Tech Stack

### Frontend

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Framer Motion
- Recharts

### Backend

- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- PostgreSQL
- Maven
- JJWT

## Architecture

NexTask V2 follows a clean client-server split:

- The `frontend/` app handles UI, routing, client state, and API interaction
- The `backend/` service handles authentication, business logic, persistence, and security
- JWT tokens are issued by the backend and used by the frontend to access protected routes
- PostgreSQL stores users and task records

This separation makes the project easier to maintain and gives it a more production-oriented structure than a tightly coupled single-stack implementation.

## Project Structure

```text
nexTask-v2/
|-- backend/
|   |-- src/main/java/com/madhav/nextask/
|   |   |-- config/
|   |   |-- controller/
|   |   |-- dto/
|   |   |-- entity/
|   |   |-- repository/
|   |   |-- security/
|   |   `-- service/
|   |-- src/main/resources/
|   |-- Dockerfile
|   `-- pom.xml
|-- frontend/
|   |-- app/
|   |-- context/
|   |-- hooks/
|   |-- providers/
|   |-- public/
|   `-- package.json
`-- DEPLOYMENT.md
```

## Local Development

### Prerequisites

- Node.js 18+
- Java 17+
- PostgreSQL

### Backend setup

Create a local config file:

```text
backend/src/main/resources/application-local.properties
```

Use the example file as a template:

```properties
spring.datasource.url=jdbc:postgresql://your-db-host:5432/your-db-name
spring.datasource.username=your-db-username
spring.datasource.password=your-db-password

spring.jpa.show-sql=true
app.cors.allowed-origins=http://localhost:3000
```

Run the backend from [backend](/C:/Users/Madhav/Desktop/nexTask-v2/backend):

Windows PowerShell:

```powershell
$env:SPRING_PROFILES_ACTIVE="local"
.\mvnw.cmd spring-boot:run
```

macOS/Linux:

```bash
SPRING_PROFILES_ACTIVE=local ./mvnw spring-boot:run
```

The API runs on `http://localhost:8080`.

### Frontend setup

Create:

```text
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Run the frontend from [frontend](/C:/Users/Madhav/Desktop/nexTask-v2/frontend):

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000`.

## Environment Variables

### Frontend

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the Spring Boot backend |

### Backend

| Variable | Description |
| --- | --- |
| `SPRING_DATASOURCE_URL` | PostgreSQL connection URL |
| `SPRING_DATASOURCE_USERNAME` | PostgreSQL username |
| `SPRING_DATASOURCE_PASSWORD` | PostgreSQL password |
| `SPRING_JPA_SHOW_SQL` | Enables SQL logging |
| `PORT` | Server port, defaults to `8080` |
| `APP_CORS_ALLOWED_ORIGINS` | Allowed frontend origin(s) |

## API Summary

### Authentication

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PATCH /auth/me`
- `POST /auth/change-password`

### Tasks

- `POST /tasks`
- `GET /tasks`
- `GET /tasks/all`
- `GET /tasks/{id}`
- `PATCH /tasks/{id}`
- `DELETE /tasks/{id}`

### Utility

- `GET /health`

## Deployment

The project is already structured for a simple full-stack deployment flow:

- Frontend on Vercel
- Backend on Render

Deployment notes are available in [DEPLOYMENT.md](/C:/Users/Madhav/Desktop/nexTask-v2/DEPLOYMENT.md).

## Why This Version Matters

For portfolio and recruiter review, the strongest part of this project is the transition itself. NexTask V2 is not just a task app. It shows the ability to:

- migrate a product idea across stacks
- redesign application structure instead of only adding features
- work across frontend, backend, authentication, database, and deployment concerns
- improve an existing codebase rather than starting from a blank template

That makes it a stronger representation of full-stack engineering ability than a simple greenfield CRUD demo.


## Author Note

NexTask V2 is an upgraded rebuild of an earlier version of the project. The focus here was to modernize the stack, improve the architecture, and expand the feature set into a more polished full-stack application.
