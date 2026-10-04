# Fetan Order

**The calmer way to run your restaurant.**

Fetan Order is a restaurant operating system built for Ethiopian restaurants. It brings QR table ordering, kitchen display, waiter tools, cashier payments, and owner analytics into one bilingual (English / Amharic) web app.

Guests scan a QR code, order from their phone, and the kitchen, waiters, and cashier stay in sync.

---

## Features

| Role | What you get |
|------|----------------|
| **Guest** | QR menu, bilingual EN/AM, customize items, place order from the table |
| **Kitchen** | Live ticket board — Confirmed → Cooking → Ready |
| **Waiter** | Table status, deliver orders, request bill, add manual items |
| **Cashier** | Settle tables via Cash, Chapa, or Telebirr |
| **Owner** | Dashboard with live orders, tables, revenue, and full reports |

- QR ordering — no app download required  
- Bilingual by default — English and Amharic  
- Real-time kitchen sync  
- ETB pricing with Chapa & Telebirr support  
- Reports — revenue trends, peak hours, top items, payment mix  
- Role-specific views for each team member  

---

## Tech stack

- **Framework:** Next.js (App Router)
- **UI:** React, Tailwind CSS, Framer Motion, Lucide icons
- **Backend / Auth:** Supabase
- **Charts:** Recharts
- **Language:** TypeScript

---

## Project structure

```
fetanorder/
├── app/           # Pages (landing, menu, kitchen, waiter, cashier, dashboard, reports, auth)
├── components/    # Shared UI
├── lib/           # Supabase client, demo data, utilities
├── public/        # Static assets
└── docs/          # Internal notes
```

Built for restaurants in Ethiopia.
