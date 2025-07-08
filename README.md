# FrameTrack Pro — Full-Stack Inventory Management

A complete full-stack web application for managing optical frame inventory across a distributor & shop network.  
This repo contains:

- **Django REST API** (backend)  
- **React + Vite + Bootstrap** dashboard & shop portal (frontend)  

---

## 🚀 Tech Stack

- **Backend**: Django, Django REST Framework, PostgreSQL  
- **Frontend**: React, Vite, Bootstrap, Axios  
- **Configuration**: `django-environ` for `.env`  
- **ORM**: Django’s built-in ORM  

---

## 📁 Repository Structure


---

## 📋 Prerequisites

- **Python 3.9+**, **pip**, **virtualenv** (optional)  
- **Node.js 18+**, **npm** or **pnpm**  
- **PostgreSQL** installed locally  

---

## 🗄️ PostgreSQL Setup — Local DB Creation

# 1. Login as the default postgres superuser
sudo -i -u postgres

# 2. Enter the PostgreSQL shell
psql
-- 3. Create the database
CREATE DATABASE frametrack;

-- 4. Create a dedicated user
CREATE USER frametrack_user WITH PASSWORD 'yourpassword';

-- 5. Grant access to the database
GRANT ALL PRIVILEGES ON DATABASE frametrack TO frametrack_user;
-- 6 Tabels
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('distributor', 'shop')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shops Table
CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_email VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Frames Table
CREATE TABLE frames (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100),
    price NUMERIC(10, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Lens Types
CREATE TABLE lens_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    price NUMERIC(10, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Table
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(id),
    frame_id INT REFERENCES frames(id),
    quantity INT,
    reserved_quantity INT DEFAULT 0,
    last_restocked TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Sales Table
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(id),
    frame_id INT REFERENCES frames(id),
    lens_type_id INT REFERENCES lens_types(id),
    frame_price NUMERIC(10, 2),
    lens_price NUMERIC(10, 2),
    total_amount NUMERIC(10, 2),
    sold_by INT REFERENCES users(id),
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_billed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bills Table
CREATE TABLE bills (
    id SERIAL PRIMARY KEY,
    shop_id INT REFERENCES shops(id),
    bill_number VARCHAR(50) UNIQUE,
    billing_period VARCHAR(10),
    total_amount NUMERIC(10, 2),
    total_items INT,
    is_paid BOOLEAN DEFAULT FALSE,
    paid_at TIMESTAMP,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bill Items Table
CREATE TABLE bill_items (
    id SERIAL PRIMARY KEY,
    bill_id INT REFERENCES bills(id),
    sale_id INT REFERENCES sales(id),
    frame_product_id VARCHAR(100),
    frame_name VARCHAR(100),
    lens_type_name VARCHAR(100),
    frame_price NUMERIC(10, 2),
    lens_price NUMERIC(10, 2),
    total_amount NUMERIC(10, 2),
    sale_date TIMESTAMP
);



## 🔧 Backend Setup

 **Clone** the repo  
   ```bash
   git clone <repo-url>
   cd repo/backend
```

### Backend
Navigate to and run

``` 
python manage.py runserver
 ```

### Frontend
Navigate to Client Folder 
```
npm install
npm run dev
```

