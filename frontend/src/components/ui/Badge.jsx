import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Badge Component
 */
export const Badge = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-indigo-100 text-indigo-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

/**
 * Status Badge
 */
export const StatusBadge = ({ status, className = '' }) => {
  const variants = {
    active: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-amber-100 text-amber-700',
    completed: 'bg-indigo-100 text-indigo-700',
    archived: 'bg-gray-100 text-gray-700',
  };

  const labels = {
    active: 'Active',
    pending: 'Pending',
    completed: 'Completed',
    archived: 'Archived',
  };

  return (
    <Badge variant={status} className={className}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[status]}
    </Badge>
  );
};
