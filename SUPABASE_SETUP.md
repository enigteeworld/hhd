# Supabase Setup Instructions for Happy Hearts Daycare

This guide will walk you through setting up Supabase for the admin panel and content management system.

## Prerequisites

- A Supabase account (free tier available at https://supabase.com)
- Node.js installed on your machine

## Step 1: Create a Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Enter project details:
   - Name: `happy-hearts-daycare`
   - Database Password: (generate a secure password)
   - Region: Choose closest to your location (e.g., `London (eu-west-2)`)
4. Click "Create New Project"
5. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your API Keys

1. Once your project is ready, go to the Project Dashboard
2. Click on the **Settings** icon (gear icon) in the left sidebar
3. Click on **API** in the settings menu
4. Copy the following values:
   - **Project URL** (e.g., `https://xxxxxxxxxxxx.supabase.co`)
   - **anon public** API key (starts with `eyJ...`)

## Step 3: Set Up Environment Variables

1. In your project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-url.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Create Database Tables

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click **New Query**
3. Run the following SQL to create the necessary tables:

```sql
-- Site Settings Table
CREATE TABLE site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Images Table
CREATE TABLE images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Pages Table
CREATE TABLE content_pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Members Table
CREATE TABLE team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
  ('nursery_name', 'Happy Hearts Daycare'),
  ('address', '173 Ashley Lane, Manchester, M9 4NQ'),
  ('email', 'happyheart1925@outlook.com'),
  ('phone', '01234 567890'),
  ('opening_hours', 'Mon - Fri: 7:30 AM - 6:00 PM'),
  ('hero_title', 'Nurturing curiosity. Building bright futures.'),
  ('hero_subtitle', 'A warm, secure place where early learning feels like play.'),
  ('about_text', 'Happy Hearts Daycare started with a simple vision: to create a childcare setting that we would want for our own children.'),
  ('meta_description', 'Premium daycare in Manchester providing exceptional care for children aged 6 months to 5 years.');

-- Insert sample testimonials
INSERT INTO testimonials (author, quote, rating) VALUES
  ('Sarah & James Mitchell', 'The team made settling in so gentle—our daughter runs in smiling every morning. We couldn''t be happier with the care she receives.', 5),
  ('Amina Khan', 'Communication is brilliant. We get daily updates and photos that really matter. It feels like we''re part of their day.', 5),
  ('David Richardson', 'It feels like a second home—caring, organized, and genuinely fun. Our son has learned so much since joining.', 5);

-- Insert sample team members
INSERT INTO team_members (name, role, bio, display_order) VALUES
  ('Emma Thompson', 'Nursery Director', 'Over 15 years experience in early years education.', 1),
  ('Sophie Williams', 'Lead Teacher', 'Specialist in child development and creative learning.', 2),
  ('James Anderson', 'Early Years Educator', 'Passionate about outdoor learning and nature exploration.', 3),
  ('Margaret Chen', 'Nursery Nurse', 'Qualified pediatric first aider with 20 years experience.', 4);
```

4. Click **Run** to execute the SQL

## Step 5: Set Up Storage (Optional - for image uploads)

1. In your Supabase dashboard, go to **Storage** (left sidebar)
2. Click **New Bucket**
3. Create buckets:
   - `images` (for general images)
   - `team` (for team member photos)
4. Set **Public** access for both buckets
5. Under **Policies**, add the following policy for public read access:
   - Name: `Public Read`
   - Allowed operation: `SELECT`
   - Target roles: `anon`, `authenticated`
   - Policy definition: `true`

## Step 6: Install Supabase Client

1. In your project terminal, run:
   ```bash
   npm install @supabase/supabase-js
   ```

## Step 7: Create Supabase Client

Create a file `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## Step 8: Enable Row Level Security (RLS)

For security, enable RLS on all tables:

1. Go to **Table Editor**
2. Click on each table
3. Click **Enable RLS**
4. Add policies for authenticated users to manage data

Example policy for `site_settings`:
```sql
CREATE POLICY "Enable all for authenticated users" ON site_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

## Step 9: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5173
3. Navigate to `/admin`
4. Login with credentials:
   - Username: `admin`
   - Password: `Untoldpass@6`

## Troubleshooting

### Common Issues:

1. **CORS Errors**: 
   - Go to Settings > API > CORS
   - Add your domain to allowed origins

2. **Permission Denied**:
   - Check RLS policies are configured correctly
   - Ensure you're using the correct API key

3. **Connection Failed**:
   - Verify your `.env` file has correct values
   - Check your internet connection
   - Ensure Supabase project is active

## Next Steps

1. Customize the admin dashboard to use Supabase data
2. Add authentication with Supabase Auth
3. Set up real-time subscriptions for live updates
4. Configure backups and monitoring

## Support

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: https://github.com/supabase/supabase/issues
