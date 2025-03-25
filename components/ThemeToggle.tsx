'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative flex items-center">
      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light')}
        className="p-2 rounded-full transition-colors duration-200 focus:outline-none
        bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-800"
        aria-label="Toggle theme"
      >
        {theme === 'light' && <FiSun className="h-5 w-5 text-amber-500" />}
        {theme === 'dark' && <FiMoon className="h-5 w-5 text-indigo-400" />}
        {theme === 'system' && <FiMonitor className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
      </button>
    </div>
  );
}

export function ThemeToggleWithLabel() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme:</span>
      <div className="flex items-center bg-gray-100 dark:bg-dark-card rounded-lg p-1">
        <button
          onClick={() => setTheme('light')}
          className={`flex items-center px-3 py-1.5 rounded-md text-sm transition-colors ${
            theme === 'light' 
            ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
          }`}
        >
          <FiSun className="mr-1.5 h-4 w-4" />
          Light
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={`flex items-center px-3 py-1.5 rounded-md text-sm transition-colors ${
            theme === 'dark' 
            ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
          }`}
        >
          <FiMoon className="mr-1.5 h-4 w-4" />
          Dark
        </button>
        <button
          onClick={() => setTheme('system')}
          className={`flex items-center px-3 py-1.5 rounded-md text-sm transition-colors ${
            theme === 'system' 
            ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white'
          }`}
        >
          <FiMonitor className="mr-1.5 h-4 w-4" />
          System
        </button>
      </div>
    </div>
  );
} 