# 🥗 Food Waste Management System — Backend

## ⚙️ SETUP (Do this once)

### Step 1 — Install dependencies
```
npm install
```

### Step 2 — Set up MySQL database
```
mysql -u root -p < database.sql
```
(Enter your MySQL password when prompted)

### Step 3 — Set your MySQL password in db.js
Open `db.js` and change:
```
password: "",   // put your password here if you have one
```

### Step 4 — Start the server
```
npm run dev
```

You should see:
```
MySQL Connected Successfully!
Server running on http://localhost:5000
```

---

## 🧪 API ENDPOINTS (Test with Postman)

### AUTH
| Method | URL | Body (JSON) |
|--------|-----|-------------|
| POST | /api/auth/register | `{ "name":"...", "email":"...", "password":"...", "role":"Admin" }` |
| POST | /api/auth/login    | `{ "email":"...", "password":"..." }` |
| GET  | /api/auth/users    | — |
| DELETE | /api/auth/users/:id | — |

### FOOD ENTRY
| Method | URL | Body (JSON) |
|--------|-----|-------------|
| POST | /api/food/add | `{ "date":"2025-01-15", "item":"Rice", "prepared":100, "consumed":80 }` |
| GET  | /api/food/all | — |
| GET  | /api/food/date/2025-01-15 | — |

### WASTE ENTRY
| Method | URL | Body (JSON) |
|--------|-----|-------------|
| POST | /api/waste/add | `{ "date":"2025-01-15", "item":"Rice", "wasted":20, "reason":"Overcooked" }` |
| GET  | /api/waste/all | — |
| GET  | /api/waste/summary | — |

### PREDICTION
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/prediction | Predict overall food need |
| GET | /api/prediction/Rice | Predict for specific item |

### REPORTS
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/report/dashboard | Summary cards data |
| GET | /api/report/monthly | Month-wise report |
| GET | /api/report/alerts | High waste alerts |

### SURPLUS (NGO Module)
| Method | URL | Body (JSON) |
|--------|-----|-------------|
| POST  | /api/surplus/add | `{ "item":"Rice", "quantity":20, "date":"2025-01-15" }` |
| GET   | /api/surplus/all | — |
| PATCH | /api/surplus/request/:id | `{ "ngo_name":"Care NGO" }` |
| PATCH | /api/surplus/status/:id  | `{ "status":"Collected" }` |

---

## 📁 FOLDER STRUCTURE
```
food-waste-backend/
├── server.js           ← Entry point
├── db.js               ← MySQL connection
├── database.sql        ← Run this to create DB + tables
├── package.json
├── routes/
│   ├── authRoutes.js
│   ├── foodRoutes.js
│   ├── wasteRoutes.js
│   ├── predictionRoutes.js
│   ├── reportRoutes.js
│   └── surplusRoutes.js
└── controllers/
    ├── authController.js
    ├── foodController.js
    ├── wasteController.js
    ├── predictionController.js
    ├── reportController.js
    └── surplusController.js
```
