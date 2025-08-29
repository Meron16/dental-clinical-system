Dental Clinical System

A full-stack web application for managing a dental clinic, built with Node.js (Express) for the backend and React for the frontend. It helps manage patients, appointments, treatments, and staff.

Features

Patient registration and management

Appointment booking and scheduling

Treatment history tracking

User authentication and role-based access (admin, dentist, receptionist)

Simple billing and invoices

Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT

Installation & Setup

Clone the repository

git clone https://github.com/Meron16/dental-clinical-system.git
cd dental-clinical-system


Setup backend

cd backend
npm install
cp .env.example .env   # add your MongoDB URI and JWT secret
npm run dev


Setup frontend

cd frontend
npm install
npm run dev

Usage

Frontend runs on: http://localhost:5173 (or 3000 if CRA)

Backend runs on: http://localhost:5000
