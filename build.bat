@echo off
echo =======================================
echo Tax Manager Application Build Script
echo =======================================

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js to continue.
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: npm is not installed. Please install npm to continue.
    exit /b 1
)

:: Run the build script
echo Starting build process...
node build.js

:: Check if the build was successful
if %ERRORLEVEL% equ 0 (
    echo Build completed successfully!
    
    :: Provide information on how to run the app
    echo.
    echo To run the application:
    echo 1. npm start - Run in production mode
    echo 2. npm run dev - Run in development mode
    
    echo.
    echo For deployment instructions, see DEPLOYMENT.md
) else (
    echo Build failed. Please check the errors above.
    exit /b 1
) 