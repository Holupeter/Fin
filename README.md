# Fin. — Personal Finance Management Suite

**Fin.** is a premium, full-stack personal finance application designed for clarity, discipline, and goal-oriented wealth management. Built with a modern tech stack, it provides users with a comprehensive overview of their financial health, from budget tracking to savings goals.

![Fin. Dashboard](/public/assets/images/logo.svg) <!-- Replace with a real screenshot if available later -->

## 🚀 Key Features

- **Consolidated Overview**: Real-time dashboard showing current balance, total income, and detailed expense breakdown.
- **Goal-Based Savings (Pots)**: Visualize and manage specific savings targets with dynamic progress tracking.
- **Intelligent Budgeting**: Category-specific budget management with visual indicators for spending limits.
- **Comprehensive Transactions**: Fully searchable and filterable transaction history.
- **Recurring Bills Tracking**: Monitor upcoming expenses to ensure you never miss a payment.
- **Personalized Profiles**: Real-time avatar uploads and multi-currency support (USD/NGN).
- **Global Search & Filter**: Instant data retrieval across all financial modules.

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15+ (App Router, Turbopack)
- **Styling**: Tailwind CSS (Mobile-first, fully responsive design)
- **State Management**: React Context API & Convex Hooks
- **Typography**: Public Sans (via Google Fonts)

### Backend & Database
- **Auth**: Supabase Auth (Secure JWT-based authentication)
- **Database**: Convex (Real-time NoSQL document store)
- **Storage**: Convex Storage (High-speed file storage for user avatars)
- **Serverless Logic**: Convex Functions (Mutations/Queries with built-in type safety)

## 🏗️ Architecture & Logic

Fin. is built on a **Real-Time Reactive Architecture**. Unlike traditional REST-based apps, every change in the database—whether adding a transaction or updating a budget—is instantly reflected in the UI without page refreshes, thanks to Convex's websocket-first approach.

### Key Implementation Details:
- **Data Scoping**: Every piece of data (budgets, pots, transactions) is strictly scoped to the authenticated user ID.
- **Smart Amount Handling**: A custom balance calculation engine that handles internal numeric precision to prevent floating-point errors.
- **Responsive Layout Engine**: Custom-built flexible layout that handles sidebar interactions and viewport scaling perfectly across mobile, tablet, and desktop.

## 🚦 How It Works (Development)

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Set up environment variables**:
   Create a `.env.local` with your Supabase and Convex credentials.
4. **Run Convex in development mode**:
   ```bash
   npx convex dev
   ```
5. **Start the Next.js dev server**:
   ```bash
   pnpm run dev
   ```

## 🌟 Possible Improvements (Roadmap)

- **AI Financial Insights**: Integration with LLMs to provide personalized spending advice and automated categorisation.
- **CSV/Bank Import**: Functionality to bulk import transaction history from bank statements.
- **Rich Analytics**: Advanced data visualization using D3.js or Recharts for long-term spending patterns.
- **Desktop notifications**: Alerting users when they are nearing their budget limits or when a bill is due soon.

---

*Designed and Developed by Orion — Part of a Professional Portfolio Showcase.*
