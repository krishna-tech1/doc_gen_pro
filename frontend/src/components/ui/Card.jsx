import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Card Component - Base container for content
 */
export const Card = React.forwardRef(({
  children,
  className = '',
  hover = false,
  ...props
}, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-white rounded-2xl border border-gray-200 shadow-sm transition-all',
      hover && 'hover:shadow-lg hover:border-gray-300',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = 'Card';

/**
 * CardHeader
 */
export const CardHeader = ({ children, className = '' }) => (
  <div className={cn('px-6 py-5 border-b border-gray-100', className)}>
    {children}
  </div>
);

/**
 * CardContent
 */
export const CardContent = ({ children, className = '' }) => (
  <div className={cn('px-6 py-5', className)}>
    {children}
  </div>
);

/**
 * CardFooter
 */
export const CardFooter = ({ children, className = '' }) => (
  <div className={cn('px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex gap-3 justify-end', className)}>
    {children}
  </div>
);
