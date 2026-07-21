# CritiqAI

A modern, full-stack web application built with a monorepo architecture. CritiqAI provides a scalable platform with authentication, database management, and a shared component library for multiple applications.

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Development Guide](#-development-guide)
- [Building for Production](#-building-for-production)
- [Available Scripts](#-available-scripts)
- [Troubleshooting](#-troubleshooting)

## 🎯 Overview

CritiqAI is a sophisticated monorepo built with [Turborepo](https://turborepo.dev), featuring a modern tech stack optimized for scalability, developer experience, and performance. The project includes multiple Next.js applications, shared UI components, utilities, and a robust backend with authentication and database management.

## 🛠 Tech Stack

### Core Technologies

- **Monorepo**: [Turborepo](https://turborepo.dev) - High-performance build system
- **Runtime**: [Node.js](https://nodejs.org) ≥18
- **Package Manager**: [pnpm](https://pnpm.io) 9.0.0
- **Language**: [TypeScript](https://www.typescriptlang.org) 5.9
- **Framework**: [Next.js](https://nextjs.org) 16

### Frontend

- **UI Framework**: [React](https://react.dev) 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with PostCSS
- **Icons**: [Tabler Icons React](https://tabler.io/icons)
- **Validation**: [Zod](https://zod.dev)

### Backend & Database

- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io)
- **Authentication**: [NextAuth.js](https://next-auth.js.org) 4.24
- **Email**: [Nodemailer](https://nodemailer.com)
- **Password Hashing**: [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

### Development Tools

- **Linting**: [ESLint](https://eslint.org) 9
- **Code Formatting**: [Prettier](https://prettier.io)
- **Containerization**: [Docker](https://www.docker.com)

## 📁 Project Structure

```
CritiqAI/
├── apps/                          # Applications
│   ├── web/                       # Main web application (Next.js)
│   │   ├── app/                   # Next.js app router
│   │   ├── components/            # React components
│   │   ├── lib/                   # Utilities and configurations
│   │   └── public/                # Static assets
│   └── docs/                      # Documentation site (Next.js)
│
├── packages/                      # Shared packages
│   ├── database/                  # Prisma database client
│   │   └── prisma/                # Schema and migrations
│   ├── ui/                        # Shared React components library
│   ├── constants/                 # Application constants
│   ├── utils/                     # Utility functions
│   ├── eslint-config/             # Shared ESLint configuration
│   ├── tailwind-config/           # Shared Tailwind configuration
│   └── typescript-config/         # Shared TypeScript configurations
│
├── docker-compose.yml             # Docker services configuration
├── turbo.json                     # Turborepo configuration
├── pnpm-workspace.yaml            # pnpm workspace configuration
└── package.json                   # Root package.json
```

## 📦 Key Applications

### Web App (`apps/web`)

The main application featuring:

- User authentication with email verification
- NextAuth.js integration with Prisma adapter
- Protected routes and API endpoints
- Responsive UI with Tailwind CSS

### Docs App (`apps/docs`)

Documentation and additional content site built with Next.js.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher ([Download](https://nodejs.org))
- **pnpm**: v9.0.0 or higher
  ```bash
  npm install -g pnpm
  ```
- **Docker** (optional): For containerized development
  - [Download Docker Desktop](https://www.docker.com/products/docker-desktop)
  - [Download Docker Engine (Linux)](https://docs.docker.com/engine/install)

### Environment Variables

You'll need to set up environment files for database and authentication:

- `.env` (root level) - Database and general configuration
- `apps/web/.env.local` - Next.js specific variables

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/SinaShateri/CritiqAI.git
cd CritiqAI
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create `.env` in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/critiqai"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 4. Set Up the Database

#### Option A: Using Docker Compose (Recommended)

```bash
docker-compose up -d
```

#### Option B: Manual PostgreSQL Setup

Ensure PostgreSQL is running and create the database:

```sql
CREATE DATABASE critiqai;
```

### 5. Run Prisma Migrations

```bash
pnpm run prisma:migrate
```

### 6. Start Development Server

```bash
pnpm dev
```

The applications will start at:

- **Web**: http://localhost:3000
- **Docs**: http://localhost:3001 (if configured separately)

## 💻 Development Guide

### Project Commands

#### Development

Start all applications in development mode with hot reloading:

```bash
pnpm dev
```

Develop a specific application:

```bash
pnpm dev --filter=web
pnpm dev --filter=docs
```

#### Building

Build all applications and packages:

```bash
pnpm build
```

Build a specific package:

```bash
pnpm build --filter=web
pnpm build --filter=@repo/ui
```

#### Type Checking

Check TypeScript types across the entire monorepo:

```bash
pnpm check-types
```

#### Linting

Run ESLint across all packages:

```bash
pnpm lint
```

#### Code Formatting

Format all TypeScript, TSX, and Markdown files:

```bash
pnpm format
```

### Adding Dependencies

Install a dependency in a specific workspace:

```bash
# Add to web app
pnpm --filter=web add package-name

# Add to UI package
pnpm --filter=@repo/ui add package-name

# Add dev dependency
pnpm --filter=web add -D package-name
```

### Creating New Components

Components should be added to `packages/ui/src/` for shared usage:

```bash
# Example: Creating a new button variant in the UI package
# Edit packages/ui/src/button/index.tsx
```

### Database Changes

When modifying the Prisma schema:

```bash
# Create a new migration
pnpm run prisma:migrate:dev --name descriptive_name

# Apply migrations
pnpm run prisma:migrate

# Regenerate Prisma client
pnpm run prisma:generate
```

## 🏗 Building for Production

### 1. Build All Packages and Applications

```bash
pnpm build
```

This command:

- Compiles TypeScript
- Bundles applications
- Optimizes for production
- Generates necessary artifacts

### 2. Production Environment Variables

Create `.env.production`:

```env
DATABASE_URL="postgresql://prod-user:prod-password@prod-host:5432/critiqai"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret-key"
```

### 3. Start Production Server

```bash
pnpm start
```

### 4. Deploy

Deploy built artifacts to your hosting platform:

- **Vercel**: Recommended for Next.js applications
- **AWS**: EC2, ECS, or Amplify
- **Docker**: Use provided `docker-compose.yml`
- **Other**: Standard Node.js hosting

## 📜 Available Scripts

| Command            | Description                                         |
| ------------------ | --------------------------------------------------- |
| `pnpm dev`         | Start all apps in development mode                  |
| `pnpm build`       | Build all packages and applications                 |
| `pnpm start`       | Start production server                             |
| `pnpm lint`        | Run ESLint across monorepo                          |
| `pnpm format`      | Format code with Prettier                           |
| `pnpm check-types` | Type-check entire monorepo                          |
| `pnpm rm:modules`  | Clean install (removes node_modules and lock files) |

## 🐳 Docker Support

The project includes a `docker-compose.yml` for easy containerized development:

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔧 Troubleshooting

### Node Version Issues

Ensure you're using Node.js v18 or higher:

```bash
node --version
```

### pnpm Installation Issues

If pnpm is not recognized:

```bash
npm install -g pnpm@9.0.0
```

### Database Connection Errors

- Verify PostgreSQL is running
- Check DATABASE_URL in `.env`
- Ensure database user has proper permissions

### Port Already in Use

If port 3000 is in use, modify the dev script:

```bash
pnpm dev -- --port 3001
```

### Module Resolution Issues

Clear the monorepo and reinstall:

```bash
pnpm rm:modules
pnpm install
```

### Build Failures

Clear Turborepo cache and rebuild:

```bash
rm -rf .turbo
pnpm build
```

## 📚 Additional Resources

- [Turborepo Documentation](https://turborepo.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ by Sina Shateri**
