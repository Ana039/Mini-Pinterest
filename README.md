PinIt – A Pinterest Clone

A full-stack Pinterest-style application built with a Next.js (TypeScript) frontend and a Django REST Framework backend using PostgreSQL.

Project Structure

pinit-project/
├── frontend/           # Next.js (TypeScript) frontend
├── backend/            # Django backend
├── accounts/           # Django auth app
├── pins/               # Django pins app
├── manage.py           # Django project manager
└── README.md

Prerequisites

Python 3.x

Node.js & npm

PostgreSQL

Backend Setup (Django)

Create and activate a virtual environment:

python3 -m venv venv
source venv/bin/activate

Install Django and required packages manually:

pip3 install django djangorestframework psycopg2-binary python-dotenv djangorestframework-simplejwt

If you encounter errors, make sure you're using pip3 and that your virtual environment is activated.

Set up environment variables:

Create a .env file in the root of the backend folder:

DEBUG=True
SECRET_KEY=your-secret-key
DB_NAME=pinit
DB_USER=your-username
DB_PASSWORD=your-password
DB_HOST=localhost
DB_PORT=5432

Configure PostgreSQL:

Start your PostgreSQL server.

Create a database named pinit.

Run migrations:

python3 manage.py makemigrations
python3 manage.py migrate

Create a superuser (optional):

python3 manage.py createsuperuser

Start the backend server:

python3 manage.py runserver

Visit: http://localhost:8000/api

Frontend Setup (Next.js)

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Visit: http://localhost:3000

API Endpoints

Authentication:

POST /api/auth/register/ — Register a new user

POST /api/auth/login/ — Log in user

POST /api/auth/logout/ — Log out user

GET /api/auth/profile/ — Get user profile

Pins:

GET /api/pins/ — List all pins

POST /api/pins/ — Create a new pin

GET /api/pins/{id}/ — Get pin details

PUT /api/pins/{id}/ — Update a pin

DELETE /api/pins/{id}/ — Delete a pin

Features

User authentication (register, login, logout)

View pins in a responsive grid layout

Add, edit, and delete pins

View user profile with bio and avatar

Keep users logged in with token persistence

Mobile responsive design with Tailwind CSS

Technologies Used

Frontend

Next.js (App Router)

React

TypeScript

Tailwind CSS

Axios

Backend

Django

Django REST Framework

PostgreSQL

Python

Development

Backend: http://localhost:8000

Admin Panel: http://localhost:8000/admin

Frontend: http://localhost:3000

Known Issues / To Do

Pin image uploads (currently using URLs)

Like/bookmark functionality

Dark mode support

User following system

Pagination or infinite scroll for pins

Getting Started

Follow the steps in Backend Setup and Frontend Setup above. Once both servers are running, visit the frontend URL to begin using the app.

Happy Pinning!

