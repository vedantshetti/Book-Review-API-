# Book-Review-API-# Book Review API

A RESTful API for book reviews built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- User registration and login with JWT
- Add, list, and search books (with pagination/filter)
- Add, update, delete reviews (one review per user per book)
- Get book details with average rating and paginated reviews

## Setup

1. Clone the repo
2. Install dependencies: `npm install`
3. Create a `.env` file (see `.env.example`)
4. Start MongoDB locally or use MongoDB Atlas
5. Run the app: `npm run dev`

## Example API Requests

See assignment instructions or use Postman/curl.

## Database Schema

- **User:** username, email, password (hashed)
- **Book:** title, author, genre, description
- **Review:** user, book, rating, comment, timestamps

## Design Decisions

- One review per user per book (enforced by unique index)
- JWT tokens expire in 2 hours
- Passwords are hashed with bcrypt
