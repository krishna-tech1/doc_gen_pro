import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Header = ({ title, subtitle = '', actions = [] }) => {
  return (
    <header className="sticky top-0 h-16 bg-white border-b border-gray-200 z-30">
      <div className="h-full flex items-center justify-between px-8">
        {/* Left */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {actions.map((action, idx) => (
            <div key={idx}>{action}</div>
          ))}

          {/* Icons */}
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell size={18} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={18} className="text-gray-600" />
            </button>
            <button className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <User size={16} className="text-indigo-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
