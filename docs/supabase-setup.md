# Supabase Auth & Google OAuth Setup

Manual steps to enable real authentication in production.

## 1. Supabase project configuration

1. Log in to the [Supabase Dashboard](https://app.supabase.com).
2. Select your project.
3. Go to **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon / Public API Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Add them to `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 2. Google OAuth (Google Cloud Console)

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Configure the **OAuth consent screen** (app name, support email).
4. **Credentials → Create Credentials → OAuth client ID** → Web application.
5. Add authorized redirect URI:

   ```
   https://<your-supabase-project-id>.supabase.co/auth/v1/callback
   ```

6. Copy the **Client ID** and **Client Secret**.

## 3. Enable Google provider in Supabase

1. Supabase Dashboard → **Authentication → Providers**.
2. Enable **Google**.
3. Paste Client ID and Client Secret.
4. Save.

## 4. Database table (`restaurant_registrations`)

Ensure the table exists with columns matching the registration form, for example:

- `restaurant_name`
- `restaurant_type`
- `city`
- `address`
- `owner_name`
- `phone`
- `email`
- `heard_about`
- `notes`
- `user_id`
- `status`

Enable Row Level Security and policies as described in [security-audit.md](security-audit.md).
