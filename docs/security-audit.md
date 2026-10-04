# Security Audit Report

## 1. Authentication & email enumeration

- **Status:** Secured.
- Failed sign-in responses use a non-descriptive message ("Invalid email or password. Please try again.") so the existence of an email is not revealed.
- Rate limiting is provided by Supabase (default max ~30 auth requests per hour per IP).

## 2. Row Level Security (RLS) & multi-tenant isolation

- **Status:** Requires database-level policies.
- Recommended setup:

```sql
ALTER TABLE restaurant_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow individual read/write access to own registration"
  ON restaurant_registrations
  FOR ALL
  USING (auth.uid() = user_id);
```

## 3. Client secrets / service role key

- **Status:** Clean.
- No Supabase `service_role` keys or other internal secrets are present in the codebase or version control.

## 4. Environment variables

- **Status:** Checked.
- Only browser-safe values use the `NEXT_PUBLIC_*` prefix (URL and anon key).

## 5. Dependencies

- **Status:** Secure at last review.
- Next.js pinned to a patched version. Run `pnpm audit` regularly.
