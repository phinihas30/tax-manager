# Tax Manager Application

A modern web application for managing tax records, built with Next.js, TypeScript, and Supabase.

## Features

- User authentication and authorization
- Direct and Indirect tax record management
- Tax calculator
- Reports generation
- Profile management
- Settings customization
- Responsive design with Tailwind CSS

## Tech Stack

- Next.js 14
- TypeScript
- Supabase (Authentication & Database)
- Tailwind CSS
- React Hook Form

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later
- A Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tax-manager.git
cd tax-manager
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

Use the provided build script:

```bash
# On Windows
build.bat

# On Unix-based systems
./build.sh
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 