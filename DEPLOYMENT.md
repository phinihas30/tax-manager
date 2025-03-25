# Deployment Guide for Tax Manager Application

This guide provides instructions for building and deploying your Next.js Tax Manager application to various hosting platforms.

## Prerequisites

- Node.js 16.x or later
- npm 7.x or later
- Git (for version control)
- A Supabase account and project set up with the required tables

## Environment Variables

Before deploying, ensure you have the following environment variables set:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

These should be stored in a `.env.local` file for local development and configured in your hosting platform for production.

## Build Process

We've included a build script to simplify the build process. Run it with:

```bash
node build.js
```

This script will:
1. Check for environment variables
2. Clean previous build files
3. Install dependencies
4. Run linting
5. Build the Next.js application

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest platform for deploying Next.js applications:

1. Create an account on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure your environment variables in the Vercel dashboard
4. Deploy your application with a single click

### Option 2: Netlify

1. Create an account on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Set the build command to `npm run build`
4. Set the publish directory to `.next`
5. Configure your environment variables in the Netlify dashboard

### Option 3: Self-hosted Server

For deployment on your own server:

1. Run the build script: `node build.js`
2. Transfer the following files/directories to your server:
   - `.next/`
   - `public/`
   - `package.json`
   - `package-lock.json`
   - `.env.local` (with production values)
3. On the server, run:
   ```bash
   npm install --production
   npm start
   ```

4. Configure your web server (Nginx/Apache) to proxy requests to the Node.js server

## Continuous Deployment

For a CI/CD pipeline:

1. Configure your CI environment to run the build script
2. Set up environment variables in your CI platform
3. Deploy automatically when changes are pushed to your main branch

## Post-Deployment Checks

After deployment, verify:

- The application loads correctly
- Authentication works (login/signup)
- Tax records can be created, viewed, and edited
- Reports can be generated
- Settings can be updated

## Troubleshooting

- If authentication issues occur, check Supabase URL and anon key
- For styling issues, verify that Tailwind CSS is building correctly
- For database connection issues, check network access to Supabase

## Rollback Plan

In case of deployment issues:
1. Revert to the previous version in your Git repository
2. Trigger a new build with the previous version
3. Deploy the previous build 