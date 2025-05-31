
import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = 'Processing your request...' }: LoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <Loader className="h-12 w-12 animate-spin text-taviflow-blue" />
        <h3 className="text-xl font-medium text-taviflow-dark">{message}</h3>
        <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-full bg-gradient-to-r from-taviflow-blue to-taviflow-accent origin-left animate-[loading_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
