-- Run this entire file in MySQL to set up your database
-- Command: mysql -u root -p < database.sql

CREATE DATABASE IF NOT EXISTS food_waste_db;
USE food_waste_db;

-- Users table (Admin, Manager, Staff, NGO)
CREATE TABLE IF NOT EXISTS users (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(100)        NOT NULL,
  email    VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100)        NOT NULL,
  role     ENUM('Admin','Manager','Staff','NGO') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily food entry (what was prepared and consumed)
CREATE TABLE IF NOT EXISTS food (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  date     DATE        NOT NULL,
  item     VARCHAR(100) NOT NULL,
  prepared INT         NOT NULL,
  consumed INT         NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Waste records
CREATE TABLE IF NOT EXISTS waste (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  date   DATE        NOT NULL,
  item   VARCHAR(100) NOT NULL,
  wasted INT         NOT NULL,
  reason VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Surplus food (shared with NGOs)
CREATE TABLE IF NOT EXISTS surplus (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  item     VARCHAR(100) NOT NULL,
  quantity INT          NOT NULL,
  status   ENUM('Available','Requested','Collected') DEFAULT 'Available',
  ngo_name VARCHAR(100),
  date     DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed one admin user (password: admin123)
INSERT IGNORE INTO users (name, email, password, role)
VALUES ('Admin User', 'admin@foodwaste.com', 'admin123', 'Admin');

SELECT "Database setup complete!" AS message;
