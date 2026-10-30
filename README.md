# The Wild Oasis — Admin Dashboard

The Wild Oasis dashboard is an internal hotel-management application for running a cabin-reservation business. Staff can manage cabins, bookings, guests, check-ins, check-outs, and operational settings from one authenticated workspace.

This repository is the separate staff dashboard for the customer-facing booking application in [the-wild-oasis-website](https://github.com/iknevo/the-wild-oasis-website).

## Features

- Staff authentication with protected routes
- Dashboard with booking, sales, occupancy, and stay-duration metrics
- Cabin CRUD with images, pricing, capacity, and discount management
- Booking table with pagination, filtering, and sorting
- Booking detail views with guest and cabin information
- Check-in and check-out workflows
- Breakfast selection during check-in
- Guest and staff account management
- Application settings for booking and breakfast constraints
- Light/dark mode and responsive dashboard layout
- React Query caching and toast-based feedback

## Tech stack

- React 18 and Vite 6
- React Router 7
- Supabase Database and Auth
- TanStack Query
- Styled Components
- Recharts
- React Hook Form and date-fns
- React Hot Toast and React Icons

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm, pnpm, or Yarn
- Access to the Supabase project containing the cabins, bookings, guests, settings, and users tables

### Installation

```bash
git clone https://github.com/iknevo/the-wild-oasis.git
cd the-wild-oasis
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Configuration

The current demo client is configured in `src/services/supabase.js`. Before deploying another instance, move the Supabase URL and publishable key to Vite environment variables and configure Supabase Auth redirect URLs. Never expose a service-role key in the browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
├── features/
│   ├── authentication/   # Login, signup, profile, and session hooks
│   ├── bookings/         # Booking lists, details, and operations
│   ├── cabins/           # Cabin CRUD and availability data
│   ├── check-in-out/     # Check-in, checkout, and breakfast workflows
│   ├── dashboard/        # Metrics, charts, and activity
│   └── settings/         # Hotel configuration
├── pages/                # Dashboard route screens
├── services/             # Supabase API functions
├── ui/                   # Reusable dashboard primitives
└── Routes.jsx            # React Router configuration
```

## Data model

The dashboard works with Supabase records for cabins, bookings, guests, users, and settings. Booking operations coordinate cabin availability, guest details, stay dates, payment status, and check-in/check-out state.

## Deployment

Build the static application and deploy `dist/` to Vercel or another static host. Configure SPA fallback routing and the Supabase authentication redirect URLs for the deployed origin.

## License

No license file is currently included in the repository.
