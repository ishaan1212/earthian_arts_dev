# Earthian Arts Commerce

Full-stack MERN e-commerce application for a jewellery storefront.

## Stack

- React + Vite frontend
- Node.js + Express backend
- MongoDB Atlas or local MongoDB
- Mongoose models
- JWT authentication
- Stripe Checkout integration point
- Cloudinary-ready product image fields

## Quick Start

```bash
npm install
npm install --prefix client
npm install --prefix server
cp server/.env.example server/.env
npm run seed
npm run dev
```

Frontend: `http://localhost:5173`

Backend API: `http://localhost:5001/api`

## Local MongoDB

This project is configured to use a local database by default:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/earthian_arts
```

On macOS with Homebrew, install and start MongoDB Community:

```bash
brew tap mongodb/brew
brew trust mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

Verify the database is running:

```bash
mongosh --quiet --eval 'db.runCommand({ ping: 1 })'
```

Seed products and the default admin account:

```bash
npm run seed
```

Default admin:

- Email: `admin@earthianarts.test`
- Password: `Admin12345`

## Environment

Configure `server/.env` before using payments, authentication secrets, or MongoDB Atlas.

## GitHub CI/CD

This repo uses split GitHub Actions workflows:

- `CI`: runs on pull requests and pushes to `main`
- `Deploy Frontend`: deploys the React app from `client/` to Vercel after CI succeeds on `main`
- `Deploy Backend`: triggers a Render backend deploy after CI succeeds on `main`

Required GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `RENDER_DEPLOY_HOOK_URL`

Production environment variables should be configured in the hosting dashboards, not committed to Git:

- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
