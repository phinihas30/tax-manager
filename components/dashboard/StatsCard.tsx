import React, { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  color: 'indigo' | 'blue' | 'green' | 'amber' | 'red';
  percentage?: { value: number; isIncreasing: boolean };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, percentage }) => {
  const gradientClass = `${color}-gradient`;
  
  return (
    <div className="stats-card bg-white">
      <div className={`${gradientClass} h-2 w-full`}></div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className={`text-${color}-600 p-2 rounded-lg bg-${color}-50 opacity-80`}>
            {icon}
          </div>
          {percentage && (
            <div className={`flex items-center text-sm ${percentage.isIncreasing ? 'text-green-600' : 'text-red-600'}`}>
              <span className="font-medium">
                {percentage.isIncreasing ? '+' : '-'}{Math.abs(percentage.value)}%
              </span>
              <svg 
                className={`w-3 h-3 ml-1 ${percentage.isIncreasing ? 'transform rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard; 