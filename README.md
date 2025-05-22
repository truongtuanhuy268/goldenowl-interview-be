# Golden Owl Intern Assignment Project

A backend project built with NestJS framework and MongoDB database for interview purposes.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## 🚀 Installation and Setup Guide

### Step 1: Clone project and install dependencies

```bash
# Clone repository
git clone https://github.com/truongtuanhuy268/goldenowl-interview-be.git
cd goldenowl-interview-be

# Install dependencies
npm install
```

### Step 2: MongoDB Setup

#### Option A: Using Local MongoDB
1. Install MongoDB Community Server from [MongoDB Official Website](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   brew services start mongodb/brew/mongodb-community
   # or
   sudo systemctl start mongod
   ```

#### Option B: Using MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com)
2. Create a free account
3. Create a new cluster 
4. Setup Database Access:
   - Create a database user with username and password
   - Remember the credentials
5. Setup Network Access:
   - Add your current IP address or allow all IPs (0.0.0.0/0) for testing
6. Get the connection string from your cluster

### Step 3: Environment Configuration

Copy the environment example file and configure your variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual configuration values.

**Note:** 
- Replace placeholder values in `.env` with your actual MongoDB connection details
- Ensure `.env` file is added to `.gitignore`

### Step 4: Seed Database

Run the seeder to populate the database with sample data:

```bash
npx ts-node ./src/database/seeders/student.seeder.ts
```

**Note:** This may take a few seconds. Make sure MongoDB is running and connected successfully before running the seeder.

### Step 5: Start the Application

```bash
# Development mode with hot reload
npm run start:dev
```

The application will be running at: `http://localhost:${env.PORT}`

### API Testing

1. **Using Postman or Bruno:**
   - Base URL: `http://localhost:${env.PORT}/`

2. **Using curl:**
   ```bash
   # Example endpoint test
   curl -X GET http://localhost:${env.PORT}/reports
   ```
## Quick Start Summary

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your MongoDB connection details

# 3. Seed database
npx ts-node ./src/database/seeders/student.seeder.ts

# 4. Start development server
npm run start:dev

# 5. Test the application
curl http://localhost:3000/reports
```