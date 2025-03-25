#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}=======================================${NC}"
echo -e "${GREEN}Tax Manager Application Build Script${NC}"
echo -e "${CYAN}=======================================${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed. Please install Node.js to continue.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed. Please install npm to continue.${NC}"
    exit 1
fi

# Run the build script
echo -e "${YELLOW}Starting build process...${NC}"
node build.js

# Check if the build was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Build completed successfully!${NC}"
    
    # Provide information on how to run the app
    echo -e "\n${CYAN}To run the application:${NC}"
    echo -e "1. ${YELLOW}npm start${NC} - Run in production mode"
    echo -e "2. ${YELLOW}npm run dev${NC} - Run in development mode"
    
    echo -e "\n${CYAN}For deployment instructions, see DEPLOYMENT.md${NC}"
else
    echo -e "${RED}Build failed. Please check the errors above.${NC}"
    exit 1
fi