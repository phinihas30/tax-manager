"use client";

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiAlertCircle } from 'react-icons/fi';

export default function DashboardNotFound() {
  return (
    <div className="animate-fade-in flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <FiAlertCircle className="h-20 w-20 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            404 - Dashboard Page Not Found
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            The dashboard page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <Link 
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="dashboard-card bg-white p-6 rounded-lg shadow-sm mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Dashboard Pages</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800">
                  Dashboard Home
                </Link>
                <p className="text-xs text-gray-500">Overview of your tax records</p>
              </li>
              <li>
                <Link href="/dashboard/direct-tax" className="text-indigo-600 hover:text-indigo-800">
                  Direct Tax
                </Link>
                <p className="text-xs text-gray-500">Manage direct tax records</p>
              </li>
              <li>
                <Link href="/dashboard/indirect-tax" className="text-indigo-600 hover:text-indigo-800">
                  Indirect Tax
                </Link>
                <p className="text-xs text-gray-500">Manage indirect tax records</p>
              </li>
              <li>
                <Link href="/dashboard/reports" className="text-indigo-600 hover:text-indigo-800">
                  Reports
                </Link>
                <p className="text-xs text-gray-500">Generate and view tax reports</p>
              </li>
              <li>
                <Link href="/dashboard/settings" className="text-indigo-600 hover:text-indigo-800">
                  Settings
                </Link>
                <p className="text-xs text-gray-500">Configure your account settings</p>
              </li>
              <li>
                <Link href="/dashboard/help" className="text-indigo-600 hover:text-indigo-800">
                  Help & Support
                </Link>
                <p className="text-xs text-gray-500">Get assistance and answers to your questions</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 