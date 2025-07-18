# 📚 Reading Recommendation API

An API for managing users, books, and reading intervals. Built with **NestJS**, **TypeORM**, and **PostgreSQL**. Includes JWT authentication, logging middleware, and Docker support.

---

## 📦 Tech Stack

- **NestJS** — RESTful API framework  
- **PostgreSQL** — Relational database  
- **TypeORM** — ORM for DB access  
- **JWT** — Auth system  
- **Docker / Docker Compose** — Local dev environment  
- **class-transformer & class-validator** — For DTOs and serialization  

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/amrMU/octane.git
cd octane 
```
### 2.Run the project using Docker

```
docker-compose up -d --build -d
```

### 3. Environment Variables
Create a .env file in the root of the project with the following values:

```
DB_HOST=db
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=reading_app
JWT_SECRET= secretKey
```

### 4. Run locally (without Docker)

``` 
npm install
````

Update .env to match your local PostgreSQL credentials.

Then start the dev server:

```
npm run start:dev
```

### 🧪 Seeder (Optional)
```
npx ts-node src/database/seeder.ts
```

### 🔐 Authentication

Use the /auth/register and /auth/login routes to get a JWT token.

Then include it in headers for protected routes:
```
Authorization: Bearer <your_token>
```

### 📑 Available Endpoints

You can explore and test all available API routes via Postman:
[Postman Docs](https://documenter.getpostman.com/view/1256078/2sB34imfJr)


### 🖥️ Logging
A custom middleware is used to log every incoming request with timestamp, method, path, body, headers, and response status.

Example output:
```
 [2025-07-18T00:49:06.954Z] POST /auth/login Headers: { "content-type": "application/json", "user-agent": "PostmanRuntime/7.44.1", "accept": "*/*", "postman-token": "c5d2cde7-92c3-410d-b201-d53953110ea8", "host": "localhost:3000", "accept-encoding": "gzip, deflate, br", "connection": "keep-alive", "content-length": "56" } Body: { "email": "amr@test.com", "password": "123456" } Status: 401 Response: {"message":"Invalid credentials","error":"Unauthorized","statusCode":401} 

``` 

### 📂 Project Structure

```
src/
├── auth/
├── books/
├── common/
│   └── middleware/logger.middleware.ts
├── database/
│   └── seeder.ts
├── reading-intervals/
├── users/
├── app.module.ts
└── main.ts

```

### 🔗 Useful Links
GitHub Repo: https://github.com/amrMU/octane

Postman Docs: https://docume
nter.getpostman.com/view/1256078/2sB34imfJr

