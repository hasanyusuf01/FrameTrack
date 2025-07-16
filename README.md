# FrameTrack - Optical Business Management System

A comprehensive full-stack application for managing optical business operations, built with a React frontend and Django REST API backend.

---

## 🚀 Features

FrameTrack provides a complete solution for optical business management with the following key features:

- **Shop Management System**: Complete shop administration and configuration  
- **Product Search**: Advanced product search and filtering capabilities  
- **User Authentication**: Token-based authentication system  
- **Admin Interface**: Django admin interface for backend management  
- **Shop Portal**: Multi-shop management interface  
- **Inventory Management**: Complete inventory tracking and management  
- **Sales Monitoring**: Real-time sales tracking and analytics  
- **Billing System**: Integrated billing and invoice management  
- **Reporting**: Comprehensive business reporting tools  

---

## 🛠️ Technology Stack

### Frontend
- **React**: Modern React framework with hooks and component composition  
- **Vite**: Fast build tool and development server  
- **React Router**: Client-side routing  
- **Modern UI Components**: Responsive design with modern styling  

### Backend
- **Django 5.2.4**: Web framework for the API backend  
- **Django REST Framework**: RESTful API development  
- **Token Authentication**: API authentication system  
- **CORS Headers**: Cross-origin resource sharing support  
- **Custom User Model**: Extended user authentication  

---

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher)  
- **npm** or **yarn**  
- **Python** (v3.8 or higher)  
- **pip** (Python package manager)  
- **PostgreSQL** installed locally  

---

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hasanyusuf01/FrameTrack.git  
cd FrameTrack
```
---

Project Structure
FrameTrack/  
├── FrameTrack/                 # Django backend  
│   ├── FrameTrack/            # Project settings  
│   │   ├── settings.py        # Django configuration  
│   │   ├── urls.py            # URL routing  
│   │   └── wsgi.py            # WSGI configuration  
│   ├── api/                   # API application  
│   │   ├── models.py          # Database models  
│   │   ├── views.py           # API views  
│   │   ├── serializers.py     # DRF serializers  
│   │   └── urls.py            # API URL patterns  
│   └── manage.py              # Django management script  
├── client/                    # React frontend  
│   ├── src/                   # Source code  
│   │   ├── components/        # React components  
│   │   ├── pages/             # Page components  
│   │   └── App.jsx            # Main application component  
│   ├── package.json           # Node.js dependencies  
│   └── vite.config.js         # Vite configuration  




## 📋 Prerequisites

- **Python 3.9+**, **pip**, **virtualenv** (optional)  
- **Node.js 18+**, **npm** or **pnpm**  
- **PostgreSQL** installed locally  

---

## 🗄️ PostgreSQL Setup — Local DB Creation

# 1. Login as the default postgres superuser
``` sudo -i -u postgres ```

# 2. Enter the PostgreSQL shell
```
psql

 ```
-- 3. Create the database
```
CREATE DATABASE frametrack;
```
-- 4. Create a dedicated user
```
CREATE USER frametrack_user WITH PASSWORD 'yourpassword';
```
-- 5. Grant access to the database
```
GRANT ALL PRIVILEGES ON DATABASE frametrack TO frametrack_user;
```
-- 6 Tabels
```
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
```


### Backend
Navigate to FrameTrack and run

```
cd FrameTrack
 
python manage.py runserver
 ```
Install Python dependencies:
```
pip install django==5.2.4  
pip install djangorestframework  
pip install django-cors-headers  
pip install django-environ
```

### Frontend
Navigate to Client Folder 
```
npm install
npm run dev
```

