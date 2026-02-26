import React, { useState } from 'react';
import ourLogo from '../../assets/our.png';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      'fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40',
      collapsed ? 'w-20' : 'w-64'
    )}>
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <img src={ourLogo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-base font-extrabold text-slate-900 leading-none">DocGen</p>
              <p className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 mt-1">Automation</p>
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
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <div className="space-y-2">
          <NavLink
            to="/selection"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold group',
                'bg-slate-50 text-slate-600 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-200'
              )
            }
            title={collapsed ? 'Back to Selection' : ''}
          >
            <ArrowLeft size={20} className="flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
            {!collapsed && <span>Back to Selection</span>}
          </NavLink>
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
