"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiPieChart, FiFileText, FiSettings, FiHelpCircle, FiBarChart2, FiUser, FiActivity } from 'react-icons/fi';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-3 my-1 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'sidebar-link-active font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' 
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <span className={`mr-3 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-500'}`}>{icon}</span>
      {label}
    </Link>
  );
};

const DashboardSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border h-full custom-scrollbar transition-colors duration-200">
      <div className="p-5">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-xl font-bold text-gradient">Tax Manager</h1>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2 px-4">Main</h2>
          <nav>
            <NavLink 
              href="/dashboard" 
              icon={<FiHome className="h-5 w-5" />} 
              label="Dashboard" 
            />
            <NavLink 
              href="/dashboard/direct-tax" 
              icon={<FiPieChart className="h-5 w-5" />}
              label="Direct Tax" 
            />
            <NavLink 
              href="/dashboard/indirect-tax" 
              icon={<FiFileText className="h-5 w-5" />}
              label="Indirect Tax" 
            />
          </nav>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2 px-4">Analytics</h2>
          <nav>
            <NavLink 
              href="/dashboard/reports" 
              icon={<FiBarChart2 className="h-5 w-5" />}
              label="Reports" 
            />
            <NavLink 
              href="/dashboard/calculator" 
              icon={<FiActivity className="h-5 w-5" />}
              label="GST Calculator" 
            />
          </nav>
        </div>
        
        <div>
          <h2 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2 px-4">Support</h2>
          <nav>
            <NavLink 
              href="/dashboard/profile" 
              icon={<FiUser className="h-5 w-5" />}
              label="My Profile" 
            />
            <NavLink 
              href="/dashboard/settings" 
              icon={<FiSettings className="h-5 w-5" />}
              label="Settings" 
            />
            <NavLink 
              href="/dashboard/help" 
              icon={<FiHelpCircle className="h-5 w-5" />}
              label="Help & Support" 
            />
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar; 