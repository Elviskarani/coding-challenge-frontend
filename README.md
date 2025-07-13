# Task Management Platform - Frontend

A modern task management application built with Next.js 15, featuring user authentication, task management, and admin capabilities.

## Features

- User authentication and authorization
- Task creation, editing, and management
- Admin user management
- Responsive design with Tailwind CSS
- Real-time task filtering and search

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Runtime**: React 19
- **Development**: Turbopack for fast development

## Getting Started

### Prerequisites

- Node.js 18+ 
- Backend API running on port 5000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```
Update `NEXT_PUBLIC_API_URL` if your backend runs on a different port.

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/app/
├── (auth)/           # Authentication pages
│   └── login/
├── (main)/           # Main application pages
│   ├── dashboard/    # Task management
│   └── admin/        # Admin panel
└── lib/              # Utilities and API client
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000/api)
