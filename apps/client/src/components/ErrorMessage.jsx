import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-800 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{message || 'An unexpected error occurred.'}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
