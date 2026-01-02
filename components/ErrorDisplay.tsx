
import React from 'react';
import { ErrorResponse } from '../types';

interface ErrorDisplayProps {
  error: ErrorResponse;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white border border-red-200 rounded-3xl text-center shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h3>
      <p className="text-gray-500 mb-6 font-medium">
        The GitHub API returned a 404 error for this username.
      </p>
      
      <div className="bg-gray-900 rounded-2xl p-6 text-left shadow-inner">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Required Response Format</p>
        <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap break-words">
{`{
  "status": ${error.status},
  "message": "${error.message}"
}`}
        </pre>
      </div>
      
      <button 
        onClick={() => window.location.reload()}
        className="mt-8 px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-bold transition-colors"
      >
        Try another search
      </button>
    </div>
  );
};

export default ErrorDisplay;
