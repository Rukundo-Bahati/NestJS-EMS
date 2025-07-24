# 🧑‍💼 Employee Management System API - NestJS

A full-featured backend application built using **NestJS**, designed to manage employee records with:

- 🌐 RESTful API structure
- 🧩 **Prisma ORM** for type-safe database access
- ☁️ **Neon** (PostgreSQL serverless database)
- ⚙️ **Custom Logging** service
- 🚫 **Rate Limiting** with `@nestjs/throttler`
- 🧪 Easily testable with Postman / ThunderClient

---

## 🛠️ Tech Stack

- **NestJS** - Modular and scalable Node.js framework
- **Prisma** - Next-gen TypeScript ORM
- **Neon** - Cloud PostgreSQL with serverless support
- **@nestjs/throttler** - Request rate limiting
- **Custom Logger** - Extends NestJS logging for IP and route tracking

---

## 📦 Project Structure

```bash
src/
│
├── employees/              # Employee CRUD logic
│   ├── employees.controller.ts
│   ├── employees.service.ts
│
├── database/               # Prisma integration
│   ├── database.service.ts
│
├── my-logger/              # Custom logging service
│   ├── my-logger.service.ts
│
├── app.module.ts           # Root module with Throttler setup
├── main.ts                 # Bootstrap file

🧑‍💻 Features
✅ Employee Management
Create, Read, Update, Delete employees

Optional query filter by role

⚙️ Logging (Custom)
Logs IP address & route access using a reusable logging service

⏱️ Rate Limiting
Global & route-specific request limits using ThrottlerModule

📄 Prisma + Neon DB
Uses Prisma for ORM & Neon for scalable, cloud-hosted PostgreSQL

| Method | Endpoint         | Description         | Throttled                |
| ------ | ---------------- | ------------------- | ------------------------ |
| GET    | `/api/employees`     | Get all employees   | ✅ Yes (global or custom) |
| GET    | `/api/employees/:id` | Get employee by ID  | ✅ Yes (1 req/sec)        |
| POST   | `/api/employees`     | Create new employee | ✅ Yes                    |
| PATCH  | `/api/employees/:id` | Update employee     | ✅ Yes                    |
| DELETE | `/api/employees/:id` | Delete employee     | ✅ Yes                    |
