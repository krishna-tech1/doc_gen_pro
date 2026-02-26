import React from 'react';
import { cn } from '../../lib/utils';

/**
 * FormField Component - Wrapper with label and error handling
 */
export const FormField = ({ 
  label, 
  error, 
  required = false, 
  children,
  helperText = '',
  className = '' 
}) => (
  <div className={cn('flex flex-col gap-2', className)}>
    {label && (
      <label className="text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    )}
    {children}
    {error && (
      <p className="text-xs text-red-600 mt-1">{error}</p>
    )}
    {helperText && !error && (
      <p className="text-xs text-gray-500">{helperText}</p>
    )}
  </div>
);

/**
 * Input Component
 */
export const Input = React.forwardRef(({
  className = '',
  error = false,
  ...props
}, ref) => (
  <input
    ref={ref}
    className={cn(
      'w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-white text-gray-900 text-base transition-all',
      'focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100',
      'placeholder:text-gray-400',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';

/**
 * Select Component
 */
export const Select = React.forwardRef(({
  className = '',
  error = false,
  children,
  ...props
}, ref) => (
  <select
    ref={ref}
    className={cn(
      'w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-white text-gray-900 text-base transition-all',
      'focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
      className
    )}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = 'Select';

/**
 * Textarea Component
 */
export const Textarea = React.forwardRef(({
  className = '',
  error = false,
  ...props
}, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 bg-white text-gray-900 text-base transition-all',
      'focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100',
      'placeholder:text-gray-400 resize-none',
      'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
      error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
      className
    )}
    {...props}
  />
));

Textarea.displayName = 'Textarea';
