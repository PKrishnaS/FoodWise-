# FoodWise — Food Waste Management System

A full-stack web application for tracking, predicting, and reducing food waste in organizations. Built with a Node.js/Express backend and a pure HTML/CSS/JS frontend.

---

## Project Structure

```
FoodWise/
├── food-waste-backend/          # Node.js REST API
│   ├── server.js                # Entry point
│   ├── db.js                    # MySQL connection (uses .env)
│   ├── database.sql             # Database schema
│   ├── package.json
│   ├── .env.example             # Copy to .env and add your credentials
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── foodRoutes.js
│   │   ├── wasteRoutes.js
│   │   ├── surplusRoutes.js
│   │   ├── predictionRoutes.js
│   │   └── reportRoutes.js
│   └── controllers/
│       ├── authController.js
│       ├── foodController.js
│       ├── wasteController.js
│       ├── surplusController.js
│       ├── predictionController.js
│       └── reportController.js
│
└── food-waste-frontend/         # HTML/CSS/JS frontend
    ├── login.html
    ├── register.html
    ├── dashboard.html
    ├── food.html
    ├── waste.html
    ├── prediction.html
    ├── surplus.html
    ├── reports.html
    ├── analysis.html
    ├── users.html
    ├── shared.css               # Global styles
    └── shared.js                # Auth helpers, sidebar, API config
```

---

## Features

- **User Auth** — Register and login with session stored in localStorage
- **Food Entry** — Log incoming food inventory
- **Waste Entry** — Record food items wasted
- **Surplus Management** — Track and redistribute surplus food
- **Waste Prediction** — AI-assisted prediction of future waste
- **Reports & Analysis** — Charts and summaries of waste trends
- **User Management** — Admin panel for managing users
- **Dashboard** — Overview with live charts and alerts

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript, Chart.js |
| Backend | Node.js, Express.js |
| Database | MySQL (mysql2 driver) |
| Dev Tools | nodemon, dotenv |

---

## Setup — Backend

1. Go into the backend folder:
   ```bash
   cd food-waste-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env`:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=food_waste_db
   ```

4. Import the database schema:
   ```bash
   mysql -u root -p < database.sql
   ```

5. Start the server:
   ```bash
   npm start        # production
   npm run dev      # development (auto-reload)
   ```

Backend runs at `http://localhost:5000`

---

## Setup — Frontend

No build step needed. Just open `login.html` in a browser, or serve with a local server:

```bash
cd food-waste-frontend
npx serve .
```

Make sure the backend is running first. The API URL is set in `shared.js`:
```js
const API = "http://localhost:5000/api";
```
Change this to your deployed backend URL for production.

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET/POST | `/api/food` | Food entries |
| GET/POST | `/api/waste` | Waste entries |
| GET/POST | `/api/surplus` | Surplus food |
| GET | `/api/prediction` | Waste prediction |
| GET | `/api/reports` | Reports |

---

## Security

- Database credentials stored in `.env` — **gitignored**, never pushed to GitHub
- Use `.env.example` as a reference template
- Never hardcode passwords in source files

---

## License

MIT
