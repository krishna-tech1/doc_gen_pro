import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const MainLayout = ({ 
  children, 
  title = '',
  subtitle = '',
  actions = []
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64 transition-all duration-300">
        <Header title={title} subtitle={subtitle} actions={actions} />
        
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
