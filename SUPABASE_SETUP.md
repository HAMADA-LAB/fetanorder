# Supabase Auth & Google OAuth Manual Setup Guide

To complete the setup of real authentication in production, perform the following manual steps outside the codebase:

## 1. Supabase Project Configuration
1. Log in to your [Supabase Dashboard](https://app.supabase.com).
2. Select your project.
3. Go to **Project Settings > API** and copy:
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - Anon / Public API Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
4. Add these variables to your `.env.local` file in the root of your project:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 2. Google OAuth Provider Setup (Google Cloud Console)
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select your existing project.
3. Configure the **OAuth consent screen** (External / Internal, app name, support email).
4. Go to **Credentials > Create Credentials > OAuth client ID**.
5. Select **Web application**.
6. Add authorized redirect URIs:
   - `https://<your-supabase-project-id>.supabase.co/auth/v1/callback`
7. Copy your **Client ID** and **Client Secret**.

## 3. Enable Google Provider in Supabase Dashboard
1. In Supabase Dashboard, navigate to **Authentication > Providers**.
2. Click on **Google**.
3. Toggle **Enabled** to ON.
4. Enter the **Client ID** and **Client Secret** from Google Cloud Console.
5. Save changes.

## 4. Database Table (`restaurant_registrations`)
Ensure the `restaurant_registrations` table exists in your Supabase database with appropriate columns matching the registration form (`restaurant_name`, `restaurant_type`, `city`, `address`, `owner_name`, `phone`, `email`, `heard_about`, `notes`, `user_id`, `status`).
