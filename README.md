# Tax Manager Application

A modern web application for managing and tracking tax records with a clean, responsive UI built with Next.js and Supabase.

## Features

- **User Authentication**: Secure login and registration using Supabase Auth
- **Dashboard Overview**: Visualize tax records and payments
- **Tax Records Management**: Add, edit, and delete tax records
- **Profile Management**: Update and manage user profile information
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Multi-Language Support**: English, Hindi, Kannada, and Telugu
- **Reports & Analytics**: Generate reports on tax payments and dues
- **Customizable Settings**: Personalize your experience

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Supabase (Authentication, Database, Storage)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- Supabase account

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/tax-manager.git
   cd tax-manager
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Supabase credentials
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Database Setup

1. Create a new project in Supabase
2. Run the SQL migrations located in the `supabase/migrations` folder
3. Set up Row Level Security (RLS) policies as defined in the migration files

## Deployment

The application is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy

## Project Structure

```
tax-manager/
├── app/                 # Next.js app router
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   ├── dashboard/       # Dashboard and main features
│   └── ...
├── components/          # React components
├── public/              # Static assets
├── styles/              # Global styles
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── ...
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 