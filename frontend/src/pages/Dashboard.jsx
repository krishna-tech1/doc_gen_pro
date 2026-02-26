import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, BookOpen, BarChart3, ArrowRight, Clock, Download } from 'lucide-react';
import { MainLayout } from '../components/Layout/MainLayout';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const featureCards = [
  {
    icon: FileText,
    title: 'Circular Generator',
    description: 'Create professional institutional circulars with AI-enhanced content',
    path: '/circular',
    color: 'indigo',
  },
  {
    icon: BookOpen,
    title: 'Proposal Generator',
    description: 'Generate structured event proposals with budget breakdown',
    path: '/proposal',
    color: 'purple',
  },
  {
    icon: BarChart3,
    title: 'Report Generator',
    description: 'Produce formal event reports with geo-tags and analytics',
    path: '/report',
    color: 'emerald',
  },
];

const recentDocuments = [
  {
    id: 1,
    title: 'Annual Sports Day 2025',
    type: 'Circular',
    date: 'Feb 25, 2026',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Tech Summit Proposal',
    type: 'Proposal',
    date: 'Feb 24, 2026',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Women Day Event Report',
    type: 'Report',
    date: 'Feb 23, 2026',
    status: 'Completed',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout 
      title="Dashboard"
      subtitle="Welcome to your document automation center"
    >
      {/* Hero Section */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-indigo-100 mb-6">Generate professional institutional documents in seconds with AI-enhanced content.</p>
          <div className="flex gap-3">
            <Button variant="ghost" size="md" onClick={() => navigate('/circular')} className="text-white border-2 border-white hover:bg-indigo-600 hover:border-indigo-600">
              Get Started
            </Button>
            <Button variant="ghost" size="md" className="text-white border border-indigo-300 hover:bg-indigo-600">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {featureCards.map((feature, idx) => {
            const Icon = feature.icon;
            const colors = {
              indigo: 'from-indigo-50 to-indigo-100',
              purple: 'from-purple-50 to-purple-100',
              emerald: 'from-emerald-50 to-emerald-100',
            };

            return (
              <Card key={idx} hover className="cursor-pointer transition-all" onClick={() => navigate(feature.path)}>
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors[feature.color]} flex items-center justify-center mb-4`}>
                    <Icon size={24} className={`text-${feature.color}-600`} />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                  <Button variant="ghost" size="sm" className="group">
                    Create <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Total Documents', value: '24', icon: FileText },
          { label: 'This Month', value: '8', icon: Clock },
          { label: 'Downloaded', value: '18', icon: Download },
          { label: 'Success Rate', value: '100%', icon: '✓' },
        ].map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="py-6">
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Documents */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Recent Documents</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <Card>
          <div className="divide-y divide-gray-100">
            {recentDocuments.map((doc, idx) => (
              <div key={idx} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{doc.title}</p>
                  <p className="text-sm text-gray-500">{doc.type} • {doc.date}</p>
                </div>
                <Button variant="secondary" size="sm">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
