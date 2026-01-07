# Medizam Operations

A comprehensive healthcare supply management system for Medizam Healthcare Limited. Handles quotations, invoices, inventory tracking, and client management with seamless quote-to-invoice conversion and real-time stock management.

## Features

- **Quotation Management**: Create, track, and manage quotations with partial conversion support
- **Invoice Management**: Generate invoices from quotes or standalone, track payments
- **Inventory Control**: Real-time stock tracking with low-stock alerts
- **Client Database**: Comprehensive client management with history
- **Product Catalog**: Product aliasing for flexible naming and search
- **PDF Generation**: Professional quotation and invoice PDFs
- **Data Import**: Import existing data from Excel files

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Supabase recommended)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Notifications**: Sonner
- **PDF**: @react-pdf/renderer
- **Excel**: xlsx

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)

### 1. Clone and Install

```bash
cd medizam-ops
npm install
```

### 2. Set Up Database

#### Option A: Supabase (Recommended - Free Tier)

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > Database
4. Copy the connection strings

#### Option B: Local PostgreSQL

```bash
# Create database
createdb medizam_ops
```

### 3. Configure Environment

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Supabase PostgreSQL
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Or Local PostgreSQL
# DATABASE_URL="postgresql://user:password@localhost:5432/medizam_ops"
# DIRECT_URL="postgresql://user:password@localhost:5432/medizam_ops"
```

### 4. Initialize Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Seed with sample data
npm run db:seed
```

### 5. Import Existing Data

If you have existing Excel files to import:

```bash
# Create data directory
mkdir -p data

# Copy your Excel files
cp /path/to/Reusable_Quotation_Tool_with_Tracking_v1_01.xlsm data/
cp /path/to/Invoice_List_Medizam_2025.xlsx data/

# Run import
npm run import:excel
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Create account at [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Environment Variables for Production

Set these in your deployment platform:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (with pooling) |
| `DIRECT_URL` | PostgreSQL direct connection string |

## Project Structure

```
medizam-ops/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Sample data seeder
├── scripts/
│   └── import-excel.ts    # Excel import script
├── src/
│   ├── app/
│   │   ├── (dashboard)/   # Dashboard pages
│   │   │   ├── dashboard/ # Main dashboard
│   │   │   ├── products/  # Product management
│   │   │   ├── clients/   # Client management
│   │   │   ├── quotes/    # Quotation management
│   │   │   ├── invoices/  # Invoice management
│   │   │   ├── inventory/ # Stock management
│   │   │   └── settings/  # App settings
│   │   └── api/           # API routes
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   └── pdf/           # PDF templates
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client
│   │   └── utils.ts       # Utility functions
│   └── types/
│       └── index.ts       # TypeScript types
└── public/                # Static assets
```

## Key Workflows

### Quote to Invoice Conversion

1. Create a quotation with line items
2. When client approves, go to quote detail page
3. Click "Convert to Invoice"
4. Select items and quantities to convert (supports partial)
5. System automatically:
   - Creates invoice with selected items
   - Updates quote status (PARTIAL or CONVERTED)
   - Decrements product stock
   - Creates stock movement records

### Stock Management

- Stock is automatically decremented when invoices are created
- Stock movements are tracked with full audit trail
- Low stock alerts appear on dashboard and inventory page
- Manual adjustments can be made via Inventory > Adjust Stock

### Product Aliasing

Products can have multiple aliases for flexible matching:
- Main name: "Surgical Gloves (Latex, Powder-Free)"
- Aliases: "Latex Gloves", "Surgical Gloves Latex", "Gloves Latex PF"

This helps when:
- Different clients use different names
- Matching products during data import
- Searching for products

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/products` | List/create products |
| GET/POST | `/api/clients` | List/create clients |
| GET/POST | `/api/quotes` | List/create quotes |
| POST | `/api/quotes/[id]/convert` | Convert quote to invoice |
| GET/POST | `/api/invoices` | List/create invoices |
| POST | `/api/invoices/[id]/payments` | Record payment |
| GET/POST | `/api/stock` | Stock movements |
| GET/PUT | `/api/settings` | App settings |

## Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database

# Data Import
npm run import:excel # Import from Excel files
```

## License

Private - Medizam Healthcare Limited

## Support

For issues or questions, contact the development team.
