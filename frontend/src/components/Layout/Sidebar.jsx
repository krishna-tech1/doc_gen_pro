import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, FileText, BarChart3, BookOpen, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/circular', label: 'Circular Generator', icon: FileText },
  { path: '/proposal', label: 'Proposal Generator', icon: BookOpen },
  { path: '/report', label: 'Report Generator', icon: BarChart3 },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40',
      collapsed ? 'w-20' : 'w-64'
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              IDA
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900">DocGen</p>
              <p className="text-xs text-gray-500">Automation</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight size={18} className="text-gray-600" />
          ) : (
            <ChevronLeft size={18} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium',
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 border-l-2 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )
              }
              title={collapsed ? label : ''}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className={cn(
        'border-t border-gray-100 p-4',
        collapsed && 'flex justify-center'
      )}>
        {!collapsed && (
          <div className="text-xs text-gray-500">
            <p className="font-medium text-gray-700 mb-1">Version</p>
            <p>1.0.0</p>
          </div>
        )}
      </div>
    </aside>
  );
};
