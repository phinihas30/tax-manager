const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// Helper function to execute commands
function runCommand(command, errorMessage) {
  try {
    console.log(`${colors.bright}${colors.cyan}Executing: ${command}${colors.reset}`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`${colors.red}${errorMessage || 'An error occurred'}${colors.reset}`);
    return false;
  }
}

// Main build process
async function build() {
  console.log(`\n${colors.bright}${colors.green}=== Starting Tax Manager Application Build ===${colors.reset}\n`);

  // Check if .env.local exists
  if (!fs.existsSync(path.join(process.cwd(), '.env.local'))) {
    console.log(`${colors.yellow}Warning: .env.local file not found. Creating a template file...${colors.reset}`);
    
    const envContent = `NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
`;
    
    fs.writeFileSync(path.join(process.cwd(), '.env.local'), envContent);
    console.log(`${colors.green}Created .env.local template. Please fill in the required values.${colors.reset}`);
    process.exit(1);
  }

  // Clean previous build files
  console.log(`\n${colors.cyan}Cleaning previous build...${colors.reset}`);
  if (fs.existsSync(path.join(process.cwd(), '.next'))) {
    try {
      fs.rmSync(path.join(process.cwd(), '.next'), { recursive: true, force: true });
      console.log(`${colors.green}Successfully cleaned previous build files.${colors.reset}`);
    } catch (error) {
      console.error(`${colors.red}Error cleaning build files: ${error.message}${colors.reset}`);
    }
  }

  // Install dependencies
  console.log(`\n${colors.cyan}Installing dependencies...${colors.reset}`);
  if (!runCommand('npm install', 'Failed to install dependencies. Check your package.json file.')) {
    process.exit(1);
  }

  // Run linting
  console.log(`\n${colors.cyan}Linting code...${colors.reset}`);
  runCommand('npm run lint || true', 'Linting found issues, but continuing build...');

  // Build the Next.js application
  console.log(`\n${colors.cyan}Building application...${colors.reset}`);
  if (!runCommand('npm run build', 'Build failed. Please check the errors above.')) {
    process.exit(1);
  }

  console.log(`\n${colors.bright}${colors.green}=== Build Completed Successfully! ===${colors.reset}`);
  console.log(`\n${colors.cyan}You can deploy the application using:${colors.reset}`);
  console.log(`${colors.yellow}1. npm start${colors.reset} - To run the production build locally`);
  console.log(`${colors.yellow}2. Deploy the build to your hosting platform${colors.reset}`);
}

// Run the build process
build().catch(err => {
  console.error(`${colors.red}Build error: ${err.message}${colors.reset}`);
  process.exit(1);
}); 