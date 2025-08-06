# 📌 kTask Management API

A secure and scalable RESTful API built using **Node.js**, **Express**, and **MongoDB** that supports user registration, login, task creation, and task management.

---

## 🚀 Features

- User registration with email verification
- Secure JWT-based login with refresh token
- Role-based access (admin/member)
- Create, update, delete tasks
- View all tasks with filtering and pagination
- Proper error handling using custom classes
- Logging using Winston
- Email sending using Mailgen and nodemailer
- Environment variable handling
- Postman collection for testing

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT + Cookies
- **Email**: Nodemailer + Mailgen
- **Logging**: Winston
- **Validation**: express-validator
- **Testing**: Postman (manual)

---

## 📁 Project Structure
devboard-backend/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── validators/
│   └── app.js
│   └── index.js
├── logs/
│   ├── error.log
│   └── combined.log
├── postman/
│   ├── DevBoard-API.postman_collection.json
│   └── DevBoard-Local.postman_environment.json
├── .env.example
├── .env
├── .gitignore
├── README.md
├── package.json
└── package-lock.json

---

## 🔐 Environment Variables

Create a `.env` file in the root with the following variables:

##Example

PORT=5000
MONGO_URI=mongodb://localhost:27017/chatgpt_task
TOKEN_SECRET=your_jwt_secret
TOKEN_EXPIRY=1d
BASE_URL=http://localhost:5000
EMAIL_ID=your_email@gmail.com
EMAIL_PASSWORD=your_email_password


🛑 Make sure not to commit `.env` file to GitHub.

---

## ⚙️ Installation and Run

### 💻 Local Setup

```bash
# Clone the repo
git clone https://github.com/srinjoy420/chatgpt_task.git
cd chatgpt_task/backend

# Install dependencies
npm install

# Start server
npm start

🔌 API Endpoints
🔐 Auth Routes
| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | /api/v1/register | Register new user   |
| POST   | /api/v1/login    | Login and get token |
| GET    | /api/v1/logout   | Logout user         |

📋 Task Routes
| Method | Endpoint     | Description                   |
| ------ | ------------ | ----------------------------- |
| POST   | /api/v1/task | Create a task (Auth required) |
| GET    | /api/v1/task | Get all tasks                 |
| PUT    | /api/v1/task | Update a task                 |
| DELETE | /api/v1/task | Delete a task                 |

Testing with Postman
✅ Import Collection
Open Postman

Import from:
/postman_collection/ChatGPT-Task.postman_collection.json

Use environment or set base_url as http://localhost:5000

est Flow
Register a new user

Login and copy the jwt_token from cookies

Add token to Authorization: Bearer <token> header

Test task creation, update, delete

Logging
Logs are saved using Winston:

logs/error.log → only errors

logs/combined.log → all logs

👤 Author
Srinjoy Ghosh
📧 ghoshsrinjoy2@gmail.com
🔗 [GitHub](https://github.com/srinjoy420) • [LinkedIn](https://www.linkedin.com/in/srinjoyghosh75/)

