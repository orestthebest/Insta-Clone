# OrestGram

An Instagram-style image sharing app built with SvelteKit, TailwindCSS and MySQL.

## Features

- Register, login and logout
- Upload images with title and description
- Vote on images (once per user)
- Comment on images
- Profile page with avatar and bio
- Top 3 images highlighted on homepage
- Admin panel for managing users, images and comments

## Tech Stack

- SvelteKit (Svelte 5)
- TailwindCSS v4
- MySQL with mysql2
- Vercel Blob for image storage
- bcrypt for password hashing

## Setup

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with your database and Vercel Blob credentials
4. Run the SQL in `database.sql` to create the tables
5. Run `npm run dev` to start the development server

## Deployment

Deployed on Vercel: [orestgram.vercel.app](https://orestgram.vercel.app)