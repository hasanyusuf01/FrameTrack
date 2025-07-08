# FrameTrack - Optical Business Management System  
  
A comprehensive full-stack application for managing optical business operations, built with React frontend and Django REST API backend.  
  
## 🚀 Features  
  
FrameTrack provides a complete solution for optical business management with the following key features:  
  
- **Shop Management System**: Complete shop administration and configuration [1](#1-0)   
- **Product Search**: Advanced product search and filtering capabilities [2](#1-1)   
- **User Authentication**: Token-based authentication system [3](#1-2)   
- **Admin Interface**: Django admin interface for backend management [4](#1-3)   
- **Shop Portal**: Multi-shop management interface [5](#1-4)   
- **Inventory Management**: Complete inventory tracking and management [6](#1-5)   
- **Sales Monitoring**: Real-time sales tracking and analytics [7](#1-6)   
- **Billing System**: Integrated billing and invoice management [8](#1-7)   
- **Reporting**: Comprehensive business reporting tools [9](#1-8)   
  
## 🛠️ Technology Stack  
  
### Frontend  
- **React**: Modern React framework with hooks and component composition [10](#1-9)   
- **Vite**: Fast build tool and development server [11](#1-10)   
- **React Router**: Client-side routing  
- **Modern UI Components**: Responsive design with modern styling  
  
### Backend  
- **Django 5.2.4**: Web framework for the API backend [12](#1-11)   
- **Django REST Framework**: RESTful API development [13](#1-12)   
- **Token Authentication**: API authentication system [3](#1-2)   
- **CORS Headers**: Cross-origin resource sharing support [14](#1-13)   
- **Custom User Model**: Extended user authentication [15](#1-14)   
  
## 📋 Prerequisites  
  
Before setting up the project, ensure you have the following installed:  
  
- **Node.js** (v18 or higher)  
- **npm** or **yarn**  
- **Python** (v3.8 or higher)  
- **pip** (Python package manager)  
  
## 🚀 Installation and Setup  
  
### 1. Clone the Repository  
  
```bash  
git clone https://github.com/hasanyusuf01/FrameTrack.git  
cd FrameTrack
```
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

