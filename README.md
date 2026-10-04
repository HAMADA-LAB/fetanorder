# Fetan Order

**The calmer way to run your restaurant.**

Fetan Order is a modern restaurant operating system built for Ethiopian restaurants. It unifies QR table ordering, kitchen display, waiter tools, cashier payments, and owner analytics into one bilingual (English / Amharic) web app.

No extra hardware. Guests scan a QR code, order from their phone, and the kitchen, waiters, and cashier stay in sync in real time.

---

## Features

| Role | What you get |
|------|----------------|
| **Guest** | QR menu, bilingual EN/AM, customize items, place order from the table |
| **Kitchen** | Live ticket board — Confirmed → Cooking → Ready |
| **Waiter** | Table status, deliver orders, request bill, add manual items |
| **Cashier** | Settle tables via Cash, Chapa, or Telebirr |
| **Owner** | Dashboard with live orders, tables, revenue, and full reports |

- **QR ordering** — no app download required
- **Bilingual by default** — English and Amharic
- **Real-time kitchen sync**
- **ETB pricing** with Chapa & Telebirr support
- **Reports** — revenue trends, peak hours, top items, payment mix
- **Role-specific views** — each team member sees only what they need

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router)
- **UI:** React 19, Tailwind CSS 4, Framer Motion, Lucide icons
- **Backend / Auth:** [Supabase](https://supabase.com/) (Auth + database)
- **Charts:** Recharts
- **Package manager:** pnpm
- **Language:** TypeScript

---

## Project Structure

```
fetanorder/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Marketing / landing page
│   ├── demo/               # Interactive role demo (owner, kitchen, waiter, client)
│   ├── menu/               # Guest QR menu & ordering
│   ├── kitchen/            # Kitchen display system
│   ├── waiter/             # Waiter table & order tools
│   ├── cashier/            # Payment settlement
│   ├── dashboard/          # Owner live overview
│   ├── reports/            # Analytics & reports
│   ├── login/              # Staff / owner login
│   ├── register/           # Restaurant onboarding
│   ├── payment/            # Guest payment flow
│   ├── privacy/ & terms/   # Legal pages
│   ├── layout.tsx
│   └── globals.css
├── components/             # Shared UI components
│   ├── brand-loader.tsx
│   └── ui/
├── lib/                    # Utilities & data
│   ├── supabase.ts         # Supabase client
│   ├── demo-data.ts        # Sample tables / orders for demos
│   ├── use-demo-simulation.ts
│   └── utils.ts
├── public/                 # Static assets (icons, food images, logos)
├── docs/                   # Project documentation
│   ├── supabase-setup.md
│   ├── security-audit.md
│   └── phase1-findings.md
├── .github/workflows/      # CI
├── package.json
└── ...
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/) 9+ (or 12 as specified in `packageManager`)

### 1. Clone & install

```bash
git clone https://github.com/HAMADA-LAB/fetanorder.git
cd fetanorder
pnpm install
```

### 2. Environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

See [docs/supabase-setup.md](docs/supabase-setup.md) for full Auth + Google OAuth setup.

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/demo` | Interactive role selector (demo password: `0000`) |
| `/menu` | Guest QR menu |
| `/kitchen` | Kitchen display |
| `/waiter` | Waiter tools |
| `/cashier` | Cashier |
| `/dashboard` | Owner dashboard |
| `/reports` | Analytics |
| `/login` | Login |
| `/register` | Restaurant registration |

---

## Build & Production

```bash
# Production build
pnpm build

# Start production server
pnpm start
```

The project is ready to deploy on [Vercel](https://vercel.com). Connect the repo, set the two `NEXT_PUBLIC_SUPABASE_*` environment variables, and deploy.

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create optimized production build |
| `pnpm start` | Run production build |

---

## Documentation

- [Supabase Auth & Google OAuth setup](docs/supabase-setup.md)
- [Security audit notes](docs/security-audit.md)
- [Phase 1 code review findings](docs/phase1-findings.md)

---

## License

See [LICENSE](LICENSE).

---

Built for restaurants in Ethiopia · Design by IBDAA
