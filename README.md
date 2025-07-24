# 🧑‍💼 Employee Management System API - NestJS

A full-featured **NestJS REST API** for employee management. This project includes:
- 🌐 Complete RESTful API for employee CRUD
- 🚫 Rate-limiting on endpoints
- 📋 Custom logging of requests
- 🔐 Employee-based authentication and role-based authorization

Built with **NestJS** and **Prisma** for robust, secure, and scalable employee management.

---

## 🚀 Getting Started (Interactive Guide)

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Set Up the Database**
- Make sure your `.env` has a valid `DATABASE_URL` for PostgreSQL (Neon or local).
- Run migrations:
```bash
npx prisma migrate dev --name init
```

### 3. **Start the Application**
```bash
npm run start:dev
```

---

## 🔐 Employee Authentication & Authorization

### **How Authentication Works**
- Only employees can log in and receive JWT tokens.
- Only employees with `role: "ADMIN"` can create, update, or delete employees.
- All authentication and authorization is based on the Employee model.

### **Bootstrapping: Creating the First Admin Employee**
Because the `/employees` creation endpoint is protected, you need to create the first admin employee manually:

#### **Option 1: Temporarily Remove Protection**
1. In `src/employees/employees.controller.ts`, temporarily comment out or remove the `@UseGuards` and `@Roles('ADMIN')` decorators from the `create` method.
2. Start the app and run:
```bash
curl -X POST http://localhost:3000/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin Employee",
    "email": "admin@company.com",
    "password": "adminpass",
    "role": "ADMIN"
  }'
```
3. Restore the protection after the admin is created.

#### **Option 2: Insert Directly in the Database**
1. Hash a password using Node.js:
```js
const bcrypt = require('bcryptjs');
bcrypt.hashSync('adminpass', 10);
```
2. Insert the employee using SQL (replace `<hashed_password>`):
```sql
INSERT INTO "Employee" (name, email, password, role, "createdAt", "updatedAt")
VALUES ('Admin', 'admin@company.com', '<hashed_password>', 'ADMIN', NOW(), NOW());
```

---

### **Login as an Employee**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@company.com",
    "password": "adminpass"
  }'
```
- Copy the `access_token` from the response.

### **Use JWT to Access Protected Endpoints**
Add the following header to your requests:
```
Authorization: Bearer <access_token>
```

- **Create Employee:** `POST /employees`
- **Update Employee:** `PATCH /employees/{id}`
- **Delete Employee:** `DELETE /employees/{id}`

Only employees with `role: "ADMIN"` can perform these actions.

---

## 🧪 Interactive API Testing

### **Test as a Non-Admin Employee**
- Create an employee with a non-admin role (e.g., `"ENGINEER"`).
- Log in as that employee and try to access protected endpoints.
- You should receive a `403 Forbidden` error.

### **Test Public Endpoints**
- `GET /employees` and `GET /employees/{id}` should work for any authenticated employee (or even unauthenticated, depending on your controller setup).

---

## 🛡️ Role-Based Access
- Only employees with `role: "ADMIN"` can create, update, or delete employees.
- Other roles (`ENGINEER`, `INTERN`) can only view employees.

---

## 🛠️ Tech Stack
- **NestJS** (Node.js framework)
- **Prisma** (ORM)
- **PostgreSQL** (Neon or local)
- **JWT Auth** (with role-based guards)
- **Custom Logger**
- **Rate Limiting**

---

## 📂 Project Structure
```
src/
  employees/      # Employee CRUD & auth
  auth/           # Auth, JWT, guards
  database/       # Prisma integration
  my-logger/      # Custom logger
```

---

## 🧑‍💻 Tips
- Use [Postman](https://www.postman.com/) or [curl](https://curl.se/) for testing.
- For non-admin employees, protected endpoints will return `403 Forbidden`.
- You can register multiple employees with different roles to test access control.

---

Happy hacking! 🎉
