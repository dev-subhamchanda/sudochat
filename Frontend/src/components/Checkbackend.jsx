import React, { useState, useEffect } from 'react';

const CheckBackend = ({ children }) => {
  const [isBackendRunning, setIsBackendRunning] = useState(null);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:3001/status');
        if (response.ok) {
          setIsBackendRunning(true);
        } else {
          setIsBackendRunning(false);
        }
      } catch (error) {
        setIsBackendRunning(false);
      }
    };

    checkBackend();
  }, []);

  if (isBackendRunning === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isBackendRunning === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Error</h1>
        <p className="text-xl text-gray-600 mb-8">The backend server is not running.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Retry
        </button>
      </div>
    );
  }

  return children;
};

export default CheckBackend;
